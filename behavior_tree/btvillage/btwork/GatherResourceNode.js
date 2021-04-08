class GatherResourceNode extends BTNode {
  constructor(npc, action) {
    super();
    this.npc = npc;
    this.action = action;
  }

  think() {
    this.npc.accumulatorWood++;
    if (this.npc.accumulatorWood >= this.npc.speedWoodcuting) {
      this.npc.accumulatorWood = 0;
      this.npc.emit(ACTION.WOODCUTTING);
      this.npc.capacity++;
    }

    this.npc.action = this.action;
    return BTNODE_STATUS.SUCCESS;
  }
}
