class GatherResourceNode extends BTNode {
  constructor(npc, action) {
    super();
    this.npc = npc;
    this.action = action;
  }

  think() {
    this.npc.capacity++;
    this.npc.action = this.action;
    return BTNODE_STATUS.SUCCESS;
  }
}
