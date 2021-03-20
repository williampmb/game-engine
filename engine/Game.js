class Game {
  constructor() {
    this.debugMode = false;

    this.mouse = new Mouse();

    this.y = 250;
    this.x = 375;
    this.gridSystem = new Grid(canvas.width, canvas.height);
    this.entities = [];
    this.player = new Player(canvas.width / 2, canvas.height / 2, 28, 42);
    this.entities.push(this.player);
    this.player2 = new Player(
      100 + canvas.width / 2,
      -200 + canvas.height / 2,
      28,
      42
    );
    this.entities.push(this.player2);
    this.player3 = new Player(
      -100 + canvas.width / 2,
      canvas.height / 2,
      28,
      42
    );
    this.entities.push(this.player3);
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
    this.x += 5 / dt;
    this.y++;
  }
}
//ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
