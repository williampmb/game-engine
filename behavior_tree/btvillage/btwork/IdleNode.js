class IdleNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();
    actor.action = ACTION.IDLE;
    return BTNODE_STATUS.SUCCESS;
  }
}
