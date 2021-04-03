class BTSelector  extends BTNode {
  constructor(...nodes) {
    super();
    this.nodes = nodes;
  }

  getState() {
    return this._state;
  }

  think() {
    for (let child of this.nodes) {
      switch (child.think()) {
        case BTNODE_STATUS.RUNNING:
          this._state = BTNODE_STATUS.RUNNING;
          return this._state;
        case BTNODE_STATUS.SUCCESS:
          this._state = BTNODE_STATUS.SUCCESS;
          return this._state;
        case BTNODE_STATUS.FAILURE:
          break;
        default:
          break;
      }
    }
    this._state = BTNODE_STATUS.FAILURE;
    return this._state;
  }
}
