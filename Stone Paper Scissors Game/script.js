let playerchoice = document.querySelectorAll(".icon");
let computerChoose = "";
let comScore = document.querySelector("#comScore");
let playerScore = document.querySelector("#playerScore")
let cScore = 1;
let pScore = 1;
let resultBoard = document.querySelector("#resultBoard")
let resetBtn = document.querySelector("#resetBtn")

playerchoice.forEach((choice) => {
    // console.log(choice)
    choice.addEventListener("click" , () => {
        // console.log(choice);
        // console.log(choice.getAttribute("id"))
        let playerChoose = choice.getAttribute("id")
        comChoice();

        if(playerChoose === "stone" && computerChoose === "paper"){
            comScore.innerText = cScore++;
            resultBoard.innerText = `computer Win , player choose ${playerChoose} and computer choose ${computerChoose}`
            console.log("computer Win");
            console.log(`player choose ${playerChoose} and computer choose ${computerChoose}`)


        }else if(playerChoose === "paper" && computerChoose === "scissors"){
            comScore.innerText = cScore++;
            resultBoard.innerText = `computer Win , player choose ${playerChoose} and computer choose ${computerChoose}`
            console.log("computer win")
            console.log(`player choose ${playerChoose} and computer choose ${computerChoose}`)

        }else if(playerChoose === "scissors" && computerChoose === "stone"){
            comScore.innerText = cScore++;
            resultBoard.innerText = `computer Win , player choose ${playerChoose} and computer choose ${computerChoose}`
            console.log("computer win")
            console.log(`player choose ${playerChoose} and computer choose ${computerChoose}`)

        }else{
            playerScore.innerText = pScore++;
            resultBoard.innerText = `Player Win , player choose ${playerChoose} and computer choose ${computerChoose}`
            console.log("player win")
            console.log(`player choose ${playerChoose} and computer choose ${computerChoose}`)

        }
        
    })
   
})

let comChoice = () => {
    let choose = Math.floor(Math.random()*3)
    if(choose == 0 ){
        computerChoose = "stone"
        console.log(computerChoose);
    }else if(choose == 1 ){
        computerChoose = "paper"
        console.log(computerChoose);
    }else{
        computerChoose = "scissors"
        console.log(computerChoose);
    }
    
}

resetBtn.addEventListener("click", () => {clearScore()});

let clearScore = () => {
    comScore.innerText = "0";
    cScore = 1;
    playerScore.innerText = '0';
    pScore = 1;
    resultBoard.innerText = "Result Board"
    
}

