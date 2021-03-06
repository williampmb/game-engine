class Player extends BaseEntity {
  constructor(x, y) {
    super(
      x,
      y,
      peasantBox.w,
      peasantBox.h,
      peasantBox.ofx,
      peasantBox.ofy,
      peasantBox.sw,
      peasantBox.sh
    );

    this.frame = 0;
    this.speed = 0.1;
    this.speedWoodcuting = 200;
    this.accumulatorWood = 0;
    this.maxVelocity = 1;

    this.task = { pos: null, kind: KIND.NONE };
    this.newJob = { hasNewJob: false, resource: null, x: null, y: null };
    this.count = 0;
    this.numbFrame = 20;

    this.img = new Image();
    this.img.src = "../resource/peasant.png";

    this.action = ACTION.IDLE;
    this.job = null;
    this.bag = { full: 1, items: [] };
    //this.capacity = 0;
    // this.fullCapacity = 5;
    // this.capacityType = RESOURCE.WOOD;
    this.heading = DIRECTION.DOWN;
    this.config = spriteConfig;
    this.resource = null;
    this.kind = KIND.VILLAGE;

    game.registerMouseLeftClick(this);
  }

  update() {
    game.peasantBehavior.process(this);
  }

  draw() {
    let x = this.pos.x - this.w / 2;
    let y = this.pos.y - this.h / 2;

    super.drawSprite(
      this.config[this.action][this.heading][this.frame].x - 1,
      this.config[this.action][this.heading][this.frame].y,
      this.w - 1,
      this.h,
      x,
      y,
      this.w,
      this.h
    );

    if (this.count > this.numbFrame) {
      this.frame =
        (this.frame + 1) % this.config[this.action][this.heading].length;
      this.count %= this.numbFrame;
    }
    this.count++;

    if (this.action === ACTION.WOODCUTTING) {
      ctx.font = "10px Arial";
      ctx.fillText(
        "+ " + this.bag.items.length,
        this.pos.x - this.w,
        this.pos.y
      );
    }
  }

  emit(event) {
    if (event === RESOURCE.WOOD) {
      game.addAnimation(
        new Animation(ANIMATION.WOOD, this.pos.x, this.pos.y, 40)
      );
    }
  }

  moveTo(x, y) {
    this.direction();
    let distVect = this.distanceTo(x, y);

    this.acceleration = this.calculateAcceleration(distVect);

    if (distVect.mag() < 1) {
      this.velocity = new Vector2D(0, 0);
      this.acceleration = new Vector2D(0, 0);
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.box.pos.add(this.velocity);
    this.pos.add(this.velocity);
  }

  findWarehouse() {
    let buildings = game.buildings;
    let warehouse;
    let current;
    for (current of buildings) {
      if (current instanceof WareHouse) {
        warehouse = current;
        break;
      }
    }


    let task = { pos: null, kind: KIND.NONE };
    if (warehouse) {
      task = {
        pos: new Vector2D(warehouse.pos.x, warehouse.pos.y),
        kind: KIND.BUILDING,
        warehouse
      };
    }

    return task;
  }

  generateTask(target) {
    let task = { pos: null, kind: KIND.NONE };
    if (target) {
      task = {
        pos: new Vector2D(target.pos.x, target.pos.y),
        kind: target.kind,
      };
    }

    return task;
  }

  findNextTask() {
    let resource;
    let resources = game.resources;
    for (let i in resources) {
      if (resources[i].job === this.job) {
        resource = resources[i];
        break;
      }
    }

    let task = { pos: null, kind: KIND.NONE };
    if (resource) {
      task = {
        pos: new Vector2D(resource.pos.x, resource.pos.y),
        kind: KIND.RESOURCE,
      };
    }

    return task;
  }

  debug() {
    if (this.task !== null) {
      ctx.beginPath();
      ctx.arc(this.task.pos.x, this.task.pos.y, 5, 0, 2 * Math.PI);
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
    let distance = new Vector2D(this.task.pos.x, this.task.pos.y);
    const curPos = new Vector2D(this.pos.x, this.pos.y);

    distance.sub(curPos);

    return distance;
  }
  distanceTo(x, y) {
    let distance = new Vector2D(x, y);
    const curPos = new Vector2D(this.pos.x, this.pos.y);

    distance.sub(curPos);

    return distance;
  }
}

const peasantBox = { w: 32, h: 32, ofx: 5, ofy: 0, sw: 5, sh: 0 };

const spriteConfig = {
  [ACTION.IDLE]: {
    [DIRECTION.UP]: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [DIRECTION.DOWN]: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [DIRECTION.LEFT]: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [DIRECTION.RIGHT]: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  [ACTION.WOODCUTTING]: {
    [DIRECTION.UP]: [
      { x: 0, y: 128 },
      { x: 33, y: 128 },
      { x: 65, y: 128 },
      { x: 97, y: 128 },
    ],
    [DIRECTION.RIGHT]: [
      { x: 0, y: 128 },
      { x: 33, y: 128 },
      { x: 65, y: 128 },
      { x: 97, y: 128 },
    ],
    [DIRECTION.DOWN]: [
      { x: 0, y: 128 },
      { x: 33, y: 128 },
      { x: 65, y: 128 },
      { x: 97, y: 128 },
    ],
    [DIRECTION.LEFT]: [
      { x: 0, y: 128 },
      { x: 33, y: 128 },
      { x: 65, y: 128 },
      { x: 97, y: 128 },
    ],
  },
  [ACTION.WALKING]: {
    [DIRECTION.UP]: [
      { x: 0, y: 32 },
      { x: 32, y: 32 },
      { x: 64, y: 32 },
      { x: 96, y: 32 },
    ],
    [DIRECTION.RIGHT]: [
      { x: 0, y: 64 },
      { x: 32, y: 64 },
      { x: 64, y: 64 },
      { x: 96, y: 64 },
    ],
    [DIRECTION.DOWN]: [
      { x: 0, y: 0 },
      { x: 32, y: 0 },
      { x: 64, y: 0 },
      { x: 96, y: 0 },
    ],
    [DIRECTION.LEFT]: [
      { x: 0, y: 96 },
      { x: 32, y: 96 },
      { x: 64, y: 96 },
      { x: 96, y: 96 },
    ],
  },
};
