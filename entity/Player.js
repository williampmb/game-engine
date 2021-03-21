class Player extends BaseEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0.1;
    this.maxVelocity = 1;

    this.task = null;
  }

  update() {
    if (!this.task) return;

    this.acceleration = this.calculateAcceleration();

    if (this.acceleration.mag() === 0) {
      return;
    }

    this.velocity.add(this.acceleration);
    this.box.pos.add(this.velocity);
    this.pos.add(this.velocity);
    this.velocity.limit(this.maxVelocity);
  }

  draw() {
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

    //this.debug();
  }

  debug() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = "2";

    let curPos = new Vector2D(this.pos.x, this.pos.y);
    let nextPost = new Vector2D(this.pos.x, this.pos.y);
    const actmp = new Vector2D(this.acceleration.x, this.acceleration.y);
    actmp.setMag(20);
    nextPost.add(actmp);

    ctx.beginPath();
    ctx.moveTo(curPos.x, curPos.y);
    ctx.lineTo(nextPost.x, nextPost.y);
    ctx.stroke();

    let dirVel = new Vector2D(this.pos.x, this.pos.y);
    let visualVel = new Vector2D(this.velocity.x, this.velocity.y);
    visualVel.setMag(10);
    dirVel.add(visualVel);

    ctx.strokeStyle = "green";
    ctx.lineWidth = "2";
    ctx.beginPath();
    ctx.moveTo(curPos.x, curPos.y);
    ctx.lineTo(dirVel.x, dirVel.y);
    ctx.stroke();
  }

  calculateAcceleration() {
    let towards = new Vector2D(this.task.x, this.task.y);
    const acceleration = new Vector2D(this.pos.x, this.pos.y);

    towards.sub(acceleration);

    if (towards.mag() <= 10) {
      this.velocity = new Vector2D(0,0);
      this.acceleration = new Vector2D(0,0);
      return this.acceleration;
    }

    towards.setMag(this.speed);

    return towards;
  }
}
