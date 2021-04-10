class IsBuilderNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (actor.job === JOB.BUILDING) return BTNODE_STATUS.SUCCESS;

    return BTNODE_STATUS.FAILURE;
  }
}
