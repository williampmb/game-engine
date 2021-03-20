class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    ctx.lineWidth = "1";
    ctx.strokeStyle = "white";
  
    // TOP LEFT
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.h * 0.2);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + this.w * 0.3, this.y);
  
    // TOP RIGHT
    ctx.moveTo(this.x + this.w * 0.7, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h * 0.2);

    // BOTTOM LEFT
    ctx.moveTo(this.x, this.y + this.h * 0.8);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x + this.w * 0.3, this.y + this.h);

    // BOTTOM RIGHT
    ctx.moveTo(this.x + this.w * 0.7, this.y + this.h);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x + this.w, this.y + this.h * 0.8);

    ctx.stroke();
  }
}
