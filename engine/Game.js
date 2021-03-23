class Game {
  constructor() {
    this.debugMode = false;
    this.entities = [];
    this.resources = [];
    this.buildings = [];

    this.mouse = new Mouse();

    this.gridSystem = new Grid(canvas.width, canvas.height);

    this.setup();
  }

  draw() {
    // Set line width
    ctx.lineWidth = 1;

    this.gridSystem.draw();
    // Door
    this.entities.forEach((e) => {
      e.update();
      e.draw();
    });

    this.mouse.draw();
    this.mouse.update();

    if (this.debugMode) {
      CollisionHandler.debug();
    }
  }

  update(dt) {
    if (!dt) return;
  }

  setup() {
    this.entities = [];
    this.player = new Player(canvas.width / 2, canvas.height / 2,  50,
      50,
      10,
      3,
      20,
      3);
    this.entities.push(this.player);
    this.player2 = new Player(
      100 + canvas.width / 2,
      -200 + canvas.height / 2,
      50,
      50,
      10,
      3,
      20,
      3
    );
    //this.entities.push(this.player2);
    this.player3 = new Player(
      -100 + canvas.width / 2,
      canvas.height / 2,
      50,
      50,
      10,
      3,
      20,
      3
    );
   // this.entities.push(this.player3);

    this.resources = [];
  }
}
