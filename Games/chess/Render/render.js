import * as data from "../Data/data.js";
import * as piece from "../Data/piece.js";

import { chessBoard } from "../constant/constant.js";

//use when render the piece
export function pieceRender(data) {
  data.forEach((row) => {
    row.forEach((square) => {
      const squareDiv = document.getElementById(square.id);
      
      // Clear the contents of the square
      squareDiv.innerHTML = "";

      if (square.piece != null) {
        const img = document.createElement("img");
        img.id = square.id;
        img.classList.add("square");
        img.src = square.piece.img;
        squareDiv.append(img);
      }
    });
  });
}

//use when the game initail start
export function initGameRender(data) {
  data.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    chessBoard.append(rowDiv);
    row.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.classList.add(square.color);
      squareDiv.id = square.id;
      rowDiv.append(squareDiv);

      if (square.id[1] == "7") {
        square.piece = piece.blackPawn(square.id);
      }

      if (square.id == "a8" || square.id == "h8") {
        square.piece = piece.blackRook(square.id);
      }
      if (square.id == "b8" || square.id == "g8") {
        square.piece = piece.blackKnight(square.id);
      }
      if (square.id == "c8" || square.id == "f8") {
        square.piece = piece.blackBishop(square.id);
      }
      if (square.id == "e8") {
        square.piece = piece.blackKing(square.id);
      }
      if (square.id == "d8") {
        square.piece = piece.blackQueen(square.id);
      }

      if (square.id[1] == "2") {
        square.piece = piece.whitePawn(square.id);
      }
      if (square.id == "a1" || square.id == "h1") {
        square.piece = piece.whiteRook(square.id);
      }
      if (square.id == "b1" || square.id == "g1") {
        square.piece = piece.whiteKnight(square.id);
      }
      if (square.id == "c1" || square.id == "f1") {
        square.piece = piece.whiteBishop(square.id);
      }
      if (square.id == "d1") {
        square.piece = piece.whiteKing(square.id);
      }
      if (square.id == "e1") {
        square.piece = piece.whiteQueen(square.id);
      }
    });
  });
  pieceRender(data);
}

//high light the move position
export function blackDotHighLight(data){
  const dot = document.createElement("div")
  dot.classList.add("dot")
  const square = document.getElementById(data.id)
  square.append(dot);
}

//remove high light the move position
export function removeBlackDot(){
  const square = document.querySelectorAll(".dot")
  square.forEach(piece => {
    if(piece.classList.contains("dot")){
      piece.remove();
    }
  })
}

// self highLight 
export function selfHighLight(data){
  const square = document.getElementById(data.id)
  square.classList.add("selfHighLight")
}

//remove self highLight
export function removeSelfHighLight(){
  const square = document.querySelectorAll(".selfHighLight")
  square.forEach(piece => {
    piece.classList.remove("selfHighLight")
  })
}

//enemy high light 
export function enemyHighLight(data){
  const square = document.getElementById(data)
  square.classList.add("enemyHighLight")
}

//remove enemy high light
export function removeEnemyHighLight(){
  const square = document.querySelectorAll(".enemyHighLight")
  square.forEach(piece => {
    piece.classList.remove("enemyHighLight")
  })
}

//game start
export function gameStart(data){
  data.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    chessBoard.append(rowDiv);
    row.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.classList.add(square.color);
      squareDiv.id = square.id;
      rowDiv.append(squareDiv);
    });
  });
  pieceRender(data);
}