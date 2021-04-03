class HasCapacityNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    return this.capacity < this.fullCapacity
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
