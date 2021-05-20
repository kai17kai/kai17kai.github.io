const canvas = document.getElementById("canvas");
let range = document.getElementById("range");
let square_side = Math.min(Math.min(window.innerWidth, window.innerHeight) - 150, 800);
square_side -= square_side%8;
canvas.setAttribute('width', square_side.toString());
canvas.setAttribute('height',square_side.toString());
const context = canvas.getContext("2d");

//level of the game based on side length
let gameLevel = 20;

//game board
let board = [];

//range of colors
let colors = ["lime", "lightgray", "red", "rgb(78, 49, 30)"];

range.value = square_side.toString();
range.onchange = (e) => {
    let side = e.target.value;
    canvas.setAttribute('width', side.toString());
    canvas.setAttribute('height',side.toString());
    !died ? DisplayMap() : Player.Died();
}

function SeeAroundPos(position) {
    let xOffsets = [-1, 0, 1, 0];
    let yOffsets = [0, -1, 0, 1];
    let OpenPositions = [];
    for (let i = 0; i < 4; ++i) {
        let x = position % gameLevel;
        let y = Math.floor(position / gameLevel);
        x += xOffsets[i];
        y += yOffsets[i];
        if (x >= 0 && y >= 0 && x < gameLevel && y < gameLevel && (board[y * gameLevel + x] === 0 || board[y * gameLevel + x] === 3)) {
            OpenPositions.push(y * gameLevel + x);
        }
    }
    return OpenPositions;
}

function CreateMap() {
    board = new Array(gameLevel * gameLevel).fill(0);
    board[0] = 4;
    board[board.length - 1] = 3;
    let MissedMoves = [];
    let PosIsOpen = true;
    while (PosIsOpen) {
        let PastPosition = board.indexOf(4);
        let OpenPositions = SeeAroundPos(PastPosition);
        if (OpenPositions.length > 0) {
            let RandomIndex = Math.floor(Math.random() * OpenPositions.length);
            let RandomPosition = OpenPositions[RandomIndex];
            OpenPositions.splice(RandomIndex, 1);
            board[PastPosition] = 2;
            board[RandomPosition] = 4;
            if (MissedMoves.includes(RandomPosition)) {
                MissedMoves.splice(MissedMoves.indexOf(RandomPosition), 1);
            }
            OpenPositions.forEach(element => {
                if (!MissedMoves.includes(element)) {
                    MissedMoves.push(element);
                }
            });
        } else {
            if (MissedMoves.length === 0) {
                PosIsOpen = false;
            } else {
                let RandomIndex = Math.floor(Math.random() * MissedMoves.length);
                let RandomPosition = MissedMoves[RandomIndex];
                MissedMoves.splice(RandomIndex, 1);
                board[PastPosition] = 0;
                board[RandomPosition] = 4;
            }
        }
    }

    board[board.indexOf(4)] = 2;

    for (let x = 0; x < board.length; ++x) {
        if (board[x] === 2) {
            board[x] = 0;
        } else if (board[x] === 0) {
            board[x] = 2;
        }
    }

    board[0] = 1;
    board[board.length - 1] = 3;
    DisplayMap();
}

function DisplayMap() {
    let xLength = canvas.width / gameLevel;
    let yLength = canvas.height / gameLevel;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gameLevel; ++i) {
        for (let j = 0; j < gameLevel; ++j) {
            let pos = i * gameLevel + j;
            let color = colors[board[pos]];
            context.fillStyle = color;
            context.fillRect(xLength * j, yLength * i, xLength, yLength);
        }
    }
}

CreateMap();

let Player = {
    x: 0,
    y: 0,
    MoveUp(pos) {
        var iter = board.indexOf(1);
        board[iter] = 0;
        
        if (pos > 0) {
            pos -= 1;
            iter += gameLevel * -1;
        }
    
        board[iter] = 1
        return pos;
    },
    
    MoveRight(pos) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    
        if (pos < gameLevel - 1) {
            pos += 1;
            iter += 1;
        }
    
        board[iter] = 1
        return pos;
    },
    
    MoveDown(pos) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    
        if (pos < gameLevel - 1) {
            pos += 1;
            iter += gameLevel;
        }
    
        board[iter] = 1
        return pos;
    },
    
    MoveLeft(pos) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    
        if (pos > 0)
        {
            pos -= 1;
            iter -= 1;
        }
    
        board[iter] = 1
        return pos;
    },

    Died() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = canvas.width / 20 +  "px Arial";
        context.fillText("You died. Press r to restart", canvas.width / 4, canvas.height / 2);
    }
}

//Counts the certain amounts of values in board
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//Died or not
let died = false;

window.onkeydown = (e) => {
    if (!died) {
        let obstacles = countOccurrences(board, 2);
        switch (e.key.toLocaleLowerCase(), e.key) {
            case "w": case "ArrowUp":
                Player.y = Player.MoveUp(Player.y);
                break;
            case "s": case "ArrowDown":
                Player.y = Player.MoveDown(Player.y);
                break;
            case "d": case "ArrowRight":
                Player.x = Player.MoveRight(Player.x);
                break;
            case "a": case "ArrowLeft":
                Player.x = Player.MoveLeft(Player.x);
                break;
            case "r":
                location.reload();
                break;
            default:
                break;
        }
        DisplayMap();

        if (countOccurrences(board, 2) != obstacles) {
            died = true;
            Player.Died();
        }

        if (board[board.length - 1] != 3) {
            gameLevel += 1;
            Player.x = 0;
            Player.y = 0;
            CreateMap();
            obstacles = countOccurrences(board, 2);
        }
    } else {
        Player.Died();
        if (e.key.toLocaleLowerCase() === "r") {
            location.reload();
        }
    }
}