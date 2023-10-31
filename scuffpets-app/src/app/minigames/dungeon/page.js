import { DungeonGame } from "./dungeon.js"

export default function Page() {
  // var res1 = "text: The neon lights of the city cast a sickly glow on the rain-slicked streets as you make your way through the Orc Chasm, a notorious district in the underbelly of the metropolis. The Angelic Rock, a towering fortress of steel and concrete, looms ominously in your rearview mirror. In your pocket, the family heirloom, a small, intricately carved artifact known only by its serial number, 751668390455803994, pulses with a strange energy. You can almost feel ExoVox\'s dark influence reaching out for it, his cybernetic minions scouring the city for any trace of you. \n\nSuddenly, a group of heavily armed gang members, their faces hidden behind grotesque orc masks, step out from the shadows, blocking your path. Their leader, a hulking brute with a cybernetic arm, points directly at you. \"Hand over the artifact,\" he growls, \"and we might let you live.\"\n\noptions:\n1. Try to negotiate with the gang members. (3)\n2. Attempt to run past them. (4)\n3. Use the artifact\'s energy to fight them off. (5)\n4. Surrender the artifact to them. (1)"
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

  return (<div>
    <p>This is your dungeon page. Open the browser console to see the output.</p>
  </div>
  );
};
