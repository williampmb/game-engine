const BUTTON = {
  LEFT: 0,
  SCROLL: 1,
  RIGHT: 2,
};

class MouseHandler {
  constructor() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp(event) {
    const mouse = game.mouse;

    mouse.downAt = null;
    mouse.state = MOUSE_STATE.NORMAL;


 
  }

  onMouseDown(event) {
    console.log("EVVENT MOUSE", event);

    const mouse = game.mouse;
    mouse.state=MOUSE_STATE.CLICKED;

    // UPDATE X Y BASED ON CANVAS
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left; //normalize inside of canvas
    let y = event.clientY - rect.top; //normalize inside of canvas

    if (event.button === BUTTON.LEFT) {
      //Create a command
      mouse.command = new Point2D(x, y);

      // UPDATE DOWN AT MOUSE STATUS
      mouse.downAt = new Point2D(x, y);
      mouse.selectionArea = {
        w: 0,
        h: 0,
        fx: 0,
        fy: 0,
      };

      //
    }
    //
  }

  onMouseMove(mouseEvent) {
    const mouse = game.mouse;

    mouse.state= mouse.state === MOUSE_STATE.CLICKED ? MOUSE_STATE.SELECTING : mouse.state; 

    const rect = canvas.getBoundingClientRect();
    let x = mouseEvent.clientX - rect.left;
    let y = mouseEvent.clientY - rect.top;
    
    mouse.pos = new Point2D(x, y);

    if (mouse.state === MOUSE_STATE.SELECTING) {
      let factorX = x > mouse.downAt.x ? 1 : -1;
      let factorY = y > mouse.downAt.y ? 1 : -1;
      mouse.selectionArea = {
        w: Math.abs(mouse.downAt.x - mouse.pos.x),
        h: Math.abs(mouse.downAt.y - mouse.pos.y),
        fx: factorX,
        fy: factorY,
      };
    }
  }
}
