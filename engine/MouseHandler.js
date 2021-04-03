const BUTTON = {
  NORMAL: -1,
  LEFT: 0,
  SCROLL: 1,
  RIGHT: 2,
};

const MIN_DIST_TO_SELECT = 20;

function getClickedNormalized(event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left; //normalize inside of canvas
  let y = event.clientY - rect.top; //normalize inside of canvas

  return { x, y };
}

class MouseHandler {
  constructor() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("click", this.onMouseLeftClick);
  }

  onMouseUp(event) {
    const mouse = game.mouse;
    let { x, y } = getClickedNormalized(event);

    if (mouse.state === MOUSE_STATE.BUILDING) {
      mouse.buildAt(x, y);
    } else if (
      mouse.state === MOUSE_STATE.CLICKED &&
      mouse.button === BUTTON.LEFT
    ) {
      let clickedEntity = game.listeners.onMouseLeftClick(x, y);

      if (clickedEntity && clickedEntity.kind === KIND.GUI) {
      } else if (clickedEntity && clickedEntity.kind === KIND.VILLAGE) {
        mouse.selectedSingleEntity(clickedEntity);
      } else {
        mouse.passOrder(clickedEntity);
      }
    }

    mouse.downAt = null;
    mouse.state =
      mouse.state === MOUSE_STATE.BUILDING
        ? MOUSE_STATE.BUILDING
        : MOUSE_STATE.NORMAL;
    mouse.button = BUTTON.NORMAL;
  }

  onMouseDown(event) {
    const mouse = game.mouse;
    mouse.state =
      mouse.state === MOUSE_STATE.BUILDING ? mouse.state : MOUSE_STATE.CLICKED;
    mouse.button = event.button;

    if (event.button === BUTTON.RIGHT) {
      mouse.resetStatus();
    } else if (event.button === BUTTON.LEFT) {
      // UPDATE X Y BASED ON CANVAS
      let { x, y } = getClickedNormalized(event);

      mouse.downAt = new Vector2D(x, y);
      mouse.selectionArea = {
        w: 0,
        h: 0,
        fx: 0,
        fy: 0,
      };
    }
  }

  onMouseMove(mouseEvent) {
    const mouse = game.mouse;
    if (mouse.button === BUTTON.RIGHT) {
      return;
    }

    let { x, y } = getClickedNormalized(event);
    let dt = 9999;

    mouse.pos = new Vector2D(x, y);

    if (mouse.state === MOUSE_STATE.CLICKED && mouse.button === BUTTON.LEFT) {
      const oldClickedPos = mouse.downAt.copy();
      oldClickedPos.sub(mouse.pos);
      dt = oldClickedPos.mag();
    }

    mouse.state =
      mouse.state === MOUSE_STATE.CLICKED && dt > MIN_DIST_TO_SELECT
        ? MOUSE_STATE.SELECTING
        : mouse.state;

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
