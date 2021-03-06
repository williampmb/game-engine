class HasJobNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.job) {
      return BTNODE_STATUS.SUCCESS;
    }

    return BTNODE_STATUS.FAILURE;
  }
}
