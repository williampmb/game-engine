class DropResourceNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    game.addStorage(this.npc.resource.getMaterial(), 1);
    this.npc.capacity--;
    return BTNODE_STATUS.SUCCESS;
  }
}
