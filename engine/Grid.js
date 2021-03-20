class Grid{
    constructor(width,height){
        this.grid = [];

        this.oneGridSize = 50; 

        for(let i =0; i < width; i += this.oneGridSize){
            for(let j = 0; j < height;j+= this.oneGridSize){
                this.grid.push(new Block(i,j,this.oneGridSize,this.oneGridSize));
            }
        }
    }

    draw(){
        
        
        for(let b of this.grid){
           // b.draw();
        }
    }
}

class Block {
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    draw(){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x,this.y,this.w,this.h);
    }
}