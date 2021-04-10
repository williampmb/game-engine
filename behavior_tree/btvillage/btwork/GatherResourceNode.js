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
      actor.emit(ACTION.WOODCUTTING);
      actor.capacity++;
    }

    actor.action = this.action;
    return BTNODE_STATUS.SUCCESS;
  }
}
