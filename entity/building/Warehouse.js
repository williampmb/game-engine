const WH_BOX = { w:32, h:32, ofx:5, ofy:0, sw:5, sh:0}

class WareHouse extends Building {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, WH_BOX.w, WH_BOX.h, WH_BOX.ofx, WH_BOX.ofy, WH_BOX.sw, WH_BOX.sh);
    this.kind = KIND.BUILDING;
    this.img = new Image();
    this.img.src = "../resource/warehouse.png";

    game.registerMouseLeftClick(this);
  }

  addStorage(material) {
    if (!game.storage[material]) {
      game.storage[material] = 0;
    }
    game.storage[material] += 1;
  }

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }
}
