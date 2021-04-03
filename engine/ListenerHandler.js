class ListenerHandler {
  constructor() {
    this.mouseMove = new Map();
    this.mouseLeftClick = new Map();
    this.mouseRightClick = new Map();
  }

  registerMouseLeftClick(e) {
    this.mouseLeftClick.set(e, e);
  }
  registerMouseRightClick(e) {
    this.mouseRightClick.set(e, e);
  }
  registerMouseMove(e) {
    this.mouseMove.set(e, e);
  }

  destroy(e) {
    this.mouseLeftClick.delete(e);
    this.mouseRightClick.delete(e);
    this.mouseMove.delete(e);
  }

  onMouseLeftClick(mx, my) {
    if (mx < 0 || my < 0 || mx > canvas.width || my > canvas.height) return;

    let listener;
    for (listener of this.mouseLeftClick.values()) {
      listener.mouseLeftClick(mx, my);
    }
  }

  onMouseRightClick(mx, my) {
    if (mx < 0 || my < 0 || mx > canvas.width || my > canvas.height) return;

    let listener;
    for (listener of this.mouseRightClick.values()) {
      listener.mouseRightClick(mx, my);
    }
  }
  onMouseMoveClick(mx, my) {
    if (mx < 0 || my < 0 || mx > canvas.width || my > canvas.height) return;

    let listener;
    for (listener of this.mouseMove.values()) {
      listener.mouseMove(mx, my);
    }
  }
}
