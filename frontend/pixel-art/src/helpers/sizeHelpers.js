const sizeHelpers = {
    addUniformRow: function addUniformRow (board, color, placement) {
        const ORIGINAL_NUMBER_ROWS = board.length;
        const ORIGINAL_ROW_SIZE = board[0].length;
        let updatedBoard = new Array(ORIGINAL_NUMBER_ROWS + 1);
        const NEWROW = new Array(ORIGINAL_ROW_SIZE).fill(color);
        switch (placement) {
            case ('top'):
                updatedBoard[0] = NEWROW;
                for (var i = 0; i < ORIGINAL_NUMBER_ROWS; i++) {
                    let updatedRow = [...board[i]];
                    updatedBoard[i+1] = updatedRow;
                }
                break;
            case ('bottom'):
                for (var j = 0; j < ORIGINAL_NUMBER_ROWS; j++) {
                    let updatedRow = [...board[j]];
                    updatedBoard[j] = updatedRow;
                }
                updatedBoard[ORIGINAL_NUMBER_ROWS] = NEWROW;
                break;
            default:
                console.log('invalid placement');
        }
        return updatedBoard;
    },
    addUniformColumn: function addUniformColumn (board, color, placement) {
        const ORIGINAL_BOARD_SIZE = board.length;
        let updatedBoard = new Array(ORIGINAL_BOARD_SIZE);
        switch (placement) {
            case ('left'):
                for (var i = 0; i < ORIGINAL_BOARD_SIZE; i++) {
                    let updatedRow = [...board[i]];
                    updatedRow.unshift(color);
                    updatedBoard[i] = updatedRow;
                }
                break;
            case ('right'):
                for (var j = 0; j < ORIGINAL_BOARD_SIZE; j++) {
                    let updatedRow = [...board[j]];
                    updatedRow.push(color);
                    updatedBoard[j] = updatedRow;
                }
                break;
            default:
                console.log('invalid placement');
        }
        return updatedBoard;
    },
    removeUniformRow: function removeUniformRow (board, placement) {
        const ORIGINAL_NUMBER_ROWS = board.length;
        let updatedBoard = new Array(ORIGINAL_NUMBER_ROWS - 1);
        switch (placement) {
            case ('top'):
                for (var i = 1; i < ORIGINAL_NUMBER_ROWS; i++) {
                    let updatedRow = [...board[i]];
                    updatedBoard[i-1] = updatedRow;
                }
                break;
            case ('bottom'):
                for (var j = 0; j < ORIGINAL_NUMBER_ROWS - 1; j++) {
                    let updatedRow = [...board[j]];
                    updatedBoard[j] = updatedRow;
                }
                break;
            default:
                console.log('invalid placement');
        }
        return updatedBoard;
    },
    removeUniformColumn: function removeUniformColumn (board, placement) {
        const ORIGINAL_BOARD_SIZE = board.length;
        let updatedBoard = new Array(ORIGINAL_BOARD_SIZE);
        switch (placement) {
            case ('left'):
                for (var i = 0; i < ORIGINAL_BOARD_SIZE; i++) {
                    let updatedRow = [...board[i]]
                    updatedRow.shift();
                    updatedBoard[i] = updatedRow;
                }
                break;
            case ('right'):
                for (var j = 0; j < ORIGINAL_BOARD_SIZE; j++) {
                    let updatedRow = [...board[j]];
                    updatedRow.pop();
                    updatedBoard[j] = updatedRow;
                }
                break;
            default:
                console.log('invalid placement');
        }
        return updatedBoard;
    }

}


export default sizeHelpers;