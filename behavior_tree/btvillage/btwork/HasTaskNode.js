class HasTaskNode extends BTNode {
  constructor( kind) {
    super();
    this.kind = kind;
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    if (!actor.task || (this.kind && this.kind !== actor.task.kind) || !actor.task.pos) {
      return BTNODE_STATUS.FAILURE;
    }
    return  BTNODE_STATUS.SUCCESS ;
  }
}
