class HasTaskNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    return this.npc.task.pos ? BTNODE_STATUS.SUCCESS : BTNODE_STATUS.FAILURE;
  }
}
