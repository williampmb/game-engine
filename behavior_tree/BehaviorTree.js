class BehaviorTree {
  constructor(root, actor) {
    this._actor = actor;
    this._root = root;
  }

  getActor() {
    return this._actor;
  }

  setActor(actor) {
    this._actor = actor;
  }

  setRoot(root) {
    this._root = root;
  }

  getState() {
    return this._state;
  }

  process(actor) {
    if (!actor) return;
    this.setActor(actor);
    this._root.think();
  }
}
