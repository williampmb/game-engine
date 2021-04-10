class FindWarehouseNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.task.kind === KIND.BUILDING) {
      return BTNODE_STATUS.FAILURE;
    }

    let task = actor.findWarehouse();
    if (!task.pos) {
      return BTNODE_STATUS.FAILURE;
    }
    actor.task = task;
    return BTNODE_STATUS.SUCCESS;
  }
}
