class CollisionHandler {
  constructor() {}

  static showDebug = 0;

  static debug() {
    let entities = game.entities;
    entities.forEach((e) => {
      const box = e.box;
      box.draw();
     
    });
  }

  static detectCollision(box1, box2) {
    let collideX = CollisionHandler.detectCollisionOneDimension(
      box1.pos.x,
      box1.w,
      box2.pos.x,
      box2.w
    );
    let collideY = CollisionHandler.detectCollisionOneDimension(
      box1.pos.y,
      box1.h,
      box2.pos.y,
      box2.h
    );

    return collideX && collideY;
  }

  static detectCollisionOneDimension(x1, sideLength1, x2, sideLength2) {
    let middle1 = x1 + sideLength1 / 2; //entity
    let middle2 = x2 + sideLength2 / 2; //mouse

    let distMiddle = Math.abs(middle1 - middle2);

    let maxSide = Math.abs(sideLength1 / 2) + Math.abs(sideLength2 / 2);
    if (this.showDebug > 50) {
      console.log({
        x1,
        sideLength1,
        x2,
        sideLength2,
        middle1,
        middle2,
        maxSide,
        distMiddle,
      });
      this.showDebug = 0;
    }
    this.showDebug++;

    return distMiddle < maxSide;
  }
}
