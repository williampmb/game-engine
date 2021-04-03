class MoveToNode extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    let task = this.npc.task;
    this.npc.moveTo(task.x, task.y);
    let distVect = this.npc.distanceToTask();
    const dist = distVect.mag();
    this.npc.action = ACTION.WALKING;
    return dist < 1 ? BTNODE_STATUS.FAILURE : BTNODE_STATUS.RUNNING;

  }
}
