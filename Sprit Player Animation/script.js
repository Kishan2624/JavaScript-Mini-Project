const canvas = document.querySelector("canvas")
canvas.width = 600;
canvas.height = 600;
const c = canvas.getContext("2d")
let playerState = "idle"

let select = document.querySelector("#playerState")
select.addEventListener("change", (event) => {
    playerState = event.target.value
})


class Player{
    constructor({imageSrc,frameRate,frameBuffer,animations}){
        this.position = {
            x: 0,
            y: 0,
        };
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.width  = 575;
        this.height  = 523;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.animations = animations

    }

    draw(){
        if(!this.image) return;
        const cropBox = {
            position:{
                x : 575*this.currentFrame,
                y : this.positionY,
            },

            width : 575,
            height : 523,
        };

        c.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }

    switchSprite(key){
        this.frameRate = this.animations[key].frameRate;
        this.frameBuffer = this.animations[key].frameBuffer;
        this.positionY = this.animations[key].positionY;
    }

    update(){
        this.draw();
        this.updateFrame();
    }

    updateFrame(){
        this.elapsedFrames++;
        if(this.elapsedFrames % this.frameBuffer == 0) {
            if(this.currentFrame < this.frameRate - 1){
                this.currentFrame++;
            }
            else this.currentFrame = 0;
        }   
    }
}

const player = new Player({
    imageSrc : "assets/img/shadow_dog.png",
    frameRate : 7,
    frameBuffer:4,
    animations:{
        idle:{
            frameRate:7,
            frameBuffer:4,
            positionY : 0,
        },
        jump:{
            frameRate:7,
            frameBuffer:4,
            positionY :523,
        },
        fall:{
            frameRate:7,
            frameBuffer:7,
            positionY :1046,
        },
        run:{
            frameRate:9,
            frameBuffer:4,
            positionY :1569,
        },
        dizzy:{
            frameRate:11,
            frameBuffer:4,
            positionY :2092,
        },
        sit:{
            frameRate:5,
            frameBuffer:4,
            positionY :2615,
        },
        roll:{
            frameRate:7,
            frameBuffer:4,
            positionY :3138,
        },
        bite:{
            frameRate:7,
            frameBuffer:4,
            positionY :3661,
        },
        ko:{
            frameRate:12,
            frameBuffer:4,
            positionY :4184,
        },
        getHit:{
            frameRate:4,
            frameBuffer:6,
            positionY :4707,
        },
    }
})

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "white";
    c.fillRect(0,0,canvas.width,canvas.height);
    player.switchSprite(playerState)
    player.update();
}

animate();





