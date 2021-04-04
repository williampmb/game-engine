class DropResourceNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    this.npc.capacity--;
    return BTNODE_STATUS.SUCCESS;
  }
}
