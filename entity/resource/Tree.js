const debugtree = true;
class Tree extends Resource {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

    this.kind = TYPE.WOOD;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxVelocity = 0;

    this.count = 0;
    this.numbFrame = 20;

    this.img = new Image();
    this.img.src = "../resource/tree.png";

    this.action = ACTION.IDLE;
    this.job = JOB.WOODCUTTING;
    this.kind = KIND.RESOURCE;

    game.registerMouseLeftClick(this);
  }

  getMaterial() {
    return RESOURCE.WOOD;
  }

  draw() {
    super.draw();
    if (debugtree) {
      this.debug();
    }
  }
  debug() {
    let x = this.pos.x,
      y = this.pos.y;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
}