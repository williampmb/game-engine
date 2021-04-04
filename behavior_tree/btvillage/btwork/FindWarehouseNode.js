class FindWarehouseNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    if (this.npc.task.kind === KIND.BUILDING) {
      return BTNODE_STATUS.FAILURE;
    }

    let task = this.npc.findWarehouse();
    if (!task.pos) {
      return BTNODE_STATUS.FAILURE;
    }
    this.npc.task = task;
    return BTNODE_STATUS.SUCCESS;
  }
}
