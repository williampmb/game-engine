class GUI {
  constructor() {
    let tool = new Tools(1, 1, () => {
    
      game.mouse.buildingMode(BUILDING.WAREHOUSE);
    });
    let tool2 = new Tools(1, 1, () => {
    
      game.mouse.buildingMode(BUILDING.HOUSE);
    });

    
    game.registerMouseLeftClick(tool);
    game.registerMouseLeftClick(tool2);
  }

  draw() {
    ctx.beginPath();

    ctx.rect(30, canvas.height - 80, 50, 50);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
  }
}
