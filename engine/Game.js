
class Game {
  constructor() {
    this.debugMode = false;
    this.entities = [];
    this.resources = [];
    this.buildings = [];
    this.animations = [];
    this.resourcesNeeded = [];
    this.fps = 0;
    this.storage = { [RESOURCE.WOOD]: 15 };

    this.mouse = new Mouse();

    this.peasantBehavior = this.constructBehaviorTree();

    this.gridSystem = new Grid(canvas.width, canvas.height);
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line width
    ctx.lineWidth = 1;

    this.gridSystem.draw();
    // Door
    this.entities.forEach((e) => {
      e.draw();
    });

    this.animations.forEach((a) => {
      a.draw();
    });

    this.mouse.draw();

    if (this.debugMode) {
      CollisionHandler.debug();
    }

    this.gui.draw();

    this.debug();

    this.drawGameStatus();
  }

  update(dt) {
    if (!dt) return;

    this.entities.forEach((e) => {
      e.update();
    });

    this.animations.forEach((a) => {
      a.update();
    });

    this.mouse.update();
  }

  setup() {
    this.listeners = new ListenerHandler();
    this.gui = new GUI();

    this.entities = [];
    this.resources = [];
    this.buildings = [];

    for (let numbTree = 0; numbTree < 1; numbTree++) {
      let x = Math.floor(Math.random() * 700 + 20);
      let y = Math.floor(Math.random() * 500 + 50);
      let tree = new Tree(x, y, 50, 50, 18, 11, 36, 11);
      this.entities.push(tree);
      this.resources.push(tree);
      x = Math.floor(Math.random() * 700 + 20);
      y = Math.floor(Math.random() * 500 + 50);
      let stone = new Stone(x, y, 50, 50, 18, 11, 36, 11);
      this.entities.push(stone);
      this.resources.push(stone);
    }

    let x = Math.floor(Math.random() * 700 + 20);
    let y = Math.floor(Math.random() * 500 + 50);

    for (let numbTree = 0; numbTree < 1; numbTree++) {
      let food = new Food(x, y, 32, 32, 0, 0, 0, 0);
      this.entities.push(food);
      this.resources.push(food);
    }
    this.player = new Player(canvas.width / 2 + 100, canvas.height / 2);
    this.entities.push(this.player);
  }

  findBuildingInProgress() {
    let building;
    for (let b of this.buildings) {
      if (b.construction === BUILDING_STATUS.IN_PROGRESS) {
        building = b;
        break;
      }
    }

    return building;
  }

  drawGameStatus() {
    let x = 10,
      y = 30,
      oy = 20;

    let resources = game.storage;
    Object.entries(resources).map(([key, value]) => {
      ctx.fillStyle = "black";
      let text = key + ":" + value;
      ctx.font = "15px Arial";
      ctx.fillText(text, x, y);
      y += oy;
    });
  }

  removeAnimation(animation) {
    let indexAnimation = this.animations.indexOf(animation);
    this.animations.splice(indexAnimation, 1);
  }

  addAnimation(animation) {
    this.animations.push(animation);
  }

  hasEnoughResourceToBuild(buildOpt) {
    let required = REQUIRED_RESOURCE[buildOpt];
    let enoughResource = true;
    Object.keys(required).forEach((resource) => {
      if (!this.storage[resource] || required[resource] > this.storage[resource]) {
        enoughResource = false;
        console.log("Not enough resource");
        return;
      }
    });
    return enoughResource;
  }

  consumeResources(buildOpt) {
    let required = REQUIRED_RESOURCE[buildOpt];
    Object.keys(required).forEach((resource) => {
      this.storage[resource] -= required[resource];
    });
  }

  createBuilding(mx, my, buildOpt) {
    if (!this.hasEnoughResourceToBuild(buildOpt)) {
      return;
    }

    this.consumeResources(buildOpt);

    let newBuilding;
    switch (buildOpt) {
      case BUILDING.WAREHOUSE:
        newBuilding = new WareHouse(mx, my);
        break;
      case BUILDING.HOUSE:
        console.log("HOUSE OPT");
        newBuilding = new House(mx, my, 50, 50, 18, 11, 36, 11);
        break;
      case BUILDING.SAWMILL:
        console.log("SAWMILL OPT");
        newBuilding = new Sawmill(mx, my, 50, 50, 18, 11, 36, 11);
        break;
    }
    this.entities.push(newBuilding);
    this.buildings.push(newBuilding);
  }

  addStorage(material, unit) {
    if (!this.storage[material]) {
      this.storage[material] = 0;
    }
    this.storage[material] += unit;
  }

  addNewPeasant(x, y) {
    let newPeasant = new Player(x + 50, y + 50, 50, 50, 10, 3, 20, 3);
    game.entities.push(newPeasant);
  }

  registerMouseMove(e) {
    this.listeners.registerMouseMove(e);
  }

  registerMouseLeftClick(e) {
    this.listeners.registerMouseLeftClick(e);
  }

  registerMouseRightClick(e) {
    this.listeners.registerMouseRightClick(e);
  }
  debug() {
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("FPS: " + parseInt(this.fps), canvas.width - 55, 30);
  }

  constructBehaviorTree() {
    // ----------------------------------------------
    let isABuilder = new IsBuilderNode("Builder Job Check");
    let inProgressBuilding = new BuildingInProgress("In Progress");
    let hasTaskBuilding2 = new HasTaskNode(KIND.BUILDING);
    let closeToWarehouse2 = new IsCloseTo();
    let build = new BuildNode();

    // ----------------------------------------------
    // ----------------------------------------------
    let builder = new BTSequence(
      isABuilder,
      hasTaskBuilding2,
      inProgressBuilding,
      closeToWarehouse2,
      build
    );
    //----------------------------------------------
    let hasNewJob = new HasNewJob();
    let assingnNewJob = new AssingNewJob();
    // ----------------------------------------------
    let assingNewJobSequence = new BTSequence(hasNewJob, assingnNewJob);
    // ----------------------------------------------
    let isNotInProgress = new BTInverter(new BuildingInProgress("In Progress"));
    let hasTaskBuilding = new HasTaskNode(KIND.BUILDING);
    let closeToWarehouse = new IsCloseTo();
    let hasItemOnBag = new IsBagNotEmpty();
    let drop = new DropResourceNode();
    // ----------------------------------------------
    let dropping = new BTSequence(
      hasTaskBuilding,
      isNotInProgress,
      closeToWarehouse,
      hasItemOnBag,
      drop
    );

    // ----------------------------------------------

    let hasTaskResource = new HasTaskNode(KIND.RESOURCE);
    let closeToResource = new IsCloseTo();
    let isFullCap = new HasCapacity();
    let gather = new GatherResourceNode(ACTION.WOODCUTTING);

    // ----------------------------------------------
    let gathering = new BTSequence(
      hasTaskResource,
      closeToResource,
      isFullCap,
      gather
    );
    // ----------------------------------------------

    let hasTask = new HasTaskNode();
    let closeToPos = new BTInverter(new IsCloseTo());
    let move = new MoveToNode();
    // ----------------------------------------------
    let moving = new BTSequence(hasTask, closeToPos, move);
    // ----------------------------------------------

    let findWarehouse = new FindWarehouseNode();
    // ----------------------------------------------
    let findWareHoseSequence = new BTSequence(hasItemOnBag, findWarehouse);
    // ----------------------------------------------

    let findResource = new FindResourceNode();
    // ----------------------------------------------

    let findResourceSequence = new BTSequence(isFullCap, findResource);

    // ----------------------------------------------
    let findNextBuildInProgress = new FindBuildingInProgress();
    // ----------------------------------------------
    let findBuildingInProgressSequence = new BTSequence(
      isABuilder,
      findNextBuildInProgress
    );
    // ----------------------------------------------
    let goToWork = new BTSelector(
      builder,
      dropping,
      gathering,
      moving,
      findWareHoseSequence,
      findResourceSequence,
      findBuildingInProgressSequence
    );
    let hasJob = new HasJobNode();
    // ----------------------------------------------
    let workSequence = new BTSequence(hasJob, goToWork);
    // ----------------------------------------------
    let idle = new IdleNode();

    let root = new BTSelector(assingNewJobSequence, workSequence, moving, idle);

    const peasantBrain = new BehaviorTree(root);
    return peasantBrain;
  }
}
