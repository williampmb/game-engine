class BTInverter extends BTNode{
  constructor(node) {
    super();
    this.node = node;
  }

  getState() {
    return this._state;
  }

  think() {
    switch (child.think()) {
      case BTNODE_STATUS.RUNNING:
        this._state = BTNODE_STATUS.RUNNING;
        break;
      case BTNODE_STATUS.SUCCESS:
        this._state = BTNODE_STATUS.FAILURE;
        break;
      case BTNODE_STATUS.FAILURE:
        this._state = BTNODE_STATUS.SUCCESS;
        break;
      default:
        break;
    }
    return this._state;
  }
}
