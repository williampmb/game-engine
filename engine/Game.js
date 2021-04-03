class Game {
  constructor() {

    this.debugMode = false;
    this.entities = [];
    this.resources = [];
    this.buildings = [];
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
    }

    let x = Math.floor(Math.random() * 700 + 20);
    let y = Math.floor(Math.random() * 500 + 50);
  

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

  createBuilding(mx,my){
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
