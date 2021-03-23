class Box {
  constructor(x, y, w, h, offsetX=0, ofssetY=0, shrinkW = 0, shrinkH = 0) {
    this.pos = new Vector2D(x - w / 2 + offsetX, y - h / 2 + ofssetY);
    this.w = w - shrinkW; //w is different from baseEntity w
    this.h = h - shrinkH; //h is different from baseEntity h
  }

  draw() {
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";

    // TOP LEFT
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y + this.h * 0.2);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + this.w * 0.3, this.pos.y);

    // TOP RIGHT
    ctx.moveTo(this.pos.x + this.w * 0.7, this.pos.y);
    ctx.lineTo(this.pos.x + this.w, this.pos.y);
    ctx.lineTo(this.pos.x + this.w, this.pos.y + this.h * 0.2);

    // BOTTOM LEFT
    ctx.moveTo(this.pos.x, this.pos.y + this.h * 0.8);
    ctx.lineTo(this.pos.x, this.pos.y + this.h);
    ctx.lineTo(this.pos.x + this.w * 0.3, this.pos.y + this.h);

    // BOTTOM RIGHT
    ctx.moveTo(this.pos.x + this.w * 0.7, this.pos.y + this.h);
    ctx.lineTo(this.pos.x + this.w, this.pos.y + this.h);
    ctx.lineTo(this.pos.x + this.w, this.pos.y + this.h * 0.8);

    ctx.stroke();
  }
}
