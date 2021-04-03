class Tools {
    constructor(x,y){
        
        this.w = 50;
        this.h = 50;
        this.x = 30;
        this.y = canvas.height - 80;
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

        game.entities.push(new Player(  canvas.width / 2,
            canvas.height / 2,
            50,
            50,
            10,
            3,
            20,
            3))

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