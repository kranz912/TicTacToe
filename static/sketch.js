let board;
let p1;
let p2;
let reference = {
  0: [0,0],
  1: [1,0],
  2: [2,0],
  3: [0,1],
  4: [1,1],
  5: [2,1],
  6: [0,2],
  7: [1,2],
  8: [2,2]
}

let model;
let availablemoves = [];
function setup() {
  createCanvas(800, 800);
  p1 = new Player("X");
  p2 = new Player("O");
  board = new Board(3,p1,p2);

  loadJSON('/model',function(data){
      model = data;
      availablemoves = model.data;
  });

}


function getbestmoves(){
  let currentState = board.board_state.length - 1;
  let bestmoves = [];
  for (var i = 0; i <  availablemoves.length; i++) {
     if(board.board_state[currentState] == availablemoves[i][currentState]){
       bestmoves.push(availablemoves[i]);
     }
  }
  return bestmoves;
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
    this.board_state = [];
    for (let i = 0; i < this.s; i++) {
      for(let j=0; j<this.s;j++){
        this.cells.push({"r":j,"c":i,"t":"","v":0});
      }
    }
  }
  update(coord,t){
    let index =0;
    this.cells.forEach((element)=>{

      if(element.r ===coord[0] && element.c === coord[1] && element.v ===0){
        element.t =t;
        if(t==="X"){
          element.v = 1;
        }
        else{
          element.v =-1;
        }
        this.toggleTurn();
        this.board_state.push(index);
        availablemoves =  getbestmoves();
      }
      index++
    });
    this.checkWinner(this.cells);
    if(this.turnsleft==0){
      alert('Draw');
      this.newgame();
    }
  }
  checkWinner(cells){
    let combinations= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    console.log(cells);
    combinations.forEach((combination)=> {
      var score =0;
      combination.forEach((element)=>{
          score +=cells[element].v;
      });
      if(score===3){
        alert('X wins')
        this.newgame();

      }
      else if(score ==-3) {
        alert('O wins');
        this.newgame();
      }

    });
  }


  toggleTurn(){
    this.turnsleft--;
    this.turn = this.turnsleft % 2 == 0 ?  p2.player :  p1.player;

  }


}
class Player{
    constructor(player){
      this.player = player;
      this.score  = 0;
    }
    select(b){
      if(b.turn ==this.player){
        let coord = [];
        coord[0] = int(Math.floor(mouseX/board.cell_size));
        coord[1] = int(Math.floor(mouseY/board.cell_size));
        b.update(coord,this.player);
      }
    }
}
