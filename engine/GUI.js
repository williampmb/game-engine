class GUI {
  constructor() {
    let tool = new Tools(1, 1, () => {
    
      game.mouse.buildingMode();
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
