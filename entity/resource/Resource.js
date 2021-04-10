const RESOURCE = {
  WOOD: "wood",
  STONE: "stone",
  FOOD: "food",
};

class Resource extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);
    this.material;
  }

  getMaterial() {
    throw Error("Each class should implement");
  }

  getAvailablePosInJob() {
    return [this.pos.x, this.pos.y];
  }
}
