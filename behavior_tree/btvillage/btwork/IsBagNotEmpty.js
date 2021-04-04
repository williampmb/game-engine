class IsBagNotEmpty extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    return this.npc.capacity > 0
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
