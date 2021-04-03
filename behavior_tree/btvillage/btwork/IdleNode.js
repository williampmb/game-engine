class IdleNode extends BTNode {
  constructor(npc) {
    super();
    this.npc =npc;
  }

  think() {
    this.npc.action = ACTION.IDLE;
    return BTNODE_STATUS.SUCCESS;
  }
}
