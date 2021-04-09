class Tools {
  constructor(x, y, name, callback) {
    this.w = 50;
    this.h = 50;
    this.x = x;
    this.y = y;
    this.callback = callback;
    this.kind = KIND.GUI;
    this.name = name;
  }

  draw() {
    ctx.beginPath();

    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "gray";

    ctx.fill();
    ctx.stroke();
    ctx.fillStyle='black'
    ctx.fillText(this.name, this.x , this.y + this.h / 2);
  }

  mouseLeftClick(mx, my) {
    if (!this.isPointOver(mx, my)) return;
    this.callback();

    return true;
  }

  isPointOver(x, y) {
    let w2 = this.w;
    let h2 = this.h;
    let x2 = this.x;
    let y2 = this.y;

    if (x > x2 && x < x2 + w2 && y > y2 && y < y2 + h2) {
      return true;
    } else {
      return false;
    }
  }
}
