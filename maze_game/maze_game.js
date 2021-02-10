const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

let x = 1;

function Level() {
    let board = CreateMap();
    console.log(board);
}

function CreateMap() {
    let result = Math.pow(x, 2) + 4 * x + 4;
    let squareroot = Math.sqrt(result);
    let board = new Array();
    for (let i = 0; i < squareroot; ++i) {
        board.push(new Array());
    }
    for (let i = 0; i < squareroot; ++i) {
        for (let y = 0; y < squareroot; ++y) {
            board[i].push(0);
        }
    }

    board[0][0] = 1;
    board[squareroot - 1][squareroot - 1] = 3;
    let x = 0, y = 0, trys = 0;
    while (board[squareroot - 1][squareroot - 1] === 3) {
        if (trys == squareroot * 2) {
            for (let y = 0; y < squareroot; ++y) {
                for (let x = 0; x < squareroot; ++x) {
                    board[y][x] = 0;
                }
            }
            x = 0;
            y = 0;
            trys = 0;
            board[0][0] = 2;
            board[squareroot - 1][squareroot - 1] = 3;
        }
        ++trys;
        let move = Math.floor(Math.random() * 4);
        if (move == 0) {
            if (y > 0) {
                if (board[x][y - 1] != 2) {
                    console.log("Up");
                    --y;
                    board[y][x] = 2;
                    --trys;
                }
            }
        }
    } else if (move == )
    return board;
}