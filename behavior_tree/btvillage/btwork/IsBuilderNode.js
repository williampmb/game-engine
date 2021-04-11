class IsBuilderNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.job === JOB.BUILDER) return BTNODE_STATUS.SUCCESS;

    return BTNODE_STATUS.FAILURE;
  }
}
