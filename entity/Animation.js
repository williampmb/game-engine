const ANIMATION = {
  WOOD: 0,
};

class Animation {
  constructor(name, x, y, time) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.lifespan = time;
    this.img = new Image();

    this.setup();
  }

  setup() {
    switch (this.name) {
      case ANIMATION.WOOD:
        this.img.src = "../resource/wood.png";
        break;
      default:
    }
  }

  update() {
    if (this.lifespan < 1) {
      game.removeAnimation(this);
    }
    this.y -= 0.5;
    this.lifespan--;
  }

  draw() {
    ctx.drawImage(
      this.img,
      0,
      0,
      32,
      32,
      this.x - 32 / 2,
      this.y - 32 / 2,
      32,
      32
    );
  }
}
