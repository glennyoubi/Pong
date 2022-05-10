import Mobile from './Mobile.js';
import Paddle from './Paddle.js';
// import MoveState from './Movestate';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;
const RADUIS = 12; // The Ball image 24*24 so the raduis of the ball is 24/12.


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.speed = 5.0;
  }

  abscisse(abs){ 
    this.x = abs;
  }

  ordonnee(ord){
    this.y = ord;
  }

  shiftY(y){
    this.shiftY = y;
  }

  shiftX(x){
    this.shiftX = x;
  }
  
  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
   move(paddleLeft,paddleRight){
    
    let divZones = 5;
    let shiftSumCheck = 7;
    // let sizeZone = (paddle.height/2)/divZones;    
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }
    else if(this.collisionTwo(paddleLeft) || this.collisionTwo(paddleRight)){
      this.shiftX = -this.shiftX; // rebond avec les raquettes
    }
    else if(this.x + (this.width / 2) >= this.theGame.canvas.width){
      this.resetBall();
      paddleLeft.increaseScore(); // paddleLeft marque un point
      console.log("paddleLeft.score down here");
      console.log(paddleLeft.score);
    }
    // else if ( this.collisionTwo(paddleLeft) || this.x < 0 || this.x + this.width >= this.theGame.canvas.width || this.collisionTwo(paddleRight)){
    //   this.shiftX = - this.shiftX;    // rebond en gauche ou à droite
    // }
    else if (this.x == 0){
      this.resetBall();
      paddleRight.increaseScore(); // paddleRight marque un point
      console.log("paddleRight.score down here");
      console.log(paddleRight.score);
    }
    super.move();
  }

  collisionTwo(paddle){
    let paddleTop = paddle.y;
    let paddleBottom = paddle.y + paddle.height;
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + paddle.width;
    
    let ballTop = this.y - RADUIS;
    let ballBottom = this.y + RADUIS;
    let ballLeft = this.x - RADUIS;
    let ballRight = this.x + RADUIS;
    
    return paddleLeft < ballRight && paddleTop < ballBottom && paddleBottom > ballTop && ballLeft < paddleRight;
  }

  // After the ball hit the right side or the left side of the canvas this function replace the ball in the center of the ball
  // of the canvas make her go in the oppistie direction where she hit previously.
  resetBall(){
    this.x = this.theGame.canvas.width/2;
    this.y = this.theGame.canvas.height/2;
    this.shiftX = - this.shiftX;
    if(this.shiftY > 0){
      // this.x = this.theGame.paddle.x;
      this.shiftY = (-1) *SHIFT_Y;
    }
    else{
      // this.x = this.theGame.paddle.x;
      this.shiftY = SHIFT_Y;
    }
    super.move()
  }
}