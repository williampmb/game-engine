const AXIS = { X: "x", Y: "y" };
class Kdtree {
  constructor() {}

  static detectCollision(entities) {
    entities.sort((a, b) => a.box.pos["x"] - b.box.pos.x);
    console.log(entities);
    let sorted = entities.map((element) => element.box.pos.x);
    console.log(sorted);
  }

  colission(entities, axis) {
    if (entities.length < 2) {
      return;
    }
    entities.sort((a, b) => a.box.pos[axis] - b.box.pos[axis]);
  }
}

class KDNode {
  constructor(entities, axis) {
    let tmp = [...entities];
    if (nodes.length < 2) {
        this.nodes = tmp;
        return;
    }
    tmp.sort((a, b) => a.box.pos[axis] - b.box.pos[axis]);
    let mid = tmp.length / 2;

    this.entities = entities;
    this.left, this.right;
    constructTree();
  }
}
