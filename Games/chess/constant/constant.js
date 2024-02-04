import { initGame,showSaveGame } from "../Data/data.js"

export const chessBoard = document.getElementById("chessBoard")
export const globalData = initGame();
export const showSaveGamePiece = showSaveGame();
export function getSquareElement(id) {
    const flatGlobalData = globalData.flat();
    const piece = flatGlobalData.find((square) => square.id === id);
    return piece || null; // Return the found piece or null if not found
}

export let curPlayer = "Black";
export function currentPlayer(){
    curPlayer = curPlayer === "Black" ? "White" : "Black";
    let playerTurn = document.getElementById("playerTurn")
    playerTurn.innerText = `${curPlayer}'s Turn`
    return curPlayer;
}
