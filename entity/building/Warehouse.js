class WareHouse extends Building {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);
    this.kind = KIND.BUILDING;
    this.img = new Image();
    this.img.src = "../resource/storage.png";

    game.registerMouseLeftClick(this);
  }

 

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }

}
