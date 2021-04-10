class MoveToNode extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    let task = actor.task.pos;
    actor.moveTo(task.x, task.y);
    actor.action = ACTION.WALKING;
    return BTNODE_STATUS.RUNNING;
  }
}
