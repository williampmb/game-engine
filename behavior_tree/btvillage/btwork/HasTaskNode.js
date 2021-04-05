class HasTaskNode extends BTNode {
  constructor(npc, kind) {
    super();
    this.npc = npc;
    this.kind = kind;
  }

  think() {
    if (!this.npc.task || (this.kind && this.kind !== this.npc.task.kind) || !this.npc.task.pos) {
      return BTNODE_STATUS.FAILURE;
    }
    return  BTNODE_STATUS.SUCCESS ;
  }
}
