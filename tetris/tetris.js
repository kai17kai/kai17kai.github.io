let canvas = document.getElementById("canvas");
const widthRatio = 3.5555555555555554; 
const heightRatio = 1.0836879432624114;
let context = canvas.getContext("2d");

let playerWidth, playerHeight;
let width = window.innerWidth / widthRatio;
let height = window.innerHeight / heightRatio;
canvas.setAttribute('width', width.toString());
canvas.setAttribute('height',height.toString());
canvas.width = canvas.width; canvas.height = canvas.height;
playerWidth = width / 10;
playerHeight = height / 16;

let board = new Array(16).fill().map(() => Array(10).fill(0));

const colors = ["white", "rgb(237, 239, 55)", "rgb(244, 151, 40)", "rgb(7, 0, 231)", "rgb(0, 238, 236)", "rgb(0, 239, 48)", "rgb(157, 0, 231)", "rgb(249, 4, 25)"];
const Types = ["O", "L", "J", "I", "S", "T", "Z"];

class Piece {
    constructor(type) {
        this.collection = [];
        this.typeNumber = 0;
        this.rotationNumber = 0;
        switch (type) {
            case "O":
                this.collection.push([[0, 4], [0, 5], [1, 4], [1, 5]]);
                this.typeNumber = 1;
                break;
            case "L":
                this.collection.push([[1, 3], [1, 4], [1, 5],  [0, 5]],
                    [[0, 4], [1, 4], [2, 4], [2, 5]],
                    [[1, 3], [1, 4], [1, 5],  [2, 3]],
                    [[0, 3], [0, 4], [1, 4], [2, 4]]);
                this.typeNumber = 2;
                break;
            case "J":
                this.collection.push([[0, 4], [1, 4], [1, 5], [1, 6]],
                    [[0, 4], [0, 5], [1, 4], [2, 4]],
                    [[1, 4], [1, 5], [1, 6], [2, 6]],);
                this.typeNumber = 3;
                break;
            case "I":
                this.collection.push([[0, 4], [0, 5], [0, 6], [0, 7]]);
                this.typeNumber = 4;
                break;
            case "S":
                this.collection.push([[1, 4], [1, 5], [0, 5], [0, 6]]);
                this.typeNumber = 5;
                break;
            case "T":
                this.collection.push([[1, 4], [1, 5], [0, 5], [1, 6]]);
                this.typeNumber = 6;
                break;
            case "Z":
                this.collection.push([[0, 4], [0, 5], [1, 5], [1, 6]],
                    [[0, 4], [0, 5], [1, 5], [1, 6]],);
                this.typeNumber = 7;
                break;
        }
        this.CanMove = true;
        for (let i = 0; i < this.collection[this.rotationNumber].length; ++i) {
            board[this.collection[this.rotationNumber][i][0]][this.collection[this.rotationNumber][i][1]] = this.typeNumber;
        }
        DrawBoard();
    }

    MoveRight = () => {
        if (this.CanMove) {
            let move = true;
            let BadRotations = [];
            for (let i = 0; i < this.collection.length; ++i)
            {
                this.collection[i].forEach(e => {
                    let temp = e.slice()
                    temp[1] += 1;
                    if (temp[1] > 9) {
                        BadRotations.push(i);
                    } else if (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp)) {
                        BadRotations.push(i);
                    }
                });
            }
            if (BadRotations.includes(this.rotationNumber))
            {
                move = false;
            }
            if (move) {
                this.collection[this.rotationNumber].forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                for (let i = 0; i < this.collection.length; ++i)
                {
                    this.collection[i].forEach(e => {
                        e[1] += 1;
                    })
                }
                this.collection[this.rotationNumber].forEach(e => {
                    
                    board[e[0]][e[1]] = this.typeNumber;
                })
            }
        }
    }

    MoveLeft = () => {
        if (this.CanMove) {
            let move = true;
            let BadRotations = [];
            for (let i = 0; i < this.collection.length; ++i)
            {
                this.collection[this.rotationNumber].forEach(e => {
                    let temp = e.slice()
                    temp[1] -= 1;
                    if (temp[1] < 0) {
                        BadRotations.push(i);
                    } else if (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp)) {
                        BadRotations.push(i);
                    }
                });
            }

            if (BadRotations.includes(this.rotationNumber))
            {
                move = false;
            }
            if (move) {
                this.collection[this.rotationNumber].forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                for (let i = 0; i < this.collection.length; ++i)
                {
                    this.collection[i].forEach(e => {
                        e[1] -= 1;
                    })
                }
                this.collection[this.rotationNumber].forEach(e => {
                    board[e[0]][e[1]] = this.typeNumber;
                })
            }
        }
    }

    MoveDown = () => {
        if (this.CanMove) {
            let move = true;
            let BadRotations = [];
            for (let i = 0; i < this.collection.length; ++i)
            {
                this.collection[i].forEach(e => {
                    let temp = e.slice()
                    temp[0] += 1;
                    if (temp[0] > 15) {
                        BadRotations.push(i);
                    } else if (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp)) {
                        BadRotations.push(i);
                    }
                });
            }
            if (BadRotations.includes(this.rotationNumber))
            {
                move = false;
                this.CanMove = false;
            }
            if (move) {
                this.collection[this.rotationNumber].forEach((e) => {
                    board[e[0]][e[1]] = 0;
                });
                for (let i = 0; i < this.collection.length; ++i)
                {
                    this.collection[i].forEach(e => {
                        e[0] += 1;
                    })
                }
                this.collection[this.rotationNumber].forEach(e => {
                    board[e[0]][e[1]] = this.typeNumber;
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
        for (let i = 0; i < this.collection[this.rotationNumber].length; ++i) {
            if (Equal(this.collection[this.rotationNumber][i], array)) {
                return true;
            }
        }
        return false;
    }

    Check = () => {
        this.collection[this.rotationNumber].forEach(e => {
            let temp = e.slice()
            temp[0] += 1;
            if (temp[0] > 15 || (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp))) {
                this.CanMove = false;
            }
        });
        if (!this.CanMove)
        {
            this.LineCheck();
            piece = new Piece(Types[Math.floor(Math.random() * Types.length)]);
        }
    }

    LineCheck() {
        let amount = 0;
        for (let i = 0; i < board.length; ++i) {
            if (!board[i].includes(0)) {
                amount += 1;
                board.splice(i, 1);
                --i;
            }
        }

        for (let i = 0; i < amount; ++i) {
            board.unshift(new Array(10).fill(0));
        }
    }

    RotateRight()
    {
        let CanRotate = false;
        let NewRotation = null;
        let BadRotations = [];
        for (let i = 0; i < this.collection.length; ++i)
        {
            this.collection[i].forEach(e => {
                let temp = e.slice()
                if (temp[0] > 15 || temp[1] < 0 || temp[1] > 9) {
                    BadRotations.push(i);
                } else if (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp)) {
                    BadRotations.push(i);
                }
            });
        }
        for (let i = this.rotationNumber + 1; i < this.collection.length; ++i)
        {
            if (!BadRotations.includes(i))
            {
                CanRotate = true;
                NewRotation = i;
                break;
            }
        }

        if (!CanRotate)
        {
            for (let i = 0; i < this.rotationNumber; ++i)
            {
                if (!BadRotations.includes(i))
                {
                    CanRotate = true;
                    NewRotation = i;
                    break;
                }
            }
        }

        if (CanRotate)
        {
            this.collection[this.rotationNumber].forEach((e) => {
                board[e[0]][e[1]] = 0;
            });
            this.rotationNumber = NewRotation;
            this.collection[this.rotationNumber].forEach((e) => {
                board[e[0]][e[1]] = this.typeNumber;
            });
            DrawBoard();
        }
    }

    RotateLeft()
    {
        let CanRotate = false;
        let NewRotation = null;
        let BadRotations = [];
        for (let i = 0; i < this.collection.length; ++i)
        {
            this.collection[i].forEach(e => {
                let temp = e.slice()
                if (temp[0] > 15 || temp[1] < 0 || temp[1] > 9) {
                    BadRotations.push(i);
                } else if (board[temp[0]][temp[1]] > 0 && board[temp[0]][temp[1]] < 8 && !this.ArrayWithin(temp)) {
                    BadRotations.push(i);
                }
            });
        }
        for (let i = this.rotationNumber - 1; i > -1; --i)
        {
            if (!BadRotations.includes(i))
            {
                CanRotate = true;
                NewRotation = i;
                break;
            }
        }

        if (!CanRotate)
        {
            for (let i = this.collection.length - 1; i > this.rotationNumber; --i)
            {
                if (!BadRotations.includes(i))
                {
                    CanRotate = true;
                    NewRotation = i;
                    break;
                }
            }
        }
        if (CanRotate)
        {
            this.collection[this.rotationNumber].forEach((e) => {
                board[e[0]][e[1]] = 0;
            });
            this.rotationNumber = NewRotation;
            this.collection[this.rotationNumber].forEach((e) => {
                board[e[0]][e[1]] = this.typeNumber;
            });
            DrawBoard();
        }
    }
}

function DrawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            context.fillStyle = colors[board[i][j]];
            context.fillRect(j * playerWidth + 5, i * playerHeight + 5, playerWidth - 10, playerHeight - 10);
        }
    }
}

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

var piece = new Piece(Types[Math.floor(Math.random() * Types.length)]);

window.onkeydown = (e) => {
    switch (e.key.toLowerCase()) {
        case "s": case "arrowdown":
            piece.MoveDown();
            break;
        case "d": case "arrowright":
            piece.MoveRight();
            break;
        case "a": case "arrowleft":
            piece.MoveLeft();
            break;
        case "e":
            piece.RotateRight();
            break;
        case "q":
            piece.RotateLeft();
            break;
    }
    piece.Check();
    DrawBoard();
}