/** @type {HTMLCanvasElement}*/

const canvas = document.querySelector("canvas");
const gameSpeedInput = document.querySelector("input");
const c = canvas.getContext("2d");
const showSpeed = document.querySelector("p");
canvas.width = 2400;
canvas.height = 700;
let gameSpeed = 4;
gameSpeedInput.addEventListener("change", (event) => {
  gameSpeed = event.target.value;
  showSpeed.innerHTML = "Choose Game Speed: " + gameSpeed;
});

class Layer {
  constructor({ imageSrc, layerSpeed }) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.layerSpeed = layerSpeed;
    this.position = {
      x: 0,
      y: 0,
    };

    this.width = canvas.width;
    this.height = canvas.height;
  }

  cropBox = {
    position: {
      x: 0,
      y: 0,
      x2: 0,
    },
    width: 800,
    height: 700,
  };

  update() {
    this.draw();
  }

  draw() {
    this.cropBox.position.x += Number(gameSpeed)
    if(this.cropBox.position.x * this.layerSpeed <= 2400){
        c.drawImage(
            this.image,
            this.cropBox.position.x * this.layerSpeed,
            this.cropBox.position.y,
            this.cropBox.width,
            this.cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
          );

          if(this.cropBox.position.x * this.layerSpeed >= 1600) {
            this.cropBox.position.x2 = this.cropBox.position.x * this.layerSpeed - this.width;
            c.drawImage(
                this.image,
                this.cropBox.position.x2,
                this.cropBox.position.y,
                this.cropBox.width,
                this.cropBox.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height,
              );
          }


    }
    else{
        this.cropBox.position.x = 0;
        c.drawImage(
            this.image,
            this.cropBox.position.x,
            this.cropBox.position.y,
            this.cropBox.width,
            this.cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
          );
    }

    
  }
}

const layer1 = new Layer({
  imageSrc: "assests/image/layer-1.png",
  layerSpeed: 0.4,
});
const layer2 = new Layer({
  imageSrc: "assests/image/layer-2.png",
  layerSpeed: 0.4,
});
const layer3 = new Layer({
  imageSrc: "assests/image/layer-3.png",
  layerSpeed: 0.4,
});
const layer4 = new Layer({
  imageSrc: "assests/image/layer-4.png",
  layerSpeed: 0.4,
});
const layer5 = new Layer({
  imageSrc: "assests/image/layer-5.png",
  layerSpeed: 0.8,
});

const layers = [layer1, layer2, layer3, layer4, layer4, layer5];

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  layers.forEach(layer => {
    layer.update()
  })
}

animate();
