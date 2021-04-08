class Game {
  constructor() {
    this.debugMode = false;
    this.entities = [];
    this.resources = [];
    this.buildings = [];
    this.animations = [];
    this.fps = 0;

    this.mouse = new Mouse();

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
    this.player = new Player(
      canvas.width / 2 + 100,
      canvas.height / 2,
      50,
      50,
      10,
      3,
      20,
      3
    );
    this.entities.push(this.player);
  }

  removeAnimation(animation) {
    let indexAnimation = this.animations.indexOf(animation);
    this.animations.splice(indexAnimation, 1);
  }

  addAnimation(animation) {
    this.animations.push(animation);
  }

  createBuilding(mx, my) {
    let storage = new WareHouse(mx, my, 50, 50, 18, 11, 36, 11);
    this.entities.push(storage);
    this.buildings.push(storage);
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
    ctx.font = "14px Arial";
    ctx.fillText("FPS: " + parseInt(this.fps), canvas.width - 55, 30);
  }
}
