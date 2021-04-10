class BuildNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.resource.construction !== BUILDING_STATUS.IN_PROGRESS) {
      return BTNODE_STATUS.FAILURE;
    }
    actor.resource.buildingProgress++;

    if (actor.resource.buildingProgress > 99) {
      actor.resource.onCompleteBuilding();
    }

    return BTNODE_STATUS.SUCCESS;
  }
}
