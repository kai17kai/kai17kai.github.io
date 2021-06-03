const canvas = document.getElementById("canvas");
canvas.height = 705;
canvas.width = 705;
const spotSize = 14;
const context = canvas.getContext("2d");

//board
let board = Array(50).fill().map(() => Array(50).fill(0));

//past board state
let pastBoard = board;

//if simulation is going or not
let simulation = false;

//buttons for controlling
let controls = document.getElementById("controls");
for (const control of controls.children) {
    control.onclick = (e) => {
        if (control.id === "start") {
            simulation = true
        } else if (control.id === "stop") {
            simulation = false;
        } else if (control.id === "rewind") {
            simulation = false;
            board = pastBoard;
            DrawBoard();
        } else if (control.id === "clear") {
            pastBoard = board = Array(50).fill().map(() => Array(50).fill(0));
            DrawBoard();
        }
    }
}

//colors of the spots
let colors = ["rgb(100, 100, 100)", "white"];

//see if user is dragging click
let drag = false;

canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor(x / 14);
    y = Math.floor(y / 14);
    board[y][x] === 0 ? board[y][x] = 1 : board[y][x] = 0;
    pastBoard = board;
    DrawBoard();
}

canvas.onmousedown = () => {
    simulation = false;
    drag = true;
}

canvas.onmouseup = () => {
    drag = false;
}

canvas.onmousemove = (e) => {
    if (drag) {
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.floor(x / 14);
        y = Math.floor(y / 14);
        board[y][x] = 1;
        pastBoard = board;
        DrawBoard();
    }
}

function DrawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 50; ++i) {
        for (let j = 0; j < 50; ++j) {
            context.fillStyle = colors[board[i][j]];
            context.fillRect(j * spotSize + 5, i * spotSize + 5, spotSize - 5, spotSize - 5);
        }
    }
}

function SeeAroundPos(position) {
    let xOffsets = [-1, 0, 1, 0, -1, 1, -1, 1];
    let yOffsets = [0, -1, 0, 1, -1, -1, 1, 1];
    let OpenPositions = [];
    for (let i = 0; i < 8; ++i) {
        let x = position % 50;
        let y = Math.floor(position / 50);
        x += xOffsets[i];
        y += yOffsets[i];
        if (x >= 0 && y >= 0 && x < 50 && y < 50) {
            OpenPositions.push([y, x]);
        }
    }
    return OpenPositions;
}

let GameSimulation = setInterval(() => {
    if (simulation) {
        let tempBoard = Array(50).fill().map(() => Array(50).fill(0));
        for (let i = 0; i < 50; ++i) {
            for (let j = 0; j < 50; ++j) {
                const OpenPositions = SeeAroundPos(i * 50 + j);
                let AliveAmount = 0;
                for (const position of OpenPositions) {
                    if (board[position[0]][position[1]] === 1) {AliveAmount += 1}
                }
                if (board[i][j] === 0) {
                    if (AliveAmount === 3) {
                        tempBoard[i][j] = 1;
                    }
                } else {
                    if (AliveAmount > 3 || AliveAmount < 2) {
                        tempBoard[i][j] = 0;
                    } else if (AliveAmount === 2 || AliveAmount === 3) {
                        tempBoard[i][j] = 1;
                    }
                }
            }
        }
        board = tempBoard;
        DrawBoard();
    }
}, 100)

DrawBoard();