class Grid{
    constructor(width,height){
        this.grid = [];

        console.log
        this.oneGridSize = 50; 

        let i =0,j=0;
        let tileMap;
        while(i < width ){
            while( j < height){
                let random = Math.random()*10;
                if(random > 0.1){
                    tileMap = new Grass(i,j);
                }else{
                    tileMap = new Sand(i,j);
                }
                this.grid.push(tileMap);
                j += tileMap.heigth;
            }
            j=0;
            i += tileMap.width;
        }
        
    }

    draw(){
        
        for(let b of this.grid){
            b.draw();
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
        let tmp = ctx.strokeStyle;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        ctx.strokeStyle = tmp;
    }
}