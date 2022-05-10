import Mobile from './Mobile.js';
import MoveState from './Movestate.js';

const paddleImgSrc = './images/paddle.png';
const DELTA_X = 0;
const DELTA_Y = 8;
const scoreLeft = document.getElementsByClassName("left");
const scoreRight = document.getElementsByClassName("right");

export default class Paddle extends Mobile{

    // static PADDLE_WIDTH = 48;
    // static PADDLE_HEIGHT = 40;
    static PADDLE_WIDTH = 24;
    static PADDLE_HEIGHT = 88;   

    constructor(x, y, game) {
      super(x,y ,paddleImgSrc, DELTA_X, DELTA_Y);
      this.score = 0;
      
     // this.image = this.createImage();
      this.moving = MoveState.NONE;
    }
    
    
  

    // draw(context) {
    //   context.drawImage(this.image, this.x, this.y)
    // }

     /* crée l'objet Image à utiliser pour dessiner cette balle */
    //  createImage() {
    //     const paddleImg = new Image();
    //     paddleImg.width = Paddle.PADDLE_WIDTH;
    //     paddleImg.src = paddleImgSrc;
    //     return paddleImg;
    // }

    get up() {
      return this.moving === MoveState.UP;
    }

    get down() {
      return this.moving === MoveState.DOWN;
    }

    ordonnee(ord){
      this.y = ord;
    }

    moveUp() {
      this.shiftY = -DELTA_Y;
      this.moving = MoveState.UP;
      console.log("up...");
    }

    moveDown() {
      this.shiftY = DELTA_Y;
      this.moving = MoveState.DOWN;
      console.log("down...");
    }

    stopMoving() {
      this.moving = MoveState.NONE;
    }

    move(canvas) {
      if (this.moving == MoveState.DOWN) {
        if (this.y + this.height  <= canvas.height) {
          super.move(canvas);
        }
      }
      else if (this.moving == MoveState.UP) {
        if (this.y + this.shiftY >= 0) {
          super.move(canvas);
        }
      }
      console.log(this.shiftX, this.shiftY);
    }

    increaseScoreRight(){
      this.score += 1;
      scoreRight.innerHTML = `${this.score}`;
    }

    increaseScoreLeft(){
      this.score += 1;
      scoreLeft.innerHTML = `${this.score}`;
    }
}