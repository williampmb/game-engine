class GatherResourceNode extends BTNode {
  constructor(npc) {
    super();
    this.npc=npc;
  }

  think() {
    this.npc.capacity++;
    this.npc.action = ACTION.WOODCUTTING;
    return BTNODE_STATUS.SUCCESS;
  }
}
