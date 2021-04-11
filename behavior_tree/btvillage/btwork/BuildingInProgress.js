class BuildingInProgress extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.resource.construction === BUILDING_STATUS.IN_PROGRESS) {
      return BTNODE_STATUS.SUCCESS;
    }
    return BTNODE_STATUS.FAILURE;
  }
}
