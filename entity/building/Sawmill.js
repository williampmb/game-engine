class Sawmill extends Building {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);
    this.kind = KIND.BUILDING;
    this.img = new Image();
    this.img.src = "../resource/sawmill2.png";
    console.log("HOUSE");
    
    game.registerMouseLeftClick(this);
  }

  getProduct(){
    return RESOURCE.PLANK;
  }

  addStorage(material) {
    if (!game.storage[material]) {
      game.storage[material] = 0;
    }
    game.storage[material] += 1;
  }

  produce(){
    if(this.hasEnoughMaterial()){
      this.addStorage()
    }else{
      game.resourcesNeeded.push({})
    }
  }

  hasEnoughMaterial(){
    return true;
  }

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }

  onCompleteBuilding() {
    super.onCompleteBuilding();
    game.addNewPeasant(this.pos.x, this.pos.y);
  }
}
