class Player extends BaseEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.frameX = 0;
    this.frameY = 0;
    this.speed = 5;

    this.offsetBoxCollider(); //should be called once only in the constructor

    this.task = new Point2D(0,0)
  }

  /**
   * Offset x and y of box collider.
   * the sprite image has a x and y position
   * however the collision occurs in diffent pixel than the sprite draw
   */
  offsetBoxCollider() {
    this.box.x += 12;
    this.box.y += 3;
  }

  update() {
    // if (Math.abs(goal.x - this.x) < 10 && Math.abs(goal.y - this.y) < 10) {
    //   return;
    // }
    // if (goal.x > this.x) {
    //   this.x += this.speed;
    // }
    // if (goal.x <= this.x) {
    //   this.x -= this.speed;
    // }
    // if (goal.y > this.y) {
    //   this.y += this.speed;
    // }
    // if (goal.y <= this.y) {
    //   this.y -= this.speed;
    // }
  }

  draw() {
    // ctx.drawImage(img, this.x, this.y, 50, 50);

    ctx.drawImage(
      img,
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
}
