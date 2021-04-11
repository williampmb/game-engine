class GatherResourceNode extends BTNode {
  constructor(action) {
    super();
    this.action = action;
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    actor.accumulatorWood++;
    if (actor.accumulatorWood >= actor.speedWoodcuting) {
      actor.accumulatorWood = 0;
      let material = actor.resource.getMaterial();
      actor.emit(material);
      actor.bag.items.push(material);
    }

    actor.action = this.action;
    return BTNODE_STATUS.SUCCESS;
  }
}
