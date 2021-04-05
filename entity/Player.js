class Player extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

    this.frame = 0;
    this.speed = 0.1;
    this.maxVelocity = 1;

    this.task = { pos: null, kind: KIND.NONE };
    this.count = 0;
    this.numbFrame = 20;

    this.img = new Image();
    this.img.src = "../resource/village2.png";

    this.action = ACTION.IDLE;
    this.job = null;
    this.capacity = 0;
    this.fullCapacity = 200;
    this.heading = DIRECTION.DOWN;
    this.config = playerConfig;

    this.kind = KIND.VILLAGE;

    this.constructBehaviorTree();

    game.registerMouseLeftClick(this);
  }

  constructBehaviorTree() {
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

    this.behavior = new BTSelector(workSequence, moving, idle);
  }

  update() {
    this.behavior.think();
  }

  draw() {
    let x = this.pos.x - this.w / 2;
    let y = this.pos.y - this.h / 2;

    //super.draw();
    super.drawSprite(
      this.config[this.action][this.heading][this.frame].x,
      this.config[this.action][this.heading][this.frame].y,
      this.config.w,
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
    let resource = game.resources[0];

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
  w: 50,
  h: 50,
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
      { x: 0, y: 200 },
      { x: 50, y: 200 },
      { x: 100, y: 200 },
      { x: 150, y: 200 },
    ],
    [DIRECTION.DOWN]: [
      { x: 0, y: 200 },
      { x: 50, y: 200 },
      { x: 100, y: 200 },
      { x: 150, y: 200 },
    ],
    [DIRECTION.LEFT]: [
      { x: 0, y: 200 },
      { x: 50, y: 200 },
      { x: 100, y: 200 },
      { x: 150, y: 200 },
    ],
    [DIRECTION.RIGHT]: [
      { x: 0, y: 200 },
      { x: 50, y: 200 },
      { x: 100, y: 200 },
      { x: 150, y: 200 },
    ],
  },
  [ACTION.WALKING]: {
    [DIRECTION.UP]: [
      { x: 0, y: 50 },
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 150, y: 50 },
    ],
    [DIRECTION.RIGHT]: [
      { x: 0, y: 100 },
      { x: 50, y: 100 },
      { x: 100, y: 100 },
      { x: 150, y: 100 },
    ],
    [DIRECTION.DOWN]: [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 100, y: 0 },
      { x: 150, y: 0 },
    ],
    [DIRECTION.LEFT]: [
      { x: 0, y: 150 },
      { x: 50, y: 150 },
      { x: 100, y: 150 },
      { x: 150, y: 150 },
    ],
  },
};
