import {
  blackDotHighLight,
  removeBlackDot,
  removeSelfHighLight,
  selfHighLight,
  enemyHighLight,
  removeEnemyHighLight,
  initGameRender,
  pieceRender,
} from "../Render/render.js";
import {
  chessBoard,
  getSquareElement,currentPlayer,curPlayer
} from "../constant/constant.js";
import * as move from "../Render/move.js";
import { initGame, saveGame } from "../Data/data.js";



export function checkCurPlayer() {
  const chessBoard = document.getElementById("chessBoard");

  const handleSquareClick = (event) => {
    deselectAllSquares();

    const square = getSquareElement(event.target.id);

    if (event.target.currentSrc && event.target.currentSrc.includes("white") && curPlayer === "White") {
      switch (square.piece.piece_Name) {
        case "WHITE PAWN":
          whitePawnClicked(square);
          break;
        case "WHITE ROOK":
          whiteRookClicked(square);
          break;
        case "WHITE KNIGHT":
          whiteKnightClicked(square);
          break;
        case "WHITE BISHOP":
          whiteBishopClicked(square);
          break;
        case "WHITE QUEEN":
          whiteQueenClicked(square);
          break;
        case "WHITE KING":
          whiteKingClicked(square);
          break;
      }

    } else if (event.target.currentSrc && event.target.currentSrc.includes("black") && curPlayer === "Black") {
      switch (square.piece.piece_Name) {
        case "BLACK PAWN":
          blackPawnClicked(square);
          break;
        case "BLACK ROOK":
          blackRookClicked(square);
          break;
        case "BLACK KNIGHT":
          blackKnightClicked(square);
          break;
        case "BLACK BISHOP":
          blackBishopClicked(square);
          break;
        case "BLACK QUEEN":
          blackQueenClicked(square);
          break;
        case "BLACK KING":
          blackKingClicked(square);
          break;
      }
    }
  };

  chessBoard.addEventListener("click", handleSquareClick);
}

//start a new game
export function newGameBtn(data){
  document.getElementById("newGame").addEventListener("click",() => {
    chessBoard.innerHTML = "";
    data.length = 0; // Clear the contents of the array
    data.push(...initGame()); // Update the array with new data
    initGameRender(data);
    saveGame(data);
  })
}

//reset the whole game
export function resetGameBtn(data) {
  document.getElementById("reset").addEventListener("click", () => {
    chessBoard.innerHTML = "";
    data.length = 0; // Clear the contents of the array
    data.push(...initGame()); // Update the array with new data
    initGameRender(data);
    saveGame(data);
  });
}

//--------------------------WHITE PAWN---------------------------
function whitePawnClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  // check one square in front is empty or not
  const oneFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) + 1}`
  );
  if (oneFrontSquare && !oneFrontSquare.piece) {
    const frontSquare = document.getElementById(oneFrontSquare.id);
    frontSquare.addEventListener("click", () => {
      move.movePawn(piece, oneFrontSquare);
    });
    blackDotHighLight(oneFrontSquare);
  }

  // check two square in front is empty or not at initial state
  const twoFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) + 2}`
  );
  if (
    piece.id[1] == "2" &&
    twoFrontSquare &&
    !twoFrontSquare.piece &&
    oneFrontSquare &&
    !oneFrontSquare.piece
  ) {
    document.getElementById(twoFrontSquare.id).addEventListener("click", () => {
      move.movePawn(piece, twoFrontSquare);
    });
    blackDotHighLight(twoFrontSquare);
  }

  // Check if there's an enemy piece to capture diagonally to the right
  const squareCaptureRight = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) + 1
    }`
  );

  if (
    squareCaptureRight &&
    squareCaptureRight.piece &&
    squareCaptureRight.piece.color === "BLACK"
  ) {
    enemyHighLight(
      `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
        Number(piece.id[1]) + 1
      }`
    );
    document
      .getElementById(squareCaptureRight.id)
      .addEventListener("click", () => {
        move.movePawn(piece, squareCaptureRight);
      });
  }

  // Check if there's an enemy piece to capture diagonally to the left
  const squareCaptureLeft = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) + 1
    }`
  );
  if (
    squareCaptureLeft &&
    squareCaptureLeft.piece &&
    squareCaptureLeft.piece.color === "BLACK"
  ) {
    enemyHighLight(
      `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
        Number(piece.id[1]) + 1
      }`
    );
    document
      .getElementById(squareCaptureLeft.id)
      .addEventListener("click", () => {
        move.movePawn(piece, squareCaptureLeft);
      });
  }
}
//-------------------------WHITE ROOK------------------------
function whiteRookClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical column up
  const verticalUpSquares = [];

  for (let x = Number(piece.id[1]) + 1; x <= 8; x++) {
    if (x === Number(piece.id[1])) {
      continue;
    }
    verticalUpSquares.push(getSquareElement(`${piece.id[0]}${x}`));
  }

  for (let i = 0; i < verticalUpSquares.length; i++) {
    let colSquarePiece = verticalUpSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  // array of vertical column down
  const verticalDownSquares = [];
  for (let d = Number(piece.id[1]) - 1; d > 0; d--) {
    if (d === Number(piece.id[1])) {
      continue;
    }
    verticalDownSquares.push(getSquareElement(`${piece.id[0]}${d}`));
  }

  for (let i = 0; i < verticalDownSquares.length; i++) {
    let colSquarePiece = verticalDownSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  //array of left horizontal row
  const horizontalLeftSquare = [];

  for (let x = 1; x < 8; x++) {
    horizontalLeftSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaLeftSquare = horizontalLeftSquare.filter((square) => {
    return square !== null;
  });

  for (let i = 0; i < NaNullHorizontaLeftSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaLeftSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  //array of right horizontal row
  const horizontalRightSquare = [];

  for (let x = 8; x > 0; x--) {
    horizontalRightSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaRightSquare = horizontalRightSquare.filter((square) => {
    return square !== null;
  });
  NaNullHorizontaRightSquare.reverse();

  for (let i = 0; i < NaNullHorizontaRightSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaRightSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveRook(piece, square);
    });
  });
}
//-------------------------WHITE KINGHT-----------------------
function whiteKnightClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical column up left & right
  const upLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) + 2
    }`
  );
  const upRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) + 2
    }`
  );

  if (upLeftSquare) {
    if (upLeftSquare && !upLeftSquare.piece) {
      blackDotHighLight(upLeftSquare);
      moveSquare.push(upLeftSquare);
    }

    // enemey highlight
    if (upLeftSquare.piece && upLeftSquare.piece.color == "BLACK") {
      enemyHighLight(upLeftSquare.id);
      moveSquare.push(upLeftSquare);
    }
  }

  if (upRightSquare) {
    if (upRightSquare.piece && upRightSquare.piece.color == "BLACK") {
      enemyHighLight(upRightSquare.id);
      moveSquare.push(upRightSquare);
    }

    // enemey highlight
    if (upRightSquare && !upRightSquare.piece) {
      blackDotHighLight(upRightSquare);
      moveSquare.push(upRightSquare);
    }
  }

  // array of vertical column down left & right
  const downLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) - 2
    }`
  );
  const downRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) - 2
    }`
  );

  if (downLeftSquare) {
    if (downLeftSquare && !downLeftSquare.piece) {
      blackDotHighLight(downLeftSquare);
      moveSquare.push(downLeftSquare);
    }

    // enemey highlight
    if (downLeftSquare.piece && downLeftSquare.piece.color == "BLACK") {
      enemyHighLight(downLeftSquare.id);
      moveSquare.push(downLeftSquare);
    }
  }

  if (downRightSquare) {
    if (downRightSquare.piece && downRightSquare.piece.color == "BLACK") {
      enemyHighLight(downRightSquare.id);
      moveSquare.push(downRightSquare);
    }

    // enemey highlight
    if (downRightSquare && !downRightSquare.piece) {
      blackDotHighLight(downRightSquare);
      moveSquare.push(downRightSquare);
    }
  }

  // array of Horizontal row left -> left & right
  const rowLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 2)}${
      Number(piece.id[1]) + 1
    }`
  );
  const rowRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 2)}${
      Number(piece.id[1]) + 1
    }`
  );

  if (rowLeftSquare) {
    if (rowLeftSquare && !rowLeftSquare.piece) {
      blackDotHighLight(rowLeftSquare);
      moveSquare.push(rowLeftSquare);
    }

    // enemey highlight
    if (rowLeftSquare.piece && rowLeftSquare.piece.color == "BLACK") {
      enemyHighLight(rowLeftSquare.id);
      moveSquare.push(rowLeftSquare);
    }
  }

  if (rowRightSquare) {
    if (rowRightSquare.piece && rowRightSquare.piece.color == "BLACK") {
      enemyHighLight(rowRightSquare.id);
      moveSquare.push(rowRightSquare);
    }

    // enemey highlight
    if (rowRightSquare && !rowRightSquare.piece) {
      blackDotHighLight(rowRightSquare);
      moveSquare.push(rowRightSquare);
    }
  }

  // array of Horizontal row right -> left & right
  const rowRightLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 2)}${
      Number(piece.id[1]) - 1
    }`
  );
  const rowRightRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 2)}${
      Number(piece.id[1]) - 1
    }`
  );

  if (rowRightLeftSquare) {
    if (rowRightLeftSquare && !rowRightLeftSquare.piece) {
      blackDotHighLight(rowRightLeftSquare);
      moveSquare.push(rowRightLeftSquare);
    }

    // enemey highlight
    if (rowRightLeftSquare.piece && rowRightLeftSquare.piece.color == "BLACK") {
      enemyHighLight(rowRightLeftSquare.id);
      moveSquare.push(rowRightLeftSquare);
    }
  }

  if (rowRightRightSquare) {
    if (
      rowRightRightSquare.piece &&
      rowRightRightSquare.piece.color == "BLACK"
    ) {
      enemyHighLight(rowRightRightSquare.id);
      moveSquare.push(rowRightRightSquare);
    }

    // enemey highlight
    if (rowRightRightSquare && !rowRightRightSquare.piece) {
      blackDotHighLight(rowRightRightSquare);
      moveSquare.push(rowRightRightSquare);
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveKnight(piece, square);
    });
  });
}
//--------------------------WHITE BISHOP------------------------
function whiteBishopClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];
  //array of right up dignal square
  let rightUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < rightUpDignal.length; i++) {
    let rowDignalPiece = rightUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of right down dignal square
  let rightDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < rightDownDignal.length; i++) {
    let rowDignalPiece = rightDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left up dignal square
  let leftUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < leftUpDignal.length; i++) {
    let rowDignalPiece = leftUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left down dignal square
  let leftDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < leftDownDignal.length; i++) {
    let rowDignalPiece = leftDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveBishop(piece, square);
    });
  });
}
//---------------------------WHITE QUEEN---------------------
function whiteQueenClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical column up
  const verticalUpSquares = [];

  for (let x = Number(piece.id[1]) + 1; x <= 8; x++) {
    if (x === Number(piece.id[1])) {
      continue;
    }
    verticalUpSquares.push(getSquareElement(`${piece.id[0]}${x}`));
  }

  for (let i = 0; i < verticalUpSquares.length; i++) {
    let colSquarePiece = verticalUpSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  // array of vertical column down
  const verticalDownSquares = [];
  for (let d = Number(piece.id[1]) - 1; d > 0; d--) {
    if (d === Number(piece.id[1])) {
      continue;
    }
    verticalDownSquares.push(getSquareElement(`${piece.id[0]}${d}`));
  }

  for (let i = 0; i < verticalDownSquares.length; i++) {
    let colSquarePiece = verticalDownSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  //array of left horizontal row
  const horizontalLeftSquare = [];

  for (let x = 1; x < 8; x++) {
    horizontalLeftSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaLeftSquare = horizontalLeftSquare.filter((square) => {
    return square !== null;
  });

  for (let i = 0; i < NaNullHorizontaLeftSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaLeftSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  //array of right horizontal row
  const horizontalRightSquare = [];

  for (let x = 8; x > 0; x--) {
    horizontalRightSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaRightSquare = horizontalRightSquare.filter((square) => {
    return square !== null;
  });
  NaNullHorizontaRightSquare.reverse();

  for (let i = 0; i < NaNullHorizontaRightSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaRightSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }
  //array of right up dignal square
  let rightUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < rightUpDignal.length; i++) {
    let rowDignalPiece = rightUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of right down dignal square
  let rightDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < rightDownDignal.length; i++) {
    let rowDignalPiece = rightDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left up dignal square
  let leftUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < leftUpDignal.length; i++) {
    let rowDignalPiece = leftUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left down dignal square
  let leftDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < leftDownDignal.length; i++) {
    let rowDignalPiece = leftDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveQueen(piece, square);
    });
  });
}
//----------------------------WHITE KING-----------------------
function whiteKingClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  //one front square
  const oneFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) + 1}`
  );
  // console.log(oneFrontSquare)
  if (oneFrontSquare) {
    if (oneFrontSquare && !oneFrontSquare.piece) {
      blackDotHighLight(oneFrontSquare);
      moveSquare.push(oneFrontSquare);
    }
    //enemey highlight
    if (oneFrontSquare.piece && oneFrontSquare.piece.color == "BLACK") {
      enemyHighLight(oneFrontSquare.id);
      moveSquare.push(oneFrontSquare);
    }
  }

  //one back square

  const oneBackSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) - 1}`
  );
  // console.log(oneBackSquare)

  if (oneBackSquare) {
    if (oneBackSquare && !oneBackSquare.piece) {
      blackDotHighLight(oneBackSquare);
      moveSquare.push(oneBackSquare);
    }
    //enemey highlight
    if (oneBackSquare.piece && oneBackSquare.piece.color == "BLACK") {
      enemyHighLight(oneBackSquare.id);
      moveSquare.push(oneBackSquare);
    }
  }

  //one left square

  const oneLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${Number(
      piece.id[1]
    )}`
  );
  // console.log(oneLeftSquare)

  if (oneLeftSquare) {
    if (oneLeftSquare && !oneLeftSquare.piece) {
      blackDotHighLight(oneLeftSquare);
      moveSquare.push(oneLeftSquare);
    }
    //enemey highlight
    if (oneLeftSquare.piece && oneLeftSquare.piece.color == "BLACK") {
      enemyHighLight(oneLeftSquare.id);
      moveSquare.push(oneLeftSquare);
    }
  }

  //one right square
  const oneRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${Number(
      piece.id[1]
    )}`
  );
  // console.log(oneRightSquare)

  if (oneRightSquare) {
    if (oneRightSquare && !oneRightSquare.piece) {
      blackDotHighLight(oneRightSquare);
      moveSquare.push(oneRightSquare);
    }
    //enemey highlight
    if (oneRightSquare.piece && oneRightSquare.piece.color == "BLACK") {
      enemyHighLight(oneRightSquare.id);
      moveSquare.push(oneRightSquare);
    }
  }

  //one left up dignal square
  const oneLeftUpDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) + 1
    }`
  );
  // console.log(oneLeftUpDignalSquare);
  if (oneLeftUpDignalSquare) {
    if (oneLeftUpDignalSquare && !oneLeftUpDignalSquare.piece) {
      blackDotHighLight(oneLeftUpDignalSquare);
      moveSquare.push(oneLeftUpDignalSquare);
    }
    //enemey highlight
    if (
      oneLeftUpDignalSquare.piece &&
      oneLeftUpDignalSquare.piece.color == "BLACK"
    ) {
      enemyHighLight(oneLeftUpDignalSquare.id);
      moveSquare.push(oneLeftUpDignalSquare);
    }
  }

  //one left down dignal square
  const oneLeftDownDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  // console.log(oneLeftDownDignalSquare);
  if (oneLeftDownDignalSquare) {
    if (oneLeftDownDignalSquare && !oneLeftDownDignalSquare.piece) {
      blackDotHighLight(oneLeftDownDignalSquare);
      moveSquare.push(oneLeftDownDignalSquare);
    }
    //enemey highlight
    if (
      oneLeftDownDignalSquare.piece &&
      oneLeftDownDignalSquare.piece.color == "BLACK"
    ) {
      enemyHighLight(oneLeftDownDignalSquare.id);
      moveSquare.push(oneLeftDownDignalSquare);
    }
  }

  //one right up dignal square
  const oneRightUpDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) + 1
    }`
  );
  // console.log(oneRightUpDignalSquare);
  if (oneRightUpDignalSquare) {
    if (oneRightUpDignalSquare && !oneRightUpDignalSquare.piece) {
      blackDotHighLight(oneRightUpDignalSquare);
      moveSquare.push(oneRightUpDignalSquare);
    }
    //enemey highlight
    if (
      oneRightUpDignalSquare.piece &&
      oneRightUpDignalSquare.piece.color == "BLACK"
    ) {
      enemyHighLight(oneRightUpDignalSquare.id);
      moveSquare.push(oneRightUpDignalSquare);
    }
  }

  //one right down dignal square
  const oneRightDownDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  // console.log(oneRightDownDignalSquare);
  if (oneRightDownDignalSquare) {
    if (oneRightDownDignalSquare && !oneRightDownDignalSquare.piece) {
      blackDotHighLight(oneRightDownDignalSquare);
      moveSquare.push(oneRightDownDignalSquare);
    }
    //enemey highlight
    if (
      oneRightDownDignalSquare.piece &&
      oneRightDownDignalSquare.piece.color == "BLACK"
    ) {
      enemyHighLight(oneRightDownDignalSquare.id);
      moveSquare.push(oneRightDownDignalSquare);
    }
  }
  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveKing(piece, square);
    });
  });
}
//--------------------------------------------------------------------- BLACK PIECE -----------------------------------------------

//-------------------BLACK PAWN--------------------------
function blackPawnClicked(piece) {
  //self highlight piece
  selfHighLight(piece);
  // check one square in front is empty or not
  const oneFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) - 1}`
  );
  if (oneFrontSquare && !oneFrontSquare.piece) {
    const frontSquare = document.getElementById(oneFrontSquare.id);
    frontSquare.addEventListener("click", () => {
      move.movePawn(piece, oneFrontSquare);
    });
    blackDotHighLight(oneFrontSquare);
  }

  // check two square in front is empty or not at initial state
  const twoFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) - 2}`
  );
  if (
    piece.id[1] == "7" &&
    twoFrontSquare &&
    !twoFrontSquare.piece &&
    oneFrontSquare &&
    !oneFrontSquare.piece
  ) {
    document.getElementById(twoFrontSquare.id).addEventListener("click", () => {
      move.movePawn(piece, twoFrontSquare);
    });
    blackDotHighLight(twoFrontSquare);
  }

  // Check if there's an enemy piece to capture diagonally to the right
  const squareCaptureRight = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  if (
    squareCaptureRight &&
    squareCaptureRight.piece &&
    squareCaptureRight.piece.color === "WHITE"
  ) {
    enemyHighLight(
      `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
        Number(piece.id[1]) - 1
      }`
    );
    document
      .getElementById(squareCaptureRight.id)
      .addEventListener("click", () => {
        move.movePawn(piece, squareCaptureRight);
      });
  }

  // Check if there's an enemy piece to capture diagonally to the left
  const squareCaptureLeft = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  if (
    squareCaptureLeft &&
    squareCaptureLeft.piece &&
    squareCaptureLeft.piece.color === "WHITE"
  ) {
    enemyHighLight(
      `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
        Number(piece.id[1]) - 1
      }`
    );
    document
      .getElementById(squareCaptureLeft.id)
      .addEventListener("click", () => {
        move.movePawn(piece, squareCaptureLeft);
      });
  }
}
//---------------------------------Black Rook ------------------------------------------
function blackRookClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical row up
  const verticalUpSquares = [];

  for (let x = Number(piece.id[1]) + 1; x <= 8; x++) {
    if (x === Number(piece.id[1])) {
      continue;
    }
    verticalUpSquares.push(getSquareElement(`${piece.id[0]}${x}`));
  }

  for (let i = 0; i < verticalUpSquares.length; i++) {
    let colSquarePiece = verticalUpSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  // array of vertical row down
  const verticalDownSquares = [];
  for (let d = Number(piece.id[1]) - 1; d > 0; d--) {
    if (d === Number(piece.id[1])) {
      continue;
    }
    verticalDownSquares.push(getSquareElement(`${piece.id[0]}${d}`));
  }

  for (let i = 0; i < verticalDownSquares.length; i++) {
    let colSquarePiece = verticalDownSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  //array of left horizontal row
  const horizontalLeftSquare = [];

  for (let x = 1; x < 8; x++) {
    horizontalLeftSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaLeftSquare = horizontalLeftSquare.filter((square) => {
    return square !== null;
  });

  for (let i = 0; i < NaNullHorizontaLeftSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaLeftSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  //array of right horizontal row
  const horizontalRightSquare = [];

  for (let x = 8; x > 0; x--) {
    horizontalRightSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaRightSquare = horizontalRightSquare.filter((square) => {
    return square !== null;
  });
  NaNullHorizontaRightSquare.reverse();

  for (let i = 0; i < NaNullHorizontaRightSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaRightSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveRook(piece, square);
    });
  });
}
//-------------------------BLACK KINGHT-----------------------
function blackKnightClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical column up left & right
  const upLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) + 2
    }`
  );
  const upRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) + 2
    }`
  );

  if (upLeftSquare) {
    if (upLeftSquare && !upLeftSquare.piece) {
      blackDotHighLight(upLeftSquare);
      moveSquare.push(upLeftSquare);
    }

    // enemey highlight
    if (upLeftSquare.piece && upLeftSquare.piece.color == "WHITE") {
      enemyHighLight(upLeftSquare.id);
      moveSquare.push(upLeftSquare);
    }
  }

  if (upRightSquare) {
    if (upRightSquare.piece && upRightSquare.piece.color == "WHITE") {
      enemyHighLight(upRightSquare.id);
      moveSquare.push(upRightSquare);
    }

    // enemey highlight
    if (upRightSquare && !upRightSquare.piece) {
      blackDotHighLight(upRightSquare);
      moveSquare.push(upRightSquare);
    }
  }

  // array of vertical column down left & right
  const downLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) - 2
    }`
  );
  const downRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) - 2
    }`
  );

  if (downLeftSquare) {
    if (downLeftSquare && !downLeftSquare.piece) {
      blackDotHighLight(downLeftSquare);
      moveSquare.push(downLeftSquare);
    }

    // enemey highlight
    if (downLeftSquare.piece && downLeftSquare.piece.color == "WHITE") {
      enemyHighLight(downLeftSquare.id);
      moveSquare.push(downLeftSquare);
    }
  }

  if (downRightSquare) {
    if (downRightSquare.piece && downRightSquare.piece.color == "WHITE") {
      enemyHighLight(downRightSquare.id);
      moveSquare.push(downRightSquare);
    }

    // enemey highlight
    if (downRightSquare && !downRightSquare.piece) {
      blackDotHighLight(downRightSquare);
      moveSquare.push(downRightSquare);
    }
  }

  // array of Horizontal row left -> left & right
  const rowLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 2)}${
      Number(piece.id[1]) + 1
    }`
  );
  const rowRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 2)}${
      Number(piece.id[1]) + 1
    }`
  );

  if (rowLeftSquare) {
    if (rowLeftSquare && !rowLeftSquare.piece) {
      blackDotHighLight(rowLeftSquare);
      moveSquare.push(rowLeftSquare);
    }

    // enemey highlight
    if (rowLeftSquare.piece && rowLeftSquare.piece.color == "WHITE") {
      enemyHighLight(rowLeftSquare.id);
      moveSquare.push(rowLeftSquare);
    }
  }

  if (rowRightSquare) {
    if (rowRightSquare.piece && rowRightSquare.piece.color == "WHITE") {
      enemyHighLight(rowRightSquare.id);
      moveSquare.push(rowRightSquare);
    }

    // enemey highlight
    if (rowRightSquare && !rowRightSquare.piece) {
      blackDotHighLight(rowRightSquare);
      moveSquare.push(rowRightSquare);
    }
  }

  // array of Horizontal row right -> left & right
  const rowRightLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 2)}${
      Number(piece.id[1]) - 1
    }`
  );
  const rowRightRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 2)}${
      Number(piece.id[1]) - 1
    }`
  );

  if (rowRightLeftSquare) {
    if (rowRightLeftSquare && !rowRightLeftSquare.piece) {
      blackDotHighLight(rowRightLeftSquare);
      moveSquare.push(rowRightLeftSquare);
    }

    // enemey highlight
    if (rowRightLeftSquare.piece && rowRightLeftSquare.piece.color == "WHITE") {
      enemyHighLight(rowRightLeftSquare.id);
      moveSquare.push(rowRightLeftSquare);
    }
  }

  if (rowRightRightSquare) {
    if (
      rowRightRightSquare.piece &&
      rowRightRightSquare.piece.color == "WHITE"
    ) {
      enemyHighLight(rowRightRightSquare.id);
      moveSquare.push(rowRightRightSquare);
    }

    // enemey highlight
    if (rowRightRightSquare && !rowRightRightSquare.piece) {
      blackDotHighLight(rowRightRightSquare);
      moveSquare.push(rowRightRightSquare);
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveKnight(piece, square);
    });
  });
}
//--------------------------BLACK BISHOP------------------------
function blackBishopClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];
  //array of right up dignal square
  let rightUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < rightUpDignal.length; i++) {
    let rowDignalPiece = rightUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of right down dignal square
  let rightDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < rightDownDignal.length; i++) {
    let rowDignalPiece = rightDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left up dignal square
  let leftUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < leftUpDignal.length; i++) {
    let rowDignalPiece = leftUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left down dignal square
  let leftDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < leftDownDignal.length; i++) {
    let rowDignalPiece = leftDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveBishop(piece, square);
    });
  });
}
//-----------------------------BLACK QUEEN----------------------
function blackQueenClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  // array of vertical row up
  const verticalUpSquares = [];

  for (let x = Number(piece.id[1]) + 1; x <= 8; x++) {
    if (x === Number(piece.id[1])) {
      continue;
    }
    verticalUpSquares.push(getSquareElement(`${piece.id[0]}${x}`));
  }

  for (let i = 0; i < verticalUpSquares.length; i++) {
    let colSquarePiece = verticalUpSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  // array of vertical row down
  const verticalDownSquares = [];
  for (let d = Number(piece.id[1]) - 1; d > 0; d--) {
    if (d === Number(piece.id[1])) {
      continue;
    }
    verticalDownSquares.push(getSquareElement(`${piece.id[0]}${d}`));
  }

  for (let i = 0; i < verticalDownSquares.length; i++) {
    let colSquarePiece = verticalDownSquares[i];

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(colSquarePiece);
    moveSquare.push(colSquarePiece);

    if (colSquarePiece.piece != null && colSquarePiece.piece.color == "WHITE") {
      enemyHighLight(colSquarePiece.id);
      break;
    }
  }

  //array of left horizontal row
  const horizontalLeftSquare = [];

  for (let x = 1; x < 8; x++) {
    horizontalLeftSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaLeftSquare = horizontalLeftSquare.filter((square) => {
    return square !== null;
  });

  for (let i = 0; i < NaNullHorizontaLeftSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaLeftSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }

  //array of right horizontal row
  const horizontalRightSquare = [];

  for (let x = 8; x > 0; x--) {
    horizontalRightSquare.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${Number(
          piece.id[1]
        )}`
      )
    );
    if (x === Number(piece.id[1])) {
      continue;
    }
  }

  let NaNullHorizontaRightSquare = horizontalRightSquare.filter((square) => {
    return square !== null;
  });
  NaNullHorizontaRightSquare.reverse();

  for (let i = 0; i < NaNullHorizontaRightSquare.length; i++) {
    let horSquarePiece = NaNullHorizontaRightSquare[i];

    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "BLACK") {
      break;
    }

    blackDotHighLight(horSquarePiece);
    moveSquare.push(horSquarePiece);
    if (horSquarePiece.piece != null && horSquarePiece.piece.color == "WHITE") {
      enemyHighLight(horSquarePiece.id);
      break;
    }
  }
  //array of right up dignal square
  let rightUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < rightUpDignal.length; i++) {
    let rowDignalPiece = rightUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of right down dignal square
  let rightDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    rightDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < rightDownDignal.length; i++) {
    let rowDignalPiece = rightDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left up dignal square
  let leftUpDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftUpDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) - x)}${
          Number(piece.id[1]) + x
        }`
      )
    );
  }

  for (let i = 0; i < leftUpDignal.length; i++) {
    let rowDignalPiece = leftUpDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  //array of left down dignal square
  let leftDownDignal = [];
  for (let x = 1; x <= 8; x++) {
    leftDownDignal.push(
      getSquareElement(
        `${String.fromCharCode(piece.id[0].charCodeAt(0) + x)}${
          Number(piece.id[1]) - x
        }`
      )
    );
  }

  for (let i = 0; i < leftDownDignal.length; i++) {
    let rowDignalPiece = leftDownDignal[i];

    if (rowDignalPiece) {
      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "BLACK"
      ) {
        break;
      }

      blackDotHighLight(rowDignalPiece);
      moveSquare.push(rowDignalPiece);

      if (
        rowDignalPiece.piece != null &&
        rowDignalPiece.piece.color == "WHITE"
      ) {
        enemyHighLight(rowDignalPiece.id);
        break;
      }
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveQueen(piece, square);
    });
  });
}
//----------------------------BLACK KING-----------------------
function blackKingClicked(piece) {
  //self highlight piece
  selfHighLight(piece);

  //move square
  let moveSquare = [];

  //one front square
  const oneFrontSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) + 1}`
  );
  // console.log(oneFrontSquare)
  if (oneFrontSquare) {
    if (oneFrontSquare && !oneFrontSquare.piece) {
      blackDotHighLight(oneFrontSquare);
      moveSquare.push(oneFrontSquare);
    }
    //enemey highlight
    if (oneFrontSquare.piece && oneFrontSquare.piece.color == "WHITE") {
      enemyHighLight(oneFrontSquare.id);
      moveSquare.push(oneFrontSquare);
    }
  }

  //one back square

  const oneBackSquare = getSquareElement(
    `${piece.id[0]}${Number(piece.id[1]) - 1}`
  );
  // console.log(oneBackSquare)

  if (oneBackSquare) {
    if (oneBackSquare && !oneBackSquare.piece) {
      blackDotHighLight(oneBackSquare);
      moveSquare.push(oneBackSquare);
    }
    //enemey highlight
    if (oneBackSquare.piece && oneBackSquare.piece.color == "WHITE") {
      enemyHighLight(oneBackSquare.id);
      moveSquare.push(oneBackSquare);
    }
  }

  //one left square

  const oneLeftSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${Number(
      piece.id[1]
    )}`
  );
  // console.log(oneLeftSquare)

  if (oneLeftSquare) {
    if (oneLeftSquare && !oneLeftSquare.piece) {
      blackDotHighLight(oneLeftSquare);
      moveSquare.push(oneLeftSquare);
    }
    //enemey highlight
    if (oneLeftSquare.piece && oneLeftSquare.piece.color == "WHITE") {
      enemyHighLight(oneLeftSquare.id);
      moveSquare.push(oneLeftSquare);
    }
  }

  //one right square
  const oneRightSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${Number(
      piece.id[1]
    )}`
  );
  // console.log(oneRightSquare)

  if (oneRightSquare) {
    if (oneRightSquare && !oneRightSquare.piece) {
      blackDotHighLight(oneRightSquare);
      moveSquare.push(oneRightSquare);
    }
    //enemey highlight
    if (oneRightSquare.piece && oneRightSquare.piece.color == "WHITE") {
      enemyHighLight(oneRightSquare.id);
      moveSquare.push(oneRightSquare);
    }
  }

  //one left up dignal square
  const oneLeftUpDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) + 1
    }`
  );
  // console.log(oneLeftUpDignalSquare);
  if (oneLeftUpDignalSquare) {
    if (oneLeftUpDignalSquare && !oneLeftUpDignalSquare.piece) {
      blackDotHighLight(oneLeftUpDignalSquare);
      moveSquare.push(oneLeftUpDignalSquare);
    }
    //enemey highlight
    if (
      oneLeftUpDignalSquare.piece &&
      oneLeftUpDignalSquare.piece.color == "WHITE"
    ) {
      enemyHighLight(oneLeftUpDignalSquare.id);
      moveSquare.push(oneLeftUpDignalSquare);
    }
  }

  //one left down dignal square
  const oneLeftDownDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) - 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  // console.log(oneLeftDownDignalSquare);
  if (oneLeftDownDignalSquare) {
    if (oneLeftDownDignalSquare && !oneLeftDownDignalSquare.piece) {
      blackDotHighLight(oneLeftDownDignalSquare);
      moveSquare.push(oneLeftDownDignalSquare);
    }
    //enemey highlight
    if (
      oneLeftDownDignalSquare.piece &&
      oneLeftDownDignalSquare.piece.color == "WHITE"
    ) {
      enemyHighLight(oneLeftDownDignalSquare.id);
      moveSquare.push(oneLeftDownDignalSquare);
    }
  }

  //one right up dignal square
  const oneRightUpDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) + 1
    }`
  );
  // console.log(oneRightUpDignalSquare);
  if (oneRightUpDignalSquare) {
    if (oneRightUpDignalSquare && !oneRightUpDignalSquare.piece) {
      blackDotHighLight(oneRightUpDignalSquare);
      moveSquare.push(oneRightUpDignalSquare);
    }
    //enemey highlight
    if (
      oneRightUpDignalSquare.piece &&
      oneRightUpDignalSquare.piece.color == "WHITE"
    ) {
      enemyHighLight(oneRightUpDignalSquare.id);
      moveSquare.push(oneRightUpDignalSquare);
    }
  }

  //one right down dignal square
  const oneRightDownDignalSquare = getSquareElement(
    `${String.fromCharCode(piece.id[0].charCodeAt(0) + 1)}${
      Number(piece.id[1]) - 1
    }`
  );
  // console.log(oneRightDownDignalSquare);
  if (oneRightDownDignalSquare) {
    if (oneRightDownDignalSquare && !oneRightDownDignalSquare.piece) {
      blackDotHighLight(oneRightDownDignalSquare);
      moveSquare.push(oneRightDownDignalSquare);
    }
    //enemey highlight
    if (
      oneRightDownDignalSquare.piece &&
      oneRightDownDignalSquare.piece.color == "WHITE"
    ) {
      enemyHighLight(oneRightDownDignalSquare.id);
      moveSquare.push(oneRightDownDignalSquare);
    }
  }

  moveSquare.forEach((square) => {
    document.getElementById(square.id).addEventListener("click", () => {
      move.moveKing(piece, square);
    });
  });
}

//--------------------------------------------------------------------DESELECT SQUARE---------------------------------------------------------
// Function to deselect all squares and remove event listeners
export function deselectAllSquares() {
  // Get all square elements
  const allSquares = document.querySelectorAll(".square");

  // Iterate through each square and remove highlighting and event listeners
  removeBlackDot();
  removeEnemyHighLight();
  removeSelfHighLight();
  allSquares.forEach((square) => {
    // Remove click event listeners
    const clonedSquare = square.cloneNode(true);
    square.parentNode.replaceChild(clonedSquare, square);
  });
}

//-------------------------------------------------------PLAYER TURN BY TURN MOVE---------------------------------------------------------
