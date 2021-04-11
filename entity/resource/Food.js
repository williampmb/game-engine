
class Food extends Resource {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);
    
    this.kind = TYPE.FOOD;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxVelocity = 0;

    this.count = 0;
    this.numbFrame = 20;

    this.img = new Image();
    this.img.src = "../resource/berries.png";

    this.action = ACTION.IDLE;
    this.job = JOB.HAVESTER;
    this.kind = KIND.RESOURCE;

    game.registerMouseLeftClick(this);
  }
  draw(){
    ctx.drawImage(
        this.img,
        this.frameX,
        this.frameY,
        32,
        32,
        this.pos.x - this.w / 2,
        this.pos.y - this.h / 2,
        32,
        32
      );
  }

  getMaterial(){
    return RESOURCE.FOOD;
  }

}