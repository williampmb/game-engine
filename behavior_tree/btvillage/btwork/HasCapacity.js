class HasCapacity extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    return actor.capacity < actor.fullCapacity
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
