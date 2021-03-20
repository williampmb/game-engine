class Game {
  constructor() {
    this.debugMode = false;

    this.mouse = new Mouse();

    this.y = 250;
    this.x = 375;
    this.gridSystem = new Grid(canvas.width, canvas.height);
    this.posx = 0;
    this.posy = 0;
    this.time = 1;
    this.entities = [];
    this.player = new Player(canvas.width / 2, canvas.height / 2, 28, 42);
    this.entities.push(this.player);
    this.player2 = new Player(100+canvas.width / 2, -200+ canvas.height / 2, 28,42);
    this.entities.push(this.player2);
  }

  draw() {
    // Set line width
    ctx.lineWidth = 1;

    this.gridSystem.draw();
    // Door
    this.entities.forEach(e=>e.draw());
    //this.player.draw();

    this.mouse.draw();

    if (this.time > 30) {
      this.posx += 50;
      this.posx %= 150;
      this.time = 0;
    }
    this.time++;

    if(this.debugMode){
      CollisionHandler.debug();  
    }
    
  }

  update(dt) {
    if (!dt) return;
    this.x += 5 / dt;
    this.y++;
    this.player.update();
  }
}
//ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
