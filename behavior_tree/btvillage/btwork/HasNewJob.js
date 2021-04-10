class HasNewJob extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    return actor.newJob.hasNewJob ? BTNODE_STATUS.SUCCESS : BTNODE_STATUS.FAILURE;
  }
}
