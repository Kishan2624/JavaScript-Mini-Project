class Player extends Sprit {
  constructor({
    position,
    collisionBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
    platformCollisionBlocks,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 15,
      height: 15,
    };

    this.animations = animations;
    this.lastDirection = "right";

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }

    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    };
  }

  updateCameraBox() {
    this.cameraBox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 100,
    };
  }

  checkHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  checkVerticalUpCanvasCollision() {
    if (
      this.hitbox.position.y + this.velocity.y <= 0
    ) {
      this.velocity.y = 0;
    }
  }

  shouldPanCamerToTheLeft({ canvas, camera }) {
    const cameraBoxRightSide = this.cameraBox.position.x + this.cameraBox.width;
    const scaleDownCanvasWidth = canvas.width / 4;
    if (cameraBoxRightSide >= 576) return;
    if (
      cameraBoxRightSide >=
      scaleDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCamerToTheRight({ canvas, camera }) {
    if (this.cameraBox.position.x <= 0) return;
    if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  shouldPanCamerToTheDown({ canvas, camera }) {
    if (this.cameraBox.position.y + this.velocity.y <= 0) return;
    if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  shouldPanCamerToTheUp({ canvas, camera }) {
    if (
      this.cameraBox.position.y + this.cameraBox.height + this.velocity.y >=
      432
    )
      return;
    const scaleDownCanvasHeight = canvas.height / 4;
    if (
      this.cameraBox.position.y + this.cameraBox.height >=
      Math.abs(camera.position.y) + scaleDownCanvasHeight
    ) {
      camera.position.y -= this.velocity.y;
    }
  }

  update() {
    this.updateFrames();
    this.updateHitbox();
    this.updateCameraBox();

    //camera box
    // c.fillStyle = "rgba(0,0,255,0.2)";
    // c.fillRect(
    //   this.cameraBox.position.x,
    //   this.cameraBox.position.y,
    //   this.cameraBox.width,
    //   this.cameraBox.height
    // );

    // //box for player 1 frame cover
    // c.fillStyle = "rgba(0,255,0,0.2)"
    // c.fillRect(this.position.x,this.position.y,this.width,this.height)

    // // box where player live
    // c.fillStyle = "rgba(255,0,0,0.2)"
    // c.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height)

    this.draw();

    this.position.x += this.velocity.x;
    this.position;
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 33,
        y: this.position.y + 25,
      },
      width: 16,
      height: 28.1,
    };
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameRate = this.animations[key].frameRate;
    this.frameBuffer = this.animations[key].frameBuffer;
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        platfromCollision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offest =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offest - 0.01;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offest = this.hitbox.position.x - this.position.x;
          this.position.x = collisionBlock.position.x - offest + 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offest =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offest - 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offest = this.hitbox.position.y - this.position.y;
          this.position.y = collisionBlock.position.y - offest + 0.01;
          break;
        }
      }
    }

    // platformCollisionBlocks
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlocks = this.platformCollisionBlocks[i];
      if (
        platfromCollision({
          object1: this.hitbox,
          object2: platformCollisionBlocks,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offest =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = platformCollisionBlocks.position.y - offest - 0.01;
          break;
        }
      }
    }
  }
}
