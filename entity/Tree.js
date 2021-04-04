class Tree extends BaseEntity{
    constructor(x, y, w, h,ofx,ofy,sw,sh){
        super(x, y, w, h,ofx,ofy,sw,sh);

        this.kind = TYPE.WOOD;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxVelocity = 0;
    
        this.count = 0;
        this.numbFrame = 20;
    
        this.img = new Image();
        this.img.src = "../resource/tree.png";
    
        this.action = ACTION.IDLE;
        this.job = JOB.WOODCUTTING;
        this.kind = KIND.RESOURCE

        game.registerMouseLeftClick(this);
    }
}