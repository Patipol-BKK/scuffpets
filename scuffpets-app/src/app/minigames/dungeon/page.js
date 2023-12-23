"use client"

import { DungeonGame } from "./dungeon.js"
import { generatePrompt } from "./prompt.js";
import React, { useState } from "react";

export default function Page() {
  // var game = new DungeonGame()
  // game.newGame();
  // console.log(game);

  // while (game.alive && game.win == false) {
  //   game.input(2);
  // }
  // console.log(game.log);
  // console.log(game);
  // let outcomes = {}
  // const d = 1;
  // for (let i = 0; i < 10000; i++) {
  //   let game = new DungeonGame();
  //   game.newGame();
  //   let res = game._rollSuccessfulness(d);
  //   outcomes.hasOwnProperty(res) ? outcomes[res]++ : outcomes[res] = 1;
  // }

  // console.log(outcomes);

  const [promptText, setPromptText] = useState('prompt text');
  const [gameObjText, setGameObjText] = useState('');
  const [game, setGame] = useState(null);

  const createNewGame = async () => {
    setGame(new DungeonGame(promptText));
    await game.newGame();
    setGameObjText(updateGameStateText());
  }

  const handlePromptButtonClick = () => {
    const result = generatePrompt();
    setPromptText(result);
  }

  function updateGameStateText() {
    return JSON.stringify(game, (key, value) => {
      if (key === 'log' || key === 'prompt') {
        return undefined; // Exclude the property from the string
      }
      return value;
    }, 2);
  }

  const pickAPipe = async () => {
    console.log("pickapipe obj: " + game);
    if (game.currentOptions === undefined) throw new Error();
    await game.input(0);
    setGameObjText(updateGameStateText());
  }

  return (<div>
    <button onClick={handlePromptButtonClick}> Generate a prompt </button>
    <div>
      <p>Prompt: </p>
      <div>{promptText}</div>
    </div>
    <button onClick={createNewGame}> New game </button>

    <div>
      <button onClick={pickAPipe}> Option 1 </button>
      {/* <button onClick={pickAPipe(1)}> Option 2 </button>
      <button onClick={pickAPipe(2)}> Option 3 </button>
      <button onClick={pickAPipe(3)}> Option 4 </button> */}
    </div>

    <div><p>Game state:</p></div>
    <div><pre>{gameObjText}</pre></div>
  </div>
  );
};
