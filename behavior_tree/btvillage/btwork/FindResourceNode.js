class FindResourceNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.task.kind === KIND.RESOURCE) {
      return BTNODE_STATUS.FAILURE;
    }

    let task = actor.findNextTask();
    if (!task.pos) {
      return BTNODE_STATUS.FAILURE;
    }
    actor.task = task;
    return BTNODE_STATUS.SUCCESS;
  }
}
