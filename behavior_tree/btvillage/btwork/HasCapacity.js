class HasCapacity extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    return this.npc.capacity < this.npc.fullCapacity
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
