const BUILDING = { NONE: 0, WAREHOUSE: 1, HOUSE: 2, SAWMILL: 3 };
const BUILDING_STATUS = { IN_PROGRESS: 0, COMPLETE: 1 };
const REQUIRED_RESOURCE = {
  [BUILDING.WAREHOUSE]: { [RESOURCE.WOOD]: 5 },
  [BUILDING.HOUSE]: { [RESOURCE.WOOD]: 10, [RESOURCE.STONE]: 4 },
  [BUILDING.SAWMILL]: {},
  [RESOURCE.PLAN]: { [RESOURCE.WOOD]: 3 },
};

class Building extends BaseEntity {
  constructor(x, y, w, h, ofx, ofy, sw, sh) {
    super(x, y, w, h, ofx, ofy, sw, sh);

    this.buildingProgress = 0;
    this.construction = BUILDING_STATUS.IN_PROGRESS;
  }

  isCompleteBuilt() {
    return this.buildingProgress > 99;
  }

  draw() {
    if (this.construction === BUILDING_STATUS.IN_PROGRESS) {
      let side = 50;

      ctx.fillStyle = "black";
      ctx.fillText(
        this.buildingProgress,
        this.box.pos.x - side / 2,
        this.box.pos.y - side / 2
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(
        this.box.pos.x - side / 2,
        this.box.pos.y - side / 2,
        side,
        side
      );
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
    } else {
      super.draw();
    }
  }

  onCompleteBuilding() {
    this.buildingProgress = 100;
    this.construction = BUILDING_STATUS.COMPLETE;
  }
}
