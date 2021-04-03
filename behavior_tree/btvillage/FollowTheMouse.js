class FollowTheMouse extends BTNode {
  constructor(npc) {
    super();
      this.npc= npc;
  }

  think() {
    let mouse = game.mouse;
    this.npc.moveTo(mouse.pos.x,mouse.pos.y);
    return BTNODE_STATUS.SUCCESS;
  }
}
