import { generatePrompt } from "./prompt";
import { countOccurrences } from "@/app/util";
import { MIXINS_COMMON, MIXINS_RARE, SYSTEM_PROMPT } from "./dungeon-defs";
import OpenAI from "openai"

const TEXT_SECTION_MARKER = "text:"
const OPTIONS_SECTION_MARKER = "options:"

// Rate that any mixin is applied
const MIXIN_RATE = 0.5

// Rate that mixin will be Rare instead of Common
const MIXIN_RARE_RATE = 0.2

const RICH_GPT_VERSION = "gpt-4"
const POOR_GPT_VERSION = "gpt-3.5-turbo"

// Success rate modifiers
const LUCK_MID = 50;
const LUCK_SAVE_CHANCE = 0.2;
const LUCK_CRITICAL_CHANCE = 0.1;
const LUCK_FAIL_CHANCE = 0.01;
const LUCK_POSITIVE_DENOMINATOR = 3;
const LUCK_NEGATIVE_DENOMINATOR = 4;
const HEAL_INSTEAD_OF_LOOT_CHANCE = 0.5;
const DANGER_FAIL_CHANCE_PER_LEVEL = 0.1;
const DANGER_LOOT_RATE_PER_LEVEL = 0.05;
const INJURY_SAVE_MAX_CHANCE = 0.7;
const INJURY_SAVE_MAX_DAMAGE = 3;

const GAME_LENGTH_ENCOUNTERS = 8;

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // TODO: look at this
});

export class DungeonGame {
  constructor(prompt) {
    // loop on while(game.alive())?
    this.alive = true;
    this.win = false;
    this.deathFlag = false;

    this.prompt = prompt;
    this.encounters = 0;
    this.currentText;
    this.currentOptions = [];
    this.optionDangers = {};
    this.loot = 0; // TODO: divide loot into loot table levels

    this.maxHealth = 10;
    this.curHealth = 10;
    this.luck = 69;
    this.luckPositiveBonus = Math.max(((this.luck - LUCK_MID) / LUCK_MID) / LUCK_POSITIVE_DENOMINATOR, 0)
    this.luckNegativeBonus = Math.max(((LUCK_MID - this.luck) / LUCK_MID) / LUCK_NEGATIVE_DENOMINATOR, 0)

    this.log = ""

    this.messages = [{ 'role': 'system', 'content': SYSTEM_PROMPT }]
  }

  // TODO: add in a Gacha to send in for luck and HP maybe
  async newGame() {
    let rawOutput = await this._tryToSpeakToRobot(this.prompt, 1, RICH_GPT_VERSION, RICH_GPT_VERSION);
    let splitOutput = this._parseEncounter(rawOutput);
    this.currentText = splitOutput[0];
    this._parseOptions(splitOutput[1]);
    this.encounters++;

    this.readyForInput();
  }

  readyForInput() {
    // TODO: idk do something??
  }

  // Accepts player input in the form of the index (of this.currentOptions)
  async input(choiceIndex) {
    let prompt = "The player chose \"" + this.currentOptions[choiceIndex] + "\" ";

    prompt += this._rollSuccessfulness(this.optionDangers[choiceIndex]);
    if (!this.deathFlag) {
      prompt += (" " + this._addMixin());
    }
    console.log("\nnextPrompt = " + prompt);
    await this._nextEncounter(prompt);

    this.readyForInput();
  }

  async _nextEncounter(prompt) {
    this.currentOptions = []

    this.log += ("\nEncounter " + this.encounters + ":\n");
    this.log += (this.currentText + "\n");

    if (this.encounters === GAME_LENGTH_ENCOUNTERS) {
      prompt += " The player successfully completes their original goal."
      this._winGame(prompt);
      return;
    }

    if (this.encounters === (GAME_LENGTH_ENCOUNTERS - 1)) {
      prompt += " The player is close to completing their original goal."
    }

    this.log += (prompt + "\n");

    let rawOutput = "";

    if (this.deathFlag) {
      rawOutput = await this._tryToSpeakToRobot(prompt, 1, POOR_GPT_VERSION, RICH_GPT_VERSION);
      this.log += rawOutput;
      this.currentText = rawOutput;
      this.alive = false;
      return;
    }

    rawOutput = await this._tryToSpeakToRobot(prompt, 1, POOR_GPT_VERSION, RICH_GPT_VERSION);
    let splitOutput = this._parseEncounter(rawOutput);
    this.currentText = splitOutput[0];
    this._parseOptions(splitOutput[1]);
    this.encounters++;
    return;
  }

  async typingError() {
    this.curHealth--;
    if (this.curHealth === 0) {
      this.currentText = await this.suddenDeathText();
      this.deathFlag = true;
      this.alive = false;
    }
    return;
  }

  // Generate death text without any additional input, options, etc.
  async _suddenDeathText() {
    // TODO: add more death prompts, perhaps with mixins
    try {
      return await this._tryToSpeakToRobot(
        "While trying to make a decision, there was some sort of accident and the player suddenly dies.",
        1,
        POOR_GPT_VERSION,
        RICH_GPT_VERSION
      );
    } catch (error) {
      this.currentText = "YOU DONE FUCKED UP AND DIED :(";
    }
  }

  async _winGame(prompt) {
    try {
      this.currentText = await this._tryToSpeakToRobot(prompt, 1, POOR_GPT_VERSION, RICH_GPT_VERSION);
    } catch (error) {
      this.currentText = "You win! (and something broke but you win woooo)";
    }

    this.log += ("\n" + prompt + "\n" + this.currentText);
    this.win = true;
  }

  // Tries to speak to the robot with a retry on any errors.
  // After the first try, uses the provided fallback gpt version.
  // Returns the raw output or throws an error if all retries fail.
  async _tryToSpeakToRobot(prompt, retries, gptVersion, fallback) {
    this.messages.push({ 'role': 'user', 'content': prompt });

    let retryCount = 0;
    let use_version = gptVersion;
    while (retryCount <= retries) {
      try {
        let response = await this._speakToRobot(prompt, use_version);
        let message = response.choices[0].message;
        let rawOutput = message.content;
        console.log(rawOutput);
        this._validateEncounter(rawOutput);
        this.messages.push(message);
        return rawOutput;
      } catch (error) {
        retryCount++;
        use_version = fallback;
      }
    }
    throw new Error("ParseError");
  }

  async _speakToRobot(gptVersion) {
    return await openai.chat.completions.create(
      {
        messages: this.messages,
        model: 'gpt-3.5-turbo',
      }
    )
  }

  _validateEncounter(encounter) {
    if (!encounter.includes(TEXT_SECTION_MARKER) || !encounter.includes(OPTIONS_SECTION_MARKER)) {
      console.log("Missing Text or Options section!");
      throw new Error("ParseError");
    }

    if (countOccurrences(encounter, TEXT_SECTION_MARKER) != 1 || countOccurrences(encounter, OPTIONS_SECTION_MARKER) != 1) {
      throw new Error("ParseError");
    }

    // TODO: add section order checking
    // TODO: add some size checking maybe

    if (!encounter.includes("1.")
      || !encounter.includes("2.")
      || !encounter.includes("3.")
      || !encounter.includes("4.")) {
      throw new Error("OptionsParseError");
    }

    // TODO: add checking for whether danger counter is formatted correctly
  }

  // Attempts to parse the encounter into its Text and Options sections.
  // Mutates the class vars.
  _parseEncounter(encounter) {
    // Discard anything that happens to come before "text:"
    let s = encounter.split(TEXT_SECTION_MARKER)[1];

    return s.split(OPTIONS_SECTION_MARKER);
  }

  // Parses options into this.optionsText and this.optionDangers (mutates)
  _parseOptions(optionsText) {
    let ret = [];
    let curText = optionsText;

    for (let i = 0; i < 4; i++) {
      let splitStr = `${i + 1}.`

      let splitResult = curText.split(splitStr);
      curText = splitResult[1];

      // When we split on "1.", splitResult[0] is the empty string
      if (i === 0) continue;
      this.currentOptions.push(splitResult[0]);

      if (i === 3) {
        this.currentOptions.push(splitResult[1]);
      }
    }

    // Split out the danger measurement
    for (let i = 0; i < 4; i++) {
      let rawOption = this.currentOptions[i];
      let splitResult = rawOption.split("(");
      this.currentOptions[i] = (splitResult[0]);

      let num = parseInt(splitResult[1].charAt(0));
      if (isNaN(num) || (num < 1 && num > 5)) {
        console.log("U DONE FUCKED UP IN dungeon.js, the danger was not a number! Option text: %s", rawOption);
        this.optionDangers[i] = (Math.floor(Math.random() * 5) + 1);
      } else {
        this.optionDangers[i] = num;
      }
    }
  }

  _rollSuccessfulness(danger) {
    // First, we roll for either a + or - outcome based purely on danger.
    //   If + outcome, we roll Luck
    //     at a very low value, we get an unlucky fail
    //     at a high value, we get a critical success
    //       if HP is < 70%, we roll for a chance to heal for 30%
    //       if we fail the roll or HP is high, we get loot
    //   If - outcome
    //     we roll Luck for a luck save.
    //     If luck save fails, we roll HP for an injury save (lower chance as hp is lower)
    //     If both of these fail, the player dies.
    //   If the player didn't die, we roll a loot check based on the danger.
    let ret = ""
    let success = Math.random() > (DANGER_FAIL_CHANCE_PER_LEVEL * danger);
    if (success) {
      if (Math.random() < (LUCK_FAIL_CHANCE + this.luckNegativeBonus)) {
        ret += "The player almost succeeds, but they were unlucky and fail";
        if (this._rollInjurySave()) {
          ret += ", getting injured but surviving."
        } else {
          ret += " and die."
          this.deathFlag = true;
          return ret;
        }
      } else {
        if (Math.random() < (LUCK_CRITICAL_CHANCE + this.luckPositiveBonus)) {
          if (this.curHealth <= 7  // TODO: make this an actual measurement
            && Math.random() < HEAL_INSTEAD_OF_LOOT_CHANCE) {
            ret += "The player succeeds and luckily finds a way to restore some health.";
          } else {
            this.loot++;
            ret += "The player succeeds and luckily finds some loot.";
          }
        } else {
          ret += "The player succeeds."
        }
      }
    } else {
      if (Math.random() < (LUCK_SAVE_CHANCE + this.luckPositiveBonus)) {
        ret += "The player almost failed, but was saved by a stroke of luck.";
      } else if (this._rollInjurySave()) {
        ret += "The player succeeds but was injured."
      } else {
        ret += "The player fails and dies."
        this.deathFlag = true;
        return ret;
      }
    }

    if (Math.random() < (DANGER_LOOT_RATE_PER_LEVEL * danger)) {
      ret += " The player also finds some loot in the process.";
    }

    return ret;
  }

  // Returns false if injury save is impossible or fails, otherwise returns
  // true and performs all the requisite actions.
  _rollInjurySave() {
    if (this.curHealth <= 1) return false;
    if (Math.random() < (INJURY_SAVE_MAX_CHANCE * (this.curHealth / this.maxHealth))) {
      let dmg = Math.ceil(Math.random() * INJURY_SAVE_MAX_DAMAGE);
      this.curHealth > dmg ? this.curHealth -= dmg : this.curHealth = 1;
      return true;
    }
    return false;
  }

  _addMixin() {
    let ret = "";
    let roll = Math.random();
    if (roll < MIXIN_RATE) {
      ret += "The outcome or next encounter involves \"";
      if (roll < MIXIN_RARE_RATE) {
        ret += MIXINS_RARE[Math.floor(Math.random() * MIXINS_RARE.length)] + "\".";
      } else {
        ret += MIXINS_COMMON[Math.floor(Math.random() * MIXINS_COMMON.length)] + "\".";
      }
    }
    return ret;
  }
}