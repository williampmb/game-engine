class IsBagNotEmpty extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    return actor.capacity > 0
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
