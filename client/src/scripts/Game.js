import Ball from './Ball.js';
import Paddle from './Paddle.js';

//Gestion réseau
import { io } from 'socket.io-client';

const buttonJouer = document.getElementById("start");
const alea = n => Math.floor(Math.random() * n);

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  //Attributs
  #socket;

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(10, 250, this);
    this.paddleRight = new Paddle(this.canvas.width - 32, 250, this);
    this.#socket = io();
    this.setupListeners(); 
  }

  /** start this game animation */
  start() {
    buttonJouer.value = 'LEAVE';
    this.ball.abscisse(this.paddle.x + 10); 
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }


  displayOnScreen(msg){
    document.getElementById("player").textContent = msg;
  }

  /* Listener all the emits messages from the server*/
  setupListeners() {

    // Gestion des messages récus par le client et de l'affichage correspondant à chaque client.
    this.#socket.on('hello first', () => this.displayOnScreen("WELCOME YOU ARE PLAYER 1"));
    this.#socket.on('hello second', () => this.displayOnScreen("WELCOME YOU ARE PLAYER 2"));
    this.#socket.on('hello too much', () => this.displayOnScreen(" TWO PLAYERS ARE ALREADY CONNECTED COME BACK LATER"));
    this.#socket.on('BYE BYE', () => buttonJouer.parentNode.removeChild(buttonJouer));

    // Gestion de la mise en place des raquettes et du lancement du jeu côté client.
    this.#socket.on('Currents numbersOfClients', (numbersOfClients) => this.handleStartRequest(numbersOfClients));
    this.#socket.on('moveOppositePaddle', (ordonnee) => this.moveOppositePaddle(ordonnee));

    // Gestion du déplacement de la balle.
    this.#socket.on('Move the ball', (abscisse, ordonnee, sx, sy) => this.moveTheBall(abscisse, ordonnee, sx, sy));


    // Lancement du jeu.
    this.#socket.on('Start the game',() => this.start());
  }

  /* Verify if two players are present on the server to start the game or make a player wait*/
  checkStart(){
    this.#socket.emit('number of clients');
  }

  handleStartRequest(numbersOfClients){
    if(numbersOfClients == 1){
      this.moveAndDrawOnlyPaddles();
    }
    else{
      socket.emit('Start the game');
    }
  }

  canvas()
  {
    return this.canvas;
  }

  
  /** animate the game : move and draw */
  animate() {
    this.#socket.emit('Paddle move', this.paddle.y);
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.paddle.move(this.canvas);
    this.paddle.draw(ctxt);
    this.paddleRight.move(this.canvas);
    this.paddleRight.draw(ctxt);
    
    this.ball.move(this.paddle, this.paddleRight);
    this.ball.draw(ctxt);
  }

  /* Only draw the 2 paddles in the canvas, the user on the left can move */
  moveAndDrawOnlyPaddles(){
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.paddle.draw(ctxt);
    this.paddle.move(this.canvas);
    this.paddleRight.draw(ctxt);
    this.paddleRight.move(this.canvas);
    this.raf = window.requestAnimationFrame(this.moveAndDrawOnlyPaddles.bind(this));
  }

  keyDownActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
        this.paddle.moveUp();
        // this.#socket.emit('Paddle move', this.paddle.y);
        // this.paddleRight.moveUp();
        break;
      case "ArrowDown":
      case "Down":
        this.paddle.moveDown();
        
        // this.paddleRight.moveDown();
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  
  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
      case "ArrowDown":
      case "Down":
        this.paddle.stopMoving();
        // this.paddleRight.stopMoving();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  moveOppositePaddle(ordonnee) {
    this.paddleRight.ordonnee(ordonnee);
  }

  moveTheBall(abscisse, ordonnee, sx, sy){
    this.ball.abscisse(800 - abscisse);
    this.ball.ordonnee(ordonnee);
    this.ball.shiftX(sx);
    this.ball.shiftY(sy);
  }
}