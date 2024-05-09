/** @typedef {HTMLCanvasElement} */

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let convasPosition = canvas.getBoundingClientRect()
let explosion = []

class BoomAnimate {
  constructor({
    imageSrc,
    positionX,
    positionY,
    width,
    height,
    frameRate,
    audioSrc,
    nextFrameTime,
  }) {
    this.width = width;
    this.height = height;
    this.position = {
      x: positionX - width/2.5,
      y: positionY - height/2,
    };
    this.frameRate = frameRate;
    this.boomAudio = new Audio();
    this.boomAudio.src = audioSrc;
    this.image = new Image();
    this.image.src = imageSrc;
    this.currentFrame = 0;

    this.cropBox = {
      position: {
        x: 200 * this.currentFrame,
        y: 0,
      },
      width: 200,
      height: 179,
    };

    this.timer = 0;
    this.nextFrameTime = nextFrameTime;
    
  }

  updateCropBox(){
    this.cropBox = {
      position: {
        x: 200 * this.currentFrame,
        y: 0,
      },
      width: 200,
      height: 179,
    };
  }

  

  update() { 
    if(this.currentFrame < this.frameRate){
      this.updateTimeFrame()
      this.updateCropBox();
      this.draw();
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.cropBox.position.x,
      this.cropBox.position.y,
      this.cropBox.width,
      this.cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    
  }

  updateTimeFrame(){
    if(this.currentFrame < this.frameRate){
      this.timer++
    }
    if(this.timer % this.nextFrameTime == 0){
      this.currentFrame++;
    }
    if(this.currentFrame == 0) this.boomAudio.play()
  }

}


window.addEventListener("click", (event) => { 
  explosion.push(new BoomAnimate({
    imageSrc: "assets/img/boom.png",
    audioSrc: "assets/audio/boom.wav",
    frameRate: 5,
    width: Math.floor(Math.random() * 400 + 20),
    height: Math.floor(Math.random() * 358 + 20),
    positionX: event.x,
    positionY: event.y,
    nextFrameTime:10
  }))

})


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  explosion.forEach((boom,index) => {
      boom.update();
      if(boom.currentFrame == 5){
        explosion.splice(index,1)
      }
  })
  requestAnimationFrame(animate);
}

animate();


