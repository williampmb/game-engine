class Player extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

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
    this.capacity = 0;
    this.fullCapacity = 200;
    this.heading = DIRECTION.DOWN;
    this.config = playerConfig;
    this.resource = null;
    this.kind = KIND.VILLAGE;

    this.constructBehaviorTree();

    game.registerMouseLeftClick(this);
  }

  constructBehaviorTree() {
    // ----------------------------------------------
    let hasTaskBuilding2 = new HasTaskNode(this, KIND.BUILDING);
    let closeToWarehouse2 = new IsCloseTo(this);
    let isInProgress = new BuildNode(this);
    // ----------------------------------------------
    let building = new BTSequence(
      hasTaskBuilding2,
      closeToWarehouse2,
      isInProgress
    );
    //----------------------------------------------
    let hasNewJob = new HasNewJob(this);
    let assingnNewJob = new AssingNewJob(this);
    // ----------------------------------------------
    let assingNewJobSequence = new BTSequence(hasNewJob, assingnNewJob);
    // ----------------------------------------------
    let hasTaskBuilding = new HasTaskNode(this, KIND.BUILDING);
    let closeToWarehouse = new IsCloseTo(this);
    let hasItemOnBag = new IsBagNotEmpty(this);
    let drop = new DropResourceNode(this);
    // ----------------------------------------------
    let dropping = new BTSequence(
      hasTaskBuilding,
      closeToWarehouse,
      hasItemOnBag,
      drop
    );

    // ----------------------------------------------

    let hasTaskResource = new HasTaskNode(this, KIND.RESOURCE);
    let closeToResource = new IsCloseTo(this);
    let isFullCap = new HasCapacity(this);
    let gather = new GatherResourceNode(this, ACTION.WOODCUTTING);

    // ----------------------------------------------
    let gathering = new BTSequence(
      hasTaskResource,
      closeToResource,
      isFullCap,
      gather
    );
    // ----------------------------------------------

    let hasTask = new HasTaskNode(this);
    let closeToPos = new BTInverter(new IsCloseTo(this));
    let move = new MoveToNode(this);
    // ----------------------------------------------
    let moving = new BTSequence(hasTask, closeToPos, move);
    // ----------------------------------------------

    //let isNotEmptyCap2 = new IsBagNotEmpty(this);
    let findWarehouse = new FindWarehouseNode(this);
    // ----------------------------------------------
    let findWareHoseSequence = new BTSequence(hasItemOnBag, findWarehouse);
    // ----------------------------------------------

    //let isFullCap2 = new HasCapacity(this);
    let findResource = new FindResourceNode(this);
    // ----------------------------------------------

    let findResourceSequence = new BTSequence(isFullCap, findResource);

    // ----------------------------------------------
    let goToWork = new BTSelector(
      building,
      dropping,
      gathering,
      moving,
      findWareHoseSequence,
      findResourceSequence
    );
    let hasJob = new HasJobNode(this);
    // ----------------------------------------------
    let workSequence = new BTSequence(hasJob, goToWork);
    // ----------------------------------------------
    let idle = new IdleNode(this);

    this.behavior = new BTSelector(
      assingNewJobSequence,
      workSequence,
      moving,
      idle
    );
  }

  update() {
    this.behavior.think();
  }

  draw() {
    let x = this.pos.x - this.w / 2;
    let y = this.pos.y - this.h / 2;
    //super.draw();

    super.drawSprite(
      this.config[this.action][this.heading][this.frame].x - 1,
      this.config[this.action][this.heading][this.frame].y,
      this.config.w - 1,
      this.config.h,
      x,
      y,
      this.config.w,
      this.config.h
    );

    if (this.count > this.numbFrame) {
      this.frame =
        (this.frame + 1) % this.config[this.action][this.heading].length;
      this.count %= this.numbFrame;
    }
    this.count++;

    if (this.action === ACTION.WOODCUTTING) {
      ctx.font = "30px Arial";
      ctx.fillText("+ " + this.capacity, 10, 50);
    }

    //this.debug();
    /* debug direction*/

    // ctx.font = "30px Arial";
    //ctx.fillText("+ " + this.heading, 10, 50);
  }

  emit(event) {
    if (event === ACTION.WOODCUTTING) {
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
    let building = game.buildings[0];
    let task = { pos: null, kind: KIND.NONE };
    if (building) {
      task = {
        pos: new Vector2D(building.pos.x, building.pos.y),
        kind: KIND.BUILDING,
      };
    }

    return task;
  }

  findNextTask() {
    let resource;
    let resources = game.resources;
    for (let i in resources) {
      if (resources[i].job === this.job) {
        resource = resources[i].job;
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

const playerConfig = {
  w: 32,
  h: 32,
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
