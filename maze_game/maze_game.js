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
    return board;
}

Level();