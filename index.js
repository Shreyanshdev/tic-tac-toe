const boxes= document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameinfo");
const newGamebtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*initialise game function*/
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""] ;

    //empty the box in ui too
    boxes.forEach((box,index) =>{
        box.innerText= "";
        boxes[index].style.pointerEvents = "all";
        //reapply css property
        box.classList = `box box${index + 1}`;
    });


    newGamebtn.classList.remove("active") ;
    gameInfo.innerText =  `Current player - ${currentPlayer}` ;
}

initGame();

function checkOver() {
    let answer ="";
    
    winningPositions.forEach((position) => {
    if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            boxes.forEach((box) => 
            {
                box.style.pointerEvents = "none";
            }) ;

            //check who is winnner
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            //ab jo winner hai give him green colour
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
        
    });

    //it means we have winner!
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }


    //check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGamebtn.classList.add("active");
    }



}

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X" ;
    }

    //UI update
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}



function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText =currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none"; 

        //swap turn
        swapTurn();

        //check if someone wins
        checkOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });

});

newGamebtn.addEventListener('click', initGame);