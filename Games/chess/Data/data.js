// use to get square data
export function square(color,id,piece){
    return{color,id,piece}
}

// use to get initial game row id data
export function rowId(rowId){
    const row = []
    const abcd = Array.from({ length: 8 }, (_, index) => String.fromCharCode('a'.charCodeAt(0) + index));
    if(rowId % 2 == 0){
        abcd.forEach((abcdSquare,index) => {
            if(index % 2 == 0){
                row.push(square("white",abcdSquare+rowId,null))
            }else{
                row.push(square("black",abcdSquare+rowId,null))
            }
        })
    }else{
        abcd.forEach((abcdSquare,index) => {
            if(index % 2 == 0){
                row.push(square("black",abcdSquare+rowId,null))
            }else{
                row.push(square("white",abcdSquare+rowId,null))
            }
        })
        
    }
    return row;
}

export function initGame(){
    return Array.from({length:8} , (_,index) => rowId(8-index));
}

//save data in local storage
export function saveGame(data){
    localStorage.setItem("chessBoard",JSON.stringify(data));
}

//get save data in local stroge
export function showSaveGame(){
    const storedData = localStorage.getItem('chessBoard');
    return storedData ? JSON.parse(storedData) : null;
}