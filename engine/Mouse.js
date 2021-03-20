class Mouse {
  constructor() {
    this.pos = new Point2D(0, 0);
    this.isDown = false;
    this.downAt = null;
    this.selectionArea = { w: 0, h: 0 };
    this.selected = [];

    this.startListeners();
  }

  startListeners() {
    new MouseHandler();
  }

  draw() {
    this.selected.forEach((e) => e.box.draw());

    if (!this.isDown) return;

    let selectWidth = this.downAt.x - this.pos.x;
    let selectHeigth = this.downAt.y - this.pos.y;

    ctx.lineWidth = "5";
    ctx.strokeStyle = "green";
    ctx.strokeRect(this.pos.x, this.pos.y, selectWidth, selectHeigth);

  }

  update() {
    if (!this.isDown) return;
    
    this.selected = [];
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

    entities.forEach((e) => {
      let collide = CollisionHandler.detectCollision(e.box, mouseBox);

      if (collide) {
        this.selected.push(e);
      }
    });
  }

  selectionMode() {}
}
