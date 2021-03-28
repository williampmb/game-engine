class Grass{
    constructor(x,y){
        this.sprite = new Image();
        this.sprite.src = "../resource/terrain.png";
        this.pos = new Vector2D(x,y);

        this.offsetX = 130;
        this.offsetY = 30;
        this.width = 65;
        this.heigth = 65;
    }

    draw() {
        ctx.drawImage(
          this.sprite,
          this.offsetX,
          this.offsetY,
          this.width,
          this.heigth,
          this.pos.x,
          this.pos.y,
          65,
          65,
        );
      }
}