class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }

  sub(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  mag() {
    if (this.x === 0 && this.y === 0) return 0;
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.mag();
    if (mag === 0) return;
    this.x /= mag;
    this.y /= mag;
  }

  setMag(n) {
    if (n == 0) {
      this.x = 0;
      this.y = 0;
      return;
    }
    this.normalize();
    this.mult(n);
  }

  limit(n) {
    if (this.mag() > n) {
      this.setMag(n);
    }
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  
  direction(){
    var angle = Math.atan2(this.y, this.x);
    var degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    return degrees;
  }
}
