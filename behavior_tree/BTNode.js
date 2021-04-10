const BTNODE_STATUS = { RUNNING: 0, SUCCESS: 1, FAILURE: 2 };

class BTNode {
  constructor(name) {
    this.name = name;
    this._state;
  }

  getState() {
    return this._state;
  }

  think() {
    throw new Error("This should be override by the class is extending");
  }
}
