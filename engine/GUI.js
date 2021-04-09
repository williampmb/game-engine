class GUI {
  constructor() {
    let btn1 = new Tools(30, canvas.height - 80, 'WH',() => {
      game.mouse.buildingMode(BUILDING.WAREHOUSE);
    });
    let btn2 = new Tools(80, canvas.height - 80, 'H',() => {
      game.mouse.buildingMode(BUILDING.HOUSE);
    });

    this.btns = [btn1, btn2];

    game.registerMouseLeftClick(btn1);
    game.registerMouseLeftClick(btn2);
  }

  draw() {
    this.btns.forEach((btn) => btn.draw());
  
  }
}
