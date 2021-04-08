class HasNewJob extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    return this.npc.newJob.hasNewJob ? BTNODE_STATUS.SUCCESS : BTNODE_STATUS.FAILURE;
  }
}
