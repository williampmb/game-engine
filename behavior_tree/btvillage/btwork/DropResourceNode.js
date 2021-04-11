class DropResourceNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();
    let item = actor.bag.items.pop();
    actor.resource.addStorage(item);
    return BTNODE_STATUS.SUCCESS;
  }
}
