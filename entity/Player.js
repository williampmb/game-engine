class Player extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0.1;
    this.maxVelocity = 1;

    this.task = null;
    this.count = 0;
    this.numbFrame = 20;

    this.img = new Image();
    this.img.src = "../resource/village2.png";

    this.action = ACTION.IDLE;
    this.collect = null;
    this.job = null;
    this.capacity = 0;
  }

  update() {
    if (!this.task) return;

    this.acceleration = this.calculateAcceleration();

    if (this.acceleration.mag() === 0) {
      if (this.job === JOB.WOODCUTTING) {
        this.capacity++;
      }
      this.velocity = new Vector2D(0, 0);
    }

    this.velocity.add(this.acceleration);
    this.box.pos.add(this.velocity);
    this.pos.add(this.velocity);
    this.velocity.limit(this.maxVelocity);

    this.updateAction();
  }

  draw() {
    switch (this.action) {
      case ACTION.IDLE:
        this.frameX = 0;
        break;
      case ACTION.WOODCUTTING:
        this.frameY = 50;
        break;
      case ACTION.WALKING:
        this.frameY = 0;
        break;
      default:
    }

    console.log("FRAME XY,", this.frameX, this.frameY);

    super.draw();

    if (this.count > this.numbFrame) {
      this.frameX += 50;
      this.frameX %= 150;
      this.count %= this.numbFrame;
    }
    this.count++;

    if (this.action === ACTION.WOODCUTTING) {
      ctx.font = "30px Arial";
      ctx.fillText("+ " + this.capacity, 10, 50);
    }
    // this.debug();
  }

  updateAction() {
    const vel = this.velocity.mag();
    if (vel === 0 && this.job === JOB.WOODCUTTING) {
      this.action = ACTION.WOODCUTTING;
    } else if (this.velocity.mag() === 0) {
      this.action = ACTION.IDLE;
    } else {
      this.action = ACTION.WALKING;
    }
  }

  debug() {
    if (this.task !== null) {
      ctx.beginPath();
      ctx.arc(this.task.x, this.task.y, 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.rect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);
    ctx.stroke();

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

    if (towards.mag() <= 2) {
      this.acceleration = new Vector2D(0, 0);
      return this.acceleration;
    }

    towards.setMag(this.speed);

    return towards;
  }
}
