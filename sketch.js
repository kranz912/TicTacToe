let board;

function setup() {
  createCanvas(800, 800);
  board = new Board(3);
}

function draw() {
  board.display();

}
function mousePressed(){
  board.toggleTurn();
  
}

class Board{
  constructor(size){
    this.s = size;
    this.cells = [];
    this.cell_size = (width-1)/this.s;
    this.newgame();
  }
  display(){
    let cell_size = this.cell_size;

    this.cells.forEach(function(element){

      rect(element.r * cell_size, element.c *cell_size, cell_size,cell_size);
    });
  }
  newgame(){
    this.cells = [];
    this.turnsleft =9;
    for (let i = 0; i < this.s; i++) {
      for(let j=0; j<this.s;j++){
        this.cells.push({"r":i,"c":j,"t":"","v":0});
      }
      
    }
  }
  toggleTurn(){
    this.turnsleft--;
    console.log(this.turnsleft);
    if(this.turnsleft==0){
      this.newgame();
    }

  }


}
class Player{
    constructor(player){
      this.player = p;
      this.score  = 0;
    }
    select(b){
      if(b.turn ==this.player){

      }
    }
}
