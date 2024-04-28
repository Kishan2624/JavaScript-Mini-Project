const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width= 1024;
canvas.height = 576;

const scaledCanvas = {
    width : canvas.width/4,
    height : canvas.height/4,
}

const gravity = 0.1;

const collisionBlocks = []

const platformCollisionBlocks = []

const player = new Player({
   position:{
    x:100,
    y:325,
   },

   collisionBlocks,
   platformCollisionBlocks,
   imageSrc: "assets/img/warrior/idle.png",
   frameRate:8,
   animations:{
    Idle:{
        imageSrc: "assets/img/warrior/idle.png",
        frameRate:8,
        frameBuffer:8,    
    },
    IdleLeft:{
        imageSrc: "assets/img/warrior/idleleft.png",
        frameRate:8,
        frameBuffer:8,    
    },
    Run:{
        imageSrc: "assets/img/warrior/run.png",
        frameRate:8,
        frameBuffer:5,
    },
    RunLeft:{
        imageSrc: "assets/img/warrior/runleft.png",
        frameRate:8,
        frameBuffer:5,
    },
    Jump:{
        imageSrc: "assets/img/warrior/jump.png",
        frameRate:2,
        frameBuffer:7,
    },
    JumpLeft:{
        imageSrc: "assets/img/warrior/jumpleft.png",
        frameRate:2,
        frameBuffer:7,
    },
    Fall:{
        imageSrc: "assets/img/warrior/fall.png",
        frameRate:2,
        frameBuffer:3,
    },
    FallLeft:{
        imageSrc: "assets/img/warrior/fallleft.png",
        frameRate:2,
        frameBuffer:3,
    },
   }
})

const background = new Sprit({
    position:{
        x:0,
        y:0,
    },

    imageSrc:"assets/img/background.png"
})

const key = {
    a : {
        pressed : false,
    },
    d : {
        pressed : false,
    },
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length ; i+=36){
    floorCollisions2D.push(floorCollisions.slice(i, i+36));
}



floorCollisions2D.forEach((row,y) => {
    row.forEach((symbol,x) => {
        if(symbol === 202) collisionBlocks.push(new CollisionBlocks({
            position:{
                x:x*16,
                y:y*16,
            }
        }))
    })
})

const platformCollisions2D = []
for (let i = 0; i < PlatformCollisions.length ; i+=36){
    platformCollisions2D.push(PlatformCollisions.slice(i, i+36));
}


platformCollisions2D.forEach((row,y) => {
    row.forEach((symbol,x) => {
        if(symbol === 202) platformCollisionBlocks.push(new CollisionBlocks({
            position:{
                x:x*16,
                y:y*16,
            },
            height:4,
        }))
    })
})

const backgroundImageHeight = -432;
const camera = {
    position:{
        x:0,
        y:backgroundImageHeight + scaledCanvas.height,
    },
};


function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    c.save()
    c.scale(4,4)
    c.translate(camera.position.x,camera.position.y);
    background.update();

    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.update();
    // })

    // platformCollisionBlocks.forEach(platformCollisionBlock => {
    //     platformCollisionBlock.update();
        
    // })  

    player.velocity.x = 0;
  
    
    if(key.a.pressed) {
        player.switchSprite("RunLeft")
        player.velocity.x = -2;
        player.lastDirection = "left";
        player.shouldPanCamerToTheRight({canvas,camera});
    
    }
    else if(key.d.pressed) {
        player.switchSprite("Run")
        player.velocity.x = 2;
        player.lastDirection = "right";
        player.shouldPanCamerToTheLeft({canvas,camera});
    }
    else if(player.velocity.y === 0){
        if(player.lastDirection ===  "right") player.switchSprite("Idle");
        else player.switchSprite("IdleLeft")

    }

    if(player.velocity.y < 0) {
        player.shouldPanCamerToTheDown({ canvas, camera })
        if(player.lastDirection === "right")player.switchSprite("Jump")
        else player.switchSprite("JumpLeft")
    }

    else if(player.velocity.y > 0) {
        player.shouldPanCamerToTheUp({ canvas, camera })
        if(player.lastDirection === "right") player.switchSprite("Fall")
        else player.switchSprite("FallLeft")
    };
    player.checkHorizontalCanvasCollision()
    player.checkVerticalUpCanvasCollision()
    player.update();
    c.restore()  
    
}

animate()

window.addEventListener("keydown", (event) => {
    switch (event.key){
        case "a":
            key.a.pressed = true;
        break;
        case "d":
            key.d.pressed = true;
        break;
        case "w":
            if (player.velocity.y == 0) player.velocity.y = -4;
        break;
    }
})

window.addEventListener("keyup", (event) => {
    switch (event.key){
        case "a":
            key.a.pressed = false;
        break;
        case "d":
            key.d.pressed = false;
        break;
    }
})
