class IsCloseTo extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    let nextPos = actor.task.pos;

    let cur = new Vector2D(actor.pos.x, actor.pos.y);
    let tar = new Vector2D(nextPos.x, nextPos.y);

    cur.sub(tar);
    if (cur.mag() < 1) {
      return BTNODE_STATUS.SUCCESS;
    }
    return BTNODE_STATUS.FAILURE;
  }
}
