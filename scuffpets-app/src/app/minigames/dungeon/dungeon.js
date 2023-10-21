import { generatePrompt } from "./prompt";
import { countOccurrences } from "@/app/util";
import { MIXINS_COMMON, MIXINS_RARE } from "./dungeon-defs";

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
const LUCK_MID_SAVE_CHANCE = 0.15;
const LUCK_MID_CRITICAL_CHANCE = 0.05;
const DANGER_FAIL_CHANCE_PER_LEVEL = 0.1;
const DANGER_LOOT_RATE_PER_LEVEL = 0.05;

class DungeonGame {
  constructor() {
    // loop on while(game.gameOver())?
    this.alive = true;
    this.error = false;

    this.prompt = generatePrompt();
    this.encounters = 0;
    this.currentText;
    this.currentOptions;
    this.optionDangers;
    this.loot = 0; // TODO: divide loot into loot table levels

    this.health = 10;
    this.luck = 69;
  }

  // TODO: add in a Gacha to send in for luck and HP maybe
  newGame() {
    let rawOutput = this._tryToSpeakToRobot(this.prompt, 1, RICH_GPT_VERSION, RICH_GPT_VERSION);
    let splitOutput = this._parseEncounter(rawOutput);
    this.currentText = splitOutput[0];
    this._parseOptions(splitOutput[1]);
    this.encounters++;

    readyForInput();
  }

  readyForInput() {
    // TODO: idk do something??
  }

  // Accepts player input as the index (of this.currentOptions)
  input(choiceIndex) {
    let prompt = "The player chose " + this.currentOptions[choiceIndex];


  }

  typingError() {
    this.health--;
    if (this.health === 0) {
      this.currentText = this.suddenDeathText();
      this.alive = false;
    }
    return;
  }

  // Generate death text without any additional input, options, etc.
  suddenDeathText() {
    // TODO: add more death prompts, perhaps with mixins
    try {
      this.currentText = this._tryToSpeakToRobot(
        "While trying to make a decision, there was some sort of accident and the player suddenly dies.",
        1,
        POOR_GPT_VERSION,
        RICH_GPT_VERSION
      );
    } catch (error) {
      this.currentText = "YOU DONE FUCKED UP AND DIED :(";
    }
  }

  // Tries to speak to the robot with a retry on any errors.
  // After the first try, uses the provided fallback gpt version.
  // Returns the raw output or throws an error if all retries fail.
  _tryToSpeakToRobot(prompt, retries, gptVersion, fallback) {
    let retryCount = 0;
    let use_version = gptVersion;
    while (retryCount <= retries) {
      try {
        let rawOutput = this._speakToRobot(prompt, use_version);
        this._validateEncounter(rawOutput);
        return rawOutput;
      } catch (error) {
        retryCount++;
        use_version = fallback;
      }
    }
    throw new Error("ParseError");
  }

  _speakToRobot(prompt, gptVersion) {
    // TODO: Call API and simply return the entire response
  }

  _validateEncounter(encounter) {
    if (!encounter.includes(TEXT_SECTION_MARKER) || !encounter.includes(OPTIONS_SECTION_MARKER)) {
      throw new Error("ParseError");
    }

    if (encounter.countOccurrences(TEXT_SECTION_MARKER) != 1 || encounter.countOccurrences(OPTIONS_SECTION_MARKER) != 1) {
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

  // Attempts to parse the text of options into an extremely scuffed data structure of [ ["text", danger], [...], ... ]
  _parseOptions(optionsText) {
    let ret = [];
    let curText = optionsText;

    for (let i = 0; i < 4; i++) {
      let splitStr = `${i + 1}.`

      splitResult = curText.split(splitStr);
      curText = splitResult[1];

      // When we split on "1.", splitResult[0] is the empty string
      if (i = 0) continue;

      this.optionsText.push(splitResult[0]);

      if (i = 3) {
        this.optionsText.push(splitResult[1]);
      }
    }

    // Split out the danger measurement
    for (let i = 0; i < 4; i++) {
      let rawOption = this.optionsText[i];
      let splitResult = rawOption.split("(");
      this.optionsText[i] = (splitResult[0]);

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
    //     at a very high value, we get a critical success
    //       if HP is < 70%, we roll for a chance to heal for 30%
    //       if we fail the roll or HP is high, we get loot
    //     at a very low value, we get an unlucky fail
    //   If - outcome
    //     we roll Luck for a luck save.
    //     If luck save fails, we roll HP for an injury save (lower chance as hp is lower)
    //     If both of these fail, the player dies.
    //   If the player didn't die, we roll a loot check based on the danger.

    let success = Math.random() > (DANGER_FAIL_CHANCE_PER_LEVEL * danger) ? true : false;

    if (success) {

    }
  }
}