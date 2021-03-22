const ACTION = {
  WALKING: "WALKING",
  IDLE: "IDLE",
};
class BaseEntity {
  constructor(x, y, w, h) {
    this.pos = new Vector2D(x, y);
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.w = w;
    this.h = y;

    this.box = new Box(x, y, w, h, 12, 3);
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frameX,
      this.frameY,
      50,
      50,
      this.pos.x,
      this.pos.y,
      50,
      50
    );
  }

  update() {}

  offsetBoxCollider() {}
}
