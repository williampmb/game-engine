class Box {
  constructor(x, y, w, h, offsetX, ofssetY) {
    this.pos = new Vector2D(x + offsetX, y + ofssetY);
    this.w = w;
    this.h = h;
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
