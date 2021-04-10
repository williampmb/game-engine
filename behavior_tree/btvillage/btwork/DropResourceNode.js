class DropResourceNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    game.addStorage(actor.resource.getMaterial(), 1);
    actor.capacity--;
    return BTNODE_STATUS.SUCCESS;
  }
}
