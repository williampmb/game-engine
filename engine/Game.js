class Game {
  constructor() {
    this.debugMode = false;
    this.entities = [];
    this.resources = [];
    this.buildings = [];
    this.fps =0;

    this.mouse = new Mouse();

    this.gridSystem = new Grid(canvas.width, canvas.height);

    this.setup();
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
    let storage = new WareHouse(x, y, 50, 50, 18, 11, 36, 11);
    this.entities.push(storage);
    this.buildings.push(storage);

    this.player = new Player(
      canvas.width / 2,
      canvas.height / 2,
      50,
      50,
      10,
      3,
      20,
      3
    );
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
  //this.entities.push(this.player3);
  }

  debug(){
    ctx.font = "14px Arial";
    ctx.fillText('FPS: '+ parseInt(this.fps) , canvas.width -55, 30);
  }
}
