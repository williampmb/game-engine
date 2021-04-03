const MOUSE_STATE = {
  NORMAL: "NORMAL",
  SELECTING: "SELECTING",
  CLICKED: "CLICKED",
  BUILDING: 'BUILDING'
};

class Mouse {
  constructor() {
    this.pos = new Vector2D(0, 0);
    this.downAt = null;
    this.selectionArea = { w: 0, h: 0 };
    this.selected = [];

    this.state = MOUSE_STATE.NORMAL;
    this.button = BUTTON.NORMAL;
    this.startListeners();
  }

  draw() {
    /*ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
    ctx.stroke();*/
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

  startListeners() {
    new MouseHandler();
  }

  cancelSelection() {
    this.selected = [];
  }

  selectedSingleEntity(e) {
    this.selected = [];
    this.selected.push(e);
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
    this.selected = this.selectedTmp;
  }

  passOrder(resource) {
    // if (!resource) {
    //   this.selected.forEach((e) => {
    //     e.task = new Vector2D(this.downAt.x, this.downAt.y);
    //   });

    // }else if(resource.kind === TYPE.WOOD){
    this.selected.forEach((e) => {
      e.task = new Vector2D(this.downAt.x-15, this.downAt.y-10);
      if (resource) {
        console.log('New JOB', resource)
        e.collect = resource;
        e.job = resource.job;
      } else {
        console.log('No job')
        e.collect = null;
        e.job = null;
      }
    });

    //}
  }
}
