class WareHouse extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0.0;
    this.maxVelocity = 0;
    this.kind = KIND.BUILDING;
    this.img = new Image();
    this.img.src = "../resource/storage.png";

    this.capacity = 0;

    this.buildingProgress = 0;
    this.construction = BUILDING_STATUS.IN_PROGRESS;

    game.registerMouseLeftClick(this);
  }

  draw() {
    if (this.construction === BUILDING_STATUS.IN_PROGRESS) {
      let side = 50;

      ctx.fillStyle = "black";
      ctx.fillText(
        this.buildingProgress,
        this.box.pos.x - side / 2,
        this.box.pos.y - side / 2
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(
        this.box.pos.x - side / 2,
        this.box.pos.y - side / 2,
        side,
        side
      );
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
    } else {
      super.draw();
    }
  }

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }

  buildComplete() {
    this.buildingProgress = 100;
    this.construction = BUILDING_STATUS.COMPLETE;
  }
}
