import * as data from "./Data/data.js";
import {  resetGameBtn ,checkCurPlayer, newGameBtn} from "./Event/event.js";
import * as render from "./Render/render.js";
import { currentPlayer, globalData, showSaveGamePiece } from "./constant/constant.js";

if(showSaveGamePiece == null){
    render.initGameRender(globalData);
    data.saveGame(globalData);
}else{
    globalData.length = 0
    globalData.push(...showSaveGamePiece);
    render.gameStart(showSaveGamePiece);
}
currentPlayer();
checkCurPlayer();
resetGameBtn(globalData);
newGameBtn(globalData);