import { saveGame } from "../Data/data.js";
import * as pieceData from "../Data/piece.js";
import { globalData, currentPlayer } from "../constant/constant.js";
import { pieceRender } from "./render.js";

export function movePawn(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE PAWN") {
          square.piece = null;
          newPosition.piece = pieceData.whitePawn(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK PAWN") {
          square.piece = null;
          newPosition.piece = pieceData.blackPawn(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}

export function moveRook(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE ROOK") {
          square.piece = null;
          newPosition.piece = pieceData.whiteRook(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK ROOK") {
          square.piece = null;
          newPosition.piece = pieceData.blackRook(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}

export function moveKnight(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE KNIGHT") {
          square.piece = null;
          newPosition.piece = pieceData.whiteKnight(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK KNIGHT") {
          square.piece = null;
          newPosition.piece = pieceData.blackKnight(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}

export function moveBishop(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE BISHOP") {
          square.piece = null;
          newPosition.piece = pieceData.whiteBishop(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK BISHOP") {
          square.piece = null;
          newPosition.piece = pieceData.blackBishop(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}

export function moveQueen(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE QUEEN") {
          square.piece = null;
          newPosition.piece = pieceData.whiteQueen(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK QUEEN") {
          square.piece = null;
          newPosition.piece = pieceData.blackQueen(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}

export function moveKing(piece, newPosition) {
  globalData.forEach((squares) => {
    squares.forEach((square) => {
      if (square.id === piece.id) {
        if (piece.piece && piece.piece.piece_Name === "WHITE KING") {
          square.piece = null;
          newPosition.piece = pieceData.whiteKing(newPosition.id);
          currentPlayer();
        } else if (square.piece && square.piece.piece_Name === "BLACK KING") {
          square.piece = null;
          newPosition.piece = pieceData.blackKing(newPosition.id);
          currentPlayer();
        }
      }
    });
  });
  pieceRender(globalData);
  saveGame(globalData);
}
