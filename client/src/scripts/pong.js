'use strict';

import Game from './Game.js';
import Paddle from './Paddle.js';
// //Gestion réseau
// import { io} from 'socket.io-client';
// const socket = io("http://localhost:9000");


// // Fin gestion réseau
const init = () => {
  
  const theField = document.getElementById("field");
  const theGame = new Game(theField);
  //this.paddle = new Paddle(40 , (canvas.height/2) - (Paddle.PADDLE_HEIGHT));
  theGame.moveAndDraw();

  
  window.addEventListener('keyup',theGame.keyUpActionHandler.bind(theGame) );
  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));

  // document.getElementById('start').addEventListener("click", () => startGame(theGame) );
  document.getElementById('start').addEventListener("click", () => checkGameStart(theGame) );


}

window.addEventListener("load",init);

// true iff game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */

const startGame = theGame => {
  if (!started) {
    theGame.start();
    document.getElementById('start').value = 'LEAVE';
  }
  else {
    document.getElementById('start').value = 'JOIN';
    theGame.stop();
  }
  started = ! started;
}

const checkGameStart = theGame => {
  if (!started) {
    theGame.checkStart();
    document.getElementById('start').value = 'LEAVE';
  }
  else {
    document.getElementById('start').value = 'JOIN';
    theGame.stop();
  }
  started = ! started;
}


