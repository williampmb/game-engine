class Tools {
    constructor(x,y,callback){
        
        this.w = 50;
        this.h = 50;
        this.x = 30;
        this.y = canvas.height - 80;
        this.callback = callback;
        this.kind = KIND.GUI;
    }



    draw(){
        ctx.beginPath();
    
        ctx.rect(x,y, 50, 50);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.stroke();
    }

    mouseLeftClick(mx,my){
        if(!this.isPointOver(mx,my)) return;
     this.callback();

     return true;

    }

    isPointOver(x, y) {
        let w2 = this.w;
        let h2 = this.h;
        let x2 = this.x;
        let y2 = this.y;

        if (x > x2
            && x < x2 + w2
            && y > y2
            && y < y2 + h2) {
            return true;
        } else {
            return false;
        }
    }
}