class DropResourceNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();
    let item = actor.bag.items.pop();
    actor.task.warehouse.addStorage(item);
    return BTNODE_STATUS.SUCCESS;
  }
}
