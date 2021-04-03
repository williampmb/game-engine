class BTSequence  extends BTNode {
  constructor(...nodes) {
    super();
    this.nodes = nodes;
  }

  getState() {
    return this._state;
  }

  think() {
    let isAnyChildRunning = false;
    let child;
    for (child of this.nodes) {
      switch (child.think()) {
        case BTNODE_STATUS.RUNNING:
          isAnyChildRunning = true;
          break;
        case BTNODE_STATUS.SUCCESS:
          break;
        case BTNODE_STATUS.FAILURE:
          this._state = BTNODE_STATUS.FAILURE;
          break;
        default:
          break;
      }
    }
    this._state = isAnyChildRunning
      ? BTNODE_STATUS.RUNNING
      : BTNODE_STATUS.SUCCESS;
    return this._state;
  }
}
