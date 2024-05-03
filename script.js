"use strict";

const ContainerEl = document.querySelector(".container");
let playerTxt = document.querySelector(".message");
let restartBtn = document.getElementById("restartbtn");
let boxes = document.querySelectorAll(".box");

const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = O_TXT;
let space = Array(9).fill(null);

let winnerIdicator = getComputedStyle(document.body).getPropertyValue(
    "--darkColor",
);

//start game
const startGame = () => {
    boxes.forEach((boxs) => boxs.addEventListener("click", boxClicked));
};

//box cliked
function boxClicked(e) {
    const id = e.target.id;

    //check id
    if(!space[id]) {
        space[id] = currentPlayer;
        e.target.innerText = currentPlayer;
 
        //winner logic
        if(playerHasWon() != false){
            playerTxt.innerHTML = ` <h2 class="message">Congratulation Player ${currentPlayer}</h2>`;
            winnerIdicator = playerHasWon();

            winnerIdicator.map(
                (box)=> (boxes[box].style.backgroundColor = "#f4d03f"),
            );
            ContainerEl.classList.add("success");
        }
        currentPlayer = currentPlayer == X_TXT ? O_TXT : X_TXT;
    }
}

//wining combination'
const winingCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//player win
function playerHasWon(){
    for(const condition of winingCombination) {
        let [a,b,c] = condition;

        if(space[a] && space[a] == space[b] && space[a] == space[c]){
            return [a,b,c];
        }
    }
    return false; 
}

//reset game
restartBtn.addEventListener('click', restartGame);

function restartGame(){
    space.fill(null);

    boxes.forEach((box)=>{
        box.innerHTML = "";
        box.style.backgroundColor = "";
    })

    playerTxt.innerHTML = "Tic Tac Toe";
    currentPlayer = O_TXT;
    ContainerEl.classList.remove("success");
}

startGame();