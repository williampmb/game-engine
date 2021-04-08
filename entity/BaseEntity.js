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
  STONE: "STONE",
  FOOD: "FOOD",
  VILLAGE: "VILLAGE",
  BUILDING: "BUILDING",
};

const JOB = {
  IDLE: "IDLE",
  WOODCUTTING: "WOODCUTTING",
  MINING: "MINING",
  HAVESTING: "HAVESTING",
  BUILDING: "BUILDING",
};

const DIRECTION = {
  DOWN: "DOWN",
  UP: "UP",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

const KIND = {
  NONE: "NONE",
  VILLAGE: "VILLAGE",
  RESOURCE: "RESOURCE",
  BUILDING: "BUILDING",
  GUI: "GUI",
};

class BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    this.pos = new Vector2D(x, y);
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.w = w;
    this.h = h;

    this.box = new Box(x, y, w, h, ofx, ofy, sw, sh);
    this.heading = DIRECTION.DOWN;
    this.kind = KIND.NONE;
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
  drawSprite(
    _frameX,
    _frameY,
    _widthSrc,
    _heightSrc,
    _x,
    _y,
    _widthDest,
    _heightDest
  ) {
    ctx.drawImage(
      this.img,
      _frameX,
      _frameY,
      _widthSrc,
      _heightSrc,
      _x,
      _y,
      _widthDest,
      _heightDest
    );
  }

  update() {}

  offsetBoxCollider() {}

  direction() {
    let degree = this.velocity.direction();

    //
    if (this.velocity.mag() === 0 || (degree > 45 && degree < 135)) {
      this.heading = DIRECTION.DOWN;
    } else if (degree >= 135 && degree <= 235) {
      this.heading = DIRECTION.LEFT;
    } else if (degree <= 45 || degree >= 315) {
      this.heading = DIRECTION.RIGHT;
    } else {
      this.heading = DIRECTION.UP;
    }
  }

  isPointOver(x, y) {
    let w2 = this.w;
    let h2 = this.h;
    let x2 = this.pos.x - this.w / 2;
    let y2 = this.pos.y - this.h / 2;

    if (x > x2 && x < x2 + w2 && y > y2 && y < y2 + h2) {
      return true;
    } else {
      return false;
    }
  }

  mouseLeftClick(mx, my) {
    if (!this.isPointOver(mx, my)) return;
    return true;
  }
}
