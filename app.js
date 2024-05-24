let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('#reset-btn');
let displayResult = document.querySelector('#displayResult');
let newGameBtn = document.querySelector("#new-game-btn");

let turnO = true;
let numberOfMoves = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

let tictactoestatus = false;

const resetGame = () => {
  turnO = true;
  numberOfMoves = 0;
  enableBoxes();
  newGameBtn.classList.add("hide");
}

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";    
  }
}

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {  
    
    if(turnO){
      box.classList.add("blueText")
      box.classList.remove("redText")
      box.innerText = 'O';
      turnO = false;
      displayResult.innerText = `O made a move`;
    }
    else{
      box.classList.add("redText")
      box.classList.remove("blueText")
      box.innerText = 'X';
      turnO = true;
      displayResult.innerText = "X made a move";
    }
    box.disabled = true;
    numberOfMoves++;
    tictactoestatus = checkWinner();  
    if(tictactoestatus){
      disableBoxes();    
    }
    if(numberOfMoves == 9 && !tictactoestatus){
      gameDraw();
    }    
  });  
});

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val === pos2Val && pos1Val === pos3Val){
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
}

const showWinner = (winner) => {
  displayResult.innerText = `Congratulations!!! ${winner} won`;
  newGameBtn.classList.remove("hide");
  disableBoxes();  
}

const gameDraw = () => {
  displayResult.innerText = "It's a Draw!";
  newGameBtn.classList.remove("hide");
  disableBoxes();  
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);