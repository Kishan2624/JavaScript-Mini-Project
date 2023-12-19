let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let msg = document.querySelector("#winner");
let newGame = document.querySelector("#newGameBtn");
let turn = true // player turn x or 0
let count = 0;
let game = document.querySelector(".container")

const winPosition = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetGame = () => {
    turn = true;
    enabledBoxes();
    newGame.classList.add("hide");
    msg.classList.add("hide");
    count = 0;
    game.classList.remove("hide");

}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
    if(turn){
        // player 0
        box.innerHTML = "O";
        box.style.color = "black";
        turn = false;
    } else{
        // player x
        box.innerHTML = "X";
        box.style.color = "red";
        turn = true;
    }
    box.disabled = true;

    checkWinner();
    checkDraw();
    
    });
});
const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    msg.classList.remove("hide");
    newGame.classList.remove("hide");
    game.classList.add("hide")
    disabledBoxes();

}


const checkWinner = () => {
    for(let pattern of winPosition){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if( pos1Val != "" && pos1Val != ""  && pos1Val != ""  ){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                console.log("winner",pos1Val)
                showWinner(pos1Val);
            }
        }
    }
}
 
const checkDraw = () =>{
    count++;
    if(count === 9){
        msg.innerText = "Game Draw"
        msg.classList.remove("hide");
        newGame.classList.remove("hide");
        game.classList.add("hide");
        disabledBoxes();
    }
}
newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);



