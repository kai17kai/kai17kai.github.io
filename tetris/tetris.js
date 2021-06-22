let canvas = document.getElementById("canvas");
const widthRatio = 3.5555555555555554; 
const heightRatio = 1.0836879432624114;
let context = canvas.getContext("2d");
const colors = ["white", "rgb(3, 173, 252)"];

let board = new Array(16).fill().map(() => Array(10).fill(0));

class Piece {
    constructor(type) {
        this.collection = [];
        this.type = type;
        switch (type) {
            case "square":
                this.collection.push([0, 4], [0, 5], [1, 4], [1, 5]);
                break;
            case "rightL":
                this.collection.push([1, 3], [1, 4], [1, 5], [1, 6], [0, 6]);
                break;
            default:
                break;
        }
        this.CanMove = true;
        for (let i = 0; i < this.collection.length; ++i) {
            board[this.collection[i][0]][this.collection[i][1]] = 1;
        }
        DrawBoard();
    }

    MoveRight = () => {
        if (this.CanMove) {
            let move = true;
            this.collection.forEach(e => {
                let temp = e.slice()
                temp[1] += 1;
                if (temp[1] > 9) {
                    move = false;
                } else if (board[temp[0]][temp[1]] === 1 && !this.ArrayWithin(temp)) {
                    move = false;
                }
            });
            if (move) {
                this.collection.forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                this.collection.forEach(e => {
                    e[1] += 1;
                    board[e[0]][e[1]] = 1;
                })
            }
        }
    }

    MoveLeft = () => {
        if (this.CanMove) {
            let move = true;
            this.collection.forEach(e => {
                let temp = e.slice()
                temp[1] -= 1;
                if (temp[1] < 0) {
                    move = false;
                } else if (board[temp[0]][temp[1]] === 1 && !this.ArrayWithin(temp)) {
                    move = false;
                }
            });
            if (move) {
                this.collection.forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                this.collection.forEach(e => {
                    e[1] -= 1;
                    board[e[0]][e[1]] = 1;
                })
            }
        }
    }

    MoveDown = () => {
        if (this.CanMove) {
            let move = true;
            this.collection.forEach(e => {
                let temp = e.slice()
                temp[0] += 1;
                if (temp[0] > 15) {
                    move = false;
                    this.CanMove = false;
                } else if (board[temp[0]][temp[1]] === 1 && !this.ArrayWithin(temp)) {
                    move = false;
                    this.CanMove = false;
                }
                
            });
            if (move) {
                this.collection.forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                this.collection.forEach(e => {
                    e[0] += 1;
                    board[e[0]][e[1]] = 1;
                })
            }
        }
    }

    ArrayWithin = (array) => {
        function Equal(a, b) {
            for (let i = 0; i < 3; ++i) {
                  if (a[i] != b[i]) {
                  return false;
              }
            }
            return true;
        }
        for (let i = 0; i < this.collection.length; ++i) {
            if (Equal(this.collection[i], array)) {
                return true;
            }
        }
        return false;
    }

    Check = () => {
        this.collection.forEach(e => {
            let temp = e.slice()
            temp[0] += 1;
            if (temp[0] > 15) {
                this.CanMove = false;
                LineCheck();
                piece = new Piece("square");
            } else if (board[temp[0]][temp[1]] === 1 && !this.ArrayWithin(temp)) {
                this.CanMove = false;
                LineCheck();
                piece = new Piece("square");
            }
        });
    }
}

function DrawBoard() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 505, 805);
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            context.fillStyle = colors[board[i][j]];
            context.fillRect(j * playerWidth + 5, i * playerHeight + 5, playerWidth - 10, playerHeight - 10);
        }
    }
}

function LineCheck() {
    let amount = 0;
    for (let i = 0; i < board.length; ++i) {
        if (!board[i].includes(0)) {
            amount += 1;
            board.splice(i, 1);
        }
    }

    for (let i = 0; i < amount; ++i) {
        board.unshift(new Array(10).fill(0));
    }
}

var playerWidth, playerHeight;
window.onresize = () => {
    let width = window.innerWidth / widthRatio;
    let height = window.innerHeight / heightRatio;
    canvas.setAttribute('width', width.toString()); 
    canvas.setAttribute('height',height.toString());
    canvas.width = canvas.width; canvas.height = canvas.height;
    playerWidth = width / 10;
    playerHeight = height / 16;
    DrawBoard();
}

let width = window.innerWidth / widthRatio;
let height = window.innerHeight / heightRatio;
canvas.setAttribute('width', width.toString());
canvas.setAttribute('height',height.toString());
canvas.width = canvas.width; canvas.height = canvas.height;
playerWidth = width / 10;
playerHeight = height / 16;

var piece = new Piece("square");

window.onkeydown = (e) => {
    switch (e.key.toLowerCase()) {
        case "s":
            piece.MoveDown();
            break;
        case "d":
            piece.MoveRight();
            break;
        case "a":
            piece.MoveLeft();
            break;
    }
    piece.Check();
    DrawBoard();
}