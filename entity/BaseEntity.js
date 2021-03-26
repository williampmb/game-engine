const ACTION = {
  WALKING: "WALKING",
  IDLE: "IDLE",
  WOODCUTTING: "WOODCUTTING",
  CARRYING_WOOD: "CARRYING_WOOD",
  DELIVERYING: "DELIVERING",
  FIND_WAREHOUSE: "FIND_WAREHOUSE",
  DROP_RESOURCE: "DROP_RESOURCE",
};

const TYPE = {
  WOOD: "WOOD",
  VILLAGE: "VILLAGE",
  BUILDING: "BUILDING",
};

const JOB = { IDLE: "IDLE", WOODCUTTING: "WOODCUTTING" };

class BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    this.pos = new Vector2D(x, y);
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.w = w;
    this.h = h;

    this.box = new Box(x, y, w, h, ofx, ofy, sw, sh);
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frameX,
      this.frameY,
      50,
      50,
      this.pos.x - this.w / 2,
      this.pos.y - this.h / 2,
      50,
      50
    );
  }

  update() {}

  offsetBoxCollider() {}
}
