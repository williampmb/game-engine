class MouseHandler {
  constructor() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp() {
    game.mouse.isDown = false;
    game.mouse.downAt = null;
  }

  onMouseDown(event) {
    let mouse = game.mouse;

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left; //normalize inside of canvas
    let y = event.clientY - rect.top; //normalize inside of canvas

    mouse.isDown = true;
    mouse.downAt = new Point2D(x, y);

    mouse.selectionArea = {
      w: 0,
      h:0,
      fx: 0,
      fy: 0,
    };
  }

  onMouseMove(mouseEvent) {
    let rect = canvas.getBoundingClientRect();
    let x = mouseEvent.clientX - rect.left;
    let y = mouseEvent.clientY - rect.top;

    let mouse = game.mouse;
    mouse.pos = new Point2D(x, y);

    if (mouse.isDown) {
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
