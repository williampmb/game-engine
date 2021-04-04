class IsCloseTo extends BTNode {
  constructor(npc, kind) {
    super();
    this.npc = npc;
    this.kind = kind;
  }

  think() {
    if (!this.npc.task || this.kind !== this.npc.task.kind) {
      return BTNODE_STATUS.FAILURE;
    }

    let nextPos = this.npc.task.pos;

    let cur = new Vector2D(this.npc.pos.x, this.npc.pos.y);
    let tar = new Vector2D(nextPos.x, nextPos.y);

    cur.sub(tar);
    if (cur.mag() < 1) {
      return BTNODE_STATUS.SUCCESS;
    }
    return BTNODE_STATUS.FAILURE;
  }
}
