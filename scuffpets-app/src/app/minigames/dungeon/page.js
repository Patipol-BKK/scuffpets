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

  var game;

  const createNewGame = async () => {
    game = new DungeonGame(promptText);
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

  return (<div>
    <button onClick={handlePromptButtonClick}> Generate a prompt </button>
    <div>
      <p>Prompt: </p>
      <div>{promptText}</div>
    </div>
    <button onClick={createNewGame}> New game </button>



    <div><p>Game state:</p></div>
    <div><pre>{gameObjText}</pre></div>
  </div>
  );
};
