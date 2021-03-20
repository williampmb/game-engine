const MOUSE_STATE ={
  NORMAL:'NORMAL',
  SELECTING:'SELECTING',
  CLICKED:'CLICKED',
}

class Mouse {
  constructor() {
    this.pos = new Point2D(0, 0);
    this.downAt = null;
    this.selectionArea = { w: 0, h: 0 };
    this.selected = [];

    this.command = new Point2D(0,0); 
    this.state = MOUSE_STATE.NORMAL;
    this.startListeners();
  }

  startListeners() {
    new MouseHandler();
  }

  draw() {
    this.selected.forEach((e) => e.box.draw());

    if (this.state !== MOUSE_STATE.SELECTING) return;

    let selectWidth = this.downAt.x - this.pos.x;
    let selectHeigth = this.downAt.y - this.pos.y;

    ctx.lineWidth = "5";
    ctx.strokeStyle = "green";
    ctx.strokeRect(this.pos.x, this.pos.y, selectWidth, selectHeigth);

  }

  update() {
    if (this.state !== MOUSE_STATE.SELECTING) return;
    
   
    this.selectingEntities();
  }

  selectingEntities() {
    let entities = game.entities;
    let mouseBox = new Box(
      this.downAt.x,
      this.downAt.y,
      this.selectionArea.fx * this.selectionArea.w,
      this.selectionArea.fy * this.selectionArea.h
    );

    this.selectedTmp = [];
    entities.forEach((e) => {
      let collide = CollisionHandler.detectCollision(e.box, mouseBox);

      if (collide) {
        this.selectedTmp.push(e);
      }
    });
    this.selected = this.selectedTmp;
  }

  selectionMode() {}
}
