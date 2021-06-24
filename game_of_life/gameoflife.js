const canvas = document.getElementById("canvas");
let square_side = Math.min(Math.min(window.innerWidth, window.innerHeight) - 150, 800);
square_side -= square_side%8;
canvas.setAttribute('width', (square_side + 5).toString());
canvas.setAttribute('height',(square_side + 5).toString());
let spotSize = square_side / 50;
const context = canvas.getContext("2d");

//board
let board = Array(50).fill().map(() => Array(50).fill().map(() => Array(2).fill(0)));

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
            board = Array(50).fill().map(() => Array(50).fill().map(() => Array(2).fill(0)));
            simulation = false;
            DrawBoard();
        }
    }
}

//colors of the spots
let colors = ["rgb(120, 120, 120)", "white"];

//see if user is dragging click
let drag = false;

//see if user moved
let moved = false;

//get canvas bounds
let rect = canvas.getBoundingClientRect();

//if shift is clicked or not
let shift = false;

//if mouse is out of canvas bounds
let OffMap = false;

document.onkeydown = (e) => {
    shift = e.shiftKey
}

document.onkeyup = (e) => {
    shift = e.shiftKey
}

canvas.onpointerup = (e) => {
    drag = moved;
    if (!shift) {
        let x = (e.clientX - rect.left)
        let y = (e.clientY - rect.top)
        x = Math.floor(x / spotSize);
        y = Math.floor(y / spotSize);
        if (!drag) { 
            board[y][x][0] ^= 1;
        } else {
            board[y][x][0] = 1;
            drag = false;
        }
        pastBoard = board;
        DrawBoard();
    }
    moved = false;
}

canvas.onpointerdown = () => {
    simulation = false;
    drag = true;
}

canvas.onpointermove = (e) => {
    if (drag) {
        moved = true;
        let x = (e.clientX - rect.left);
        let y = (e.clientY - rect.top);
        x = Math.floor(x / spotSize);
        y = Math.floor(y / spotSize);
        if (!shift) {
            board[y][x][0] = 1;
        } else {
            board[y][x][0] = 0;
        }
        pastBoard = board;
        DrawBoard();
    }
}

function DrawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 50; ++i) {
        for (let j = 0; j < 50; ++j) {
            context.fillStyle = colors[board[i][j][0]];
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
        if (x < 0) {
            x = 49;
        } else if (x > 49) {
            x = 0;
        }

        if (y < 0) {
            y = 49;
        } else if (y > 49) {
            y = 0;
        }
        OpenPositions.push([y, x]);
    }
    return OpenPositions;
}

let GameSimulation = setInterval(() => {
    if (simulation) {
        let tempBoard = Array(50).fill().map(() => Array(50).fill().map(() => Array(2).fill(0)));
        for (let i = 0; i < 50; ++i) {
            for (let j = 0; j < 50; ++j) {
                const OpenPositions = SeeAroundPos(i * 50 + j);
                let AliveAmount = 0;
                for (const position of OpenPositions) {
                    if (board[position[0]][position[1]][0] === 1) {AliveAmount += 1}
                }
                if (board[i][j][0] === 0) {
                    if (AliveAmount === 3) {
                        tempBoard[i][j][0] = 1;
                    }
                } else {
                    if (AliveAmount > 3 || AliveAmount < 2) {
                        tempBoard[i][j][0] = 0;
                    } else if (AliveAmount === 2 || AliveAmount === 3) {
                        tempBoard[i][j][0] = 1;
                    }
                }
            }
        }
        board = tempBoard;
        DrawBoard();
    }
}, 100)

window.onresize = () => {
    let square_side = Math.min(Math.min(window.innerWidth, window.innerHeight) - 150, 800);
    square_side -= square_side%8;
    canvas.setAttribute('width', (square_side + 5).toString());
    canvas.setAttribute('height',(square_side + 5).toString());
    spotSize = square_side / 50;
    rect = canvas.getBoundingClientRect();
    DrawBoard();
}

DrawBoard();