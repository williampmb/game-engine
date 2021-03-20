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
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.mag();
    this.x /= mag;
    this.y /= mag;
  }

  setMag(n) {
    if(this.mag()==0){
      this.x=1;
      this.y=1;
    }
    this.normalize();
    this.mult(n);
  }

  limit(n){
    if(this.mag()>n){
      this.setMag(n);
    }
  }

  copy(){
    return new Vector2D(this.x,this.y);
  }
}
