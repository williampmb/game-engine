class FindResourceNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    if (this.npc.task) {
      return BTNODE_STATUS.FAILURE;
    }

    let task = this.npc.findNextTask();
    if (!task) {
      return BTNODE_STATUS.FAILURE;
    }
    this.npc.task = task;
    return BTNODE_STATUS.SUCCESS;
  }
}
