class FindBuildingInProgress extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    let building = game.findBuildingInProgress();
    let task = actor.generateTask(building);
    actor.task = task;
    actor.resource = building;

    return BTNODE_STATUS.SUCCESS;
  }
}
