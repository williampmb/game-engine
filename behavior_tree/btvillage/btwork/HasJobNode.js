class HasJobNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    if (this.npc.job) {
      return BTNODE_STATUS.SUCCESS;
    }

    return BTNODE_STATUS.FAILURE;
  }
}
