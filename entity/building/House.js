class House extends Building {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);
    this.kind = KIND.BUILDING;
    this.img = new Image();
    this.img.src = "../resource/storage.png";
    console.log("HOUSE");
    game.registerMouseLeftClick(this);
  }

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }

  onCompleteBuilding() {
    super.onCompleteBuilding();
    game.addNewPeasant(this.pos.x, this.pos.y);
  }
}
