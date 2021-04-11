const MOUSE_STATE = {
  NORMAL: "NORMAL",
  SELECTING: "SELECTING",
  CLICKED: "CLICKED",
  BUILDING: "BUILDING",
};

class Mouse {
  constructor() {
    this.pos = new Vector2D(0, 0);
    this.downAt = null;
    this.selectionArea = { w: 0, h: 0 };
    this.selected = { entities: [], entityType: KIND.NONE };

    this.state = MOUSE_STATE.NORMAL;
    this.button = BUTTON.NORMAL;
    this.buildOpt = BUILDING.NONE;
    this.startListeners();
  }

  draw() {
    /*ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
    ctx.stroke();*/
    this.selected.entities.forEach((e) => e.box.draw());
    if (this.state === MOUSE_STATE.BUILDING) {
      ctx.beginPath();
      let side = 50;
      ctx.rect(this.pos.x - side / 2, this.pos.y - side / 2, side, side);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();
      return;
    }

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

  startListeners() {
    new MouseHandler();
  }

  cancelSelection() {
    this.selected = { entities: [], entityType: KIND.NONE };
  }
  resetStatus() {
    this.selected = { entities: [], entityType: KIND.NONE };
    this.state = MOUSE_STATE.NORMAL;
  }

  buildingMode(buildOpt) {
    this.cancelSelection();
    this.state = MOUSE_STATE.BUILDING;
    this.buildOpt = buildOpt;
  }

  selectedSingleEntity(e) {
    this.selected = { entities: [e], entityType: e.kind };
  }

  selectingEntities() {
    let entities = game.entities;
    let x = this.downAt.x ? this.downAt.x : 0;
    let y = this.downAt.y ? this.downAt.y : 0;
    let mouseBox = {
      pos: { x, y },
      w: this.selectionArea.fx * this.selectionArea.w,
      h: this.selectionArea.fy * this.selectionArea.h,
    };

    this.selectedTmp = [];
    entities.forEach((e) => {
      let collide = CollisionHandler.detectCollision(e.box, mouseBox);
      //console.log('Colide', collide, ' Box1:', e.box, ' boxM:', mouseBox)
      if (collide) {
        this.selectedTmp.push(e);
      }
    });
    this.selected.entities = this.selectedTmp;
  }

  passOrder(resource, x, y) {
    this.selected.entities.forEach((e) => {
      console.log("New JOB", resource);

      e.newJob = { hasNewJob: true, resource, x, y };
    });

    //}
  }

  buildAt(x, y) {
    console.log("Opt mouse ", this.buildOpt);
    game.createBuilding(x, y, this.buildOpt);
  }
}
