class WareHouse extends BaseEntity {
    constructor(x, y, w, h, ofx, ofy, sw, sh) {
        super(x, y, w, h, ofx, ofy, sw, sh);
    
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0.0;
        this.maxVelocity = 0;
    
        this.img = new Image();
        this.img.src = "../resource/storage.png";
    
        this.capacity = 0;
      }
}
