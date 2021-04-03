class GUI {
  constructor() {
    let tool = new Tools(1, 1, () => {
      console.log('BUILDING')
      game.mouse.state = MOUSE_STATE.BUILDING;
      game.mouse.cancelSelection();
    });
    game.registerMouseLeftClick(tool);
  }

  draw() {
    ctx.beginPath();

    ctx.rect(30, canvas.height - 80, 50, 50);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
  }
}
