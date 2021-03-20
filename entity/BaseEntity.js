class BaseEntity {
  constructor(x, y, w, h) {
    this.pos = new Point2D(x, y);
    this.w = w;
    this.h = y;
    this.box = new Box(x, y, w, h);
  }

  draw() {}

  update() {}

  offsetBoxCollider() {}
}
