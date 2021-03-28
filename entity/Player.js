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
    this.job = null;
    this.capacity = 0;
    this.fullCapacity = 200;
    this.heading = DIRECTION.DOWN;
  }

  amIFull() {
    return this.capacity >= this.fullCapacity;
  }

  think(dist) {
    const isFull = this.amIFull();

    if (dist < 2 && this.action === ACTION.FIND_WAREHOUSE) {
      return ACTION.DROP_RESOURCE;
    } else if (dist < 2 && isFull && this.job !== null) {
      return ACTION.FIND_WAREHOUSE;
    } else if (dist < 2 && !isFull && this.job == JOB.WOODCUTTING) {
      return ACTION.WOODCUTTING;
    } else if (dist > 0 && isFull) {
      return ACTION.CARRYING_WOOD;
    } else if (dist > 1) {
      return ACTION.WALKING;
    } else {
      return ACTION.IDLE;
    }
  }

  update() {
    let distVect = this.distanceToTask();
    const dist = distVect.mag();

    this.action = this.think(dist);

    if (
      this.action === ACTION.WALKING ||
      this.action === ACTION.CARRYING_WOOD
    ) {
      this.acceleration = this.calculateAcceleration(distVect);

      if (distVect.mag() < 1) {
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
      }
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.box.pos.add(this.velocity);
      this.pos.add(this.velocity);

   
    } else if (this.action === ACTION.WOODCUTTING) {
      this.capacity++;
    } else if (this.action === ACTION.FIND_WAREHOUSE) {
      this.task = this.findWarehouse();
    } else if (this.action === ACTION.DROP_RESOURCE) {
      this.capacity = 0;
      this.task = this.findNextTask();
    }
  }

  draw() {
    switch (this.action) {
      case ACTION.IDLE:
        this.frameX = 0;
        break;
      case ACTION.WOODCUTTING:
        this.frameY = 200;
        break;
      case ACTION.WALKING:
        switch(this.heading){
          case DIRECTION.UP:
            this.frameY = 50;
            break;
          case DIRECTION.LEFT:
            this.frameY = 150;
            break;
          case DIRECTION.RIGHT:
            this.frameY = 100;
            break;
          case DIRECTION.DOWN:
            this.frameY = 0;
            break;
        }
        break;
      case ACTION.FIND_WAREHOUSE:
        this.frameY = 100;
        break;
      default:
    }

    super.draw();

    if (this.count > this.numbFrame) {
      this.frameX += 50;
      this.frameX %= 200;
      this.count %= this.numbFrame;
    }
    this.count++;

    if (this.action === ACTION.WOODCUTTING) {
      ctx.font = "30px Arial";
      ctx.fillText("+ " + this.capacity, 10, 50);
    }
    this.direction();
    //this.debug();
  }

  findWarehouse() {
    let building = game.buildings[0];
    let task = new Vector2D(building.pos.x, building.pos.y);
    return task;
  }

  findNextTask() {
    let resource = game.resources[0];
    let task = new Vector2D(resource.pos.x, resource.pos.y);
    return task;
  }

  updateAction() {
    const vel = this.velocity.mag();
    if (this.fullCapacity <= this.capacity) {
      this.action = ACTION.CARRYING_WOOD;
    } else if (vel === 0 && this.job === JOB.WOODCUTTING) {
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


  calculateAcceleration(dist) {
    const acceleration = dist.copy();

    acceleration.setMag(this.speed);

    return acceleration;
  }

  distanceToTask() {
    if (this.task == null) {
      return new Vector2D(0, 0);
    }
    let distance = new Vector2D(this.task.x, this.task.y);
    const curPos = new Vector2D(this.pos.x, this.pos.y);

    distance.sub(curPos);

    return distance;
  }
}
