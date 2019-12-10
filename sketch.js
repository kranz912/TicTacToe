let board;
let p1;
let p2;



function setup() {
  createCanvas(800, 800);
  p1 = new Player("X");
  p2 = new Player("O");
  board = new Board(3,p1,p2);
}

function draw() {
  board.display();

}
function mousePressed(){

  if(board.turn === "X"){
    p1.select(board);
  }
  else{
    p2.select(board);
  }
  board.toggleTurn();
}

class Board{
  constructor(size,p1,p2){
    this.s = size;
    this.cells = [];
    this.cell_size = (width-1)/this.s;

    this.p1 = p1;
    this.p2= p2;
    this.newgame();
  }
  display(){
    let cell_size = this.cell_size;

    this.cells.forEach(function(element){

      rect(element.r * cell_size, element.c *cell_size, cell_size,cell_size);
      textSize(64);
      textAlign(CENTER);
      text(element.t, element.r *cell_size+ cell_size/2, element.c * cell_size + cell_size/1.5);
    });
  }
  newgame(){
    this.cells = [];
    this.turnsleft =9;
    this.turn=this.p1.player;
    for (let i = 0; i < this.s; i++) {
      for(let j=0; j<this.s;j++){
        this.cells.push({"r":i,"c":j,"t":"","v":0});
      }
      
    }
  }
  update(r,c,t){
    
    this.cells.forEach(function(element){
      if(element.r ===r && element.c === c && element.v ===0){
        element.t =t;
        if(t==="X"){
          element.v = 1;
        }
        else{
          element.v =-1;
        }
      }
    });
  }

  toggleTurn(){
    this.turnsleft--;
    console.log(this.turnsleft);
    this.turn = this.turnsleft % 2 == 0 ?  p2.player :  p1.player;
    console.log(this.turn);
    if(this.turnsleft==-1){
      this.newgame();
    }


  }


}
class Player{
    constructor(player){
      this.player = player;
      this.score  = 0;
    }
    select(b){
      if(b.turn ==this.player){
        let cx = int(Math.floor(mouseX/board.cell_size));
        let cy = int(Math.floor(mouseY/board.cell_size));
        b.update(cx,cy,this.player);
      }
    }
}
