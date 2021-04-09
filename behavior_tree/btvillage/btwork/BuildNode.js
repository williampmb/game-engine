class BuildNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    if (this.npc.resource.construction !== BUILDING_STATUS.IN_PROGRESS) {
      return BTNODE_STATUS.FAILURE;
    }
    this.npc.resource.buildingProgress++;

    if(this.npc.resource.buildingProgress>99){
      this.npc.resource.onCompleteBuilding();
    }

    return BTNODE_STATUS.SUCCESS;
  }
}
