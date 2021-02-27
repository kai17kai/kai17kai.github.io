"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let board = new Array(15);

for (let i = 0; i < board.length; ++i) {
    board[i] = new Array(10);
    for (let j = 0; j < board[i].length; ++j) {
        board[i][j] = 0;
    }
}

class Block {
    constructor(positions, color) {
        this.positions = positions;
        this.color = color;
        for (let i = 0; i < this.positions.length; ++i) {
            board[this.positions[i][0]][this.positions[i][1]] = 1;
        }
    }
    CanMove = true;

    MoveRight = () => {
        let XMax = 0;
        for (let i = 0; i < this.positions.length; ++i) {
            if (this.positions[i][1] > XMax) {
                XMax = this.positions[i][1];
            }
        }
        let valid = false;
        if (this.CanMove && !(XMax === 9)) {
            valid = true;
        } else {
            for (let i = 0; i < this.positions.length; ++i) {
                if (!(board[this.positions[i][0]][XMax] === 1) && this.CanMove) {
                    valid = true;
                }
            }
        }
        if (valid) {
            for (let i = 0; i < this.positions.length; ++i) {
                board[this.positions[i][0]][this.positions[i][1]] = 0;
            }
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][1] += 1;
                board[this.positions[i][0]][this.positions[i][1]] = 1;
            }
        }
    }
    
    MoveLeft = () => {
        let Xleast = 15;
        for (let i = this.positions.length - 1; i > -1; --i) {
            if (this.positions[i][1] < Xleast) {
                Xleast = this.positions[i][1];
            }
        }
        let valid = false;
        if (this.CanMove && !(Xleast === 0)) {
            valid = true;
        } else {
            for (let i = 0; i < this.positions.length; ++i) {
                if (!(board[this.positions[i][1]]) && this.CanMove) {
                    valid = true;
                }
            }
        }
        if (valid) {
            for (let i = 0; i < this.positions.length; ++i) {
                board[this.positions[i][0]][this.positions[i][1]] = 0;
            }
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][1] -= 1;
                board[this.positions[i][0]][this.positions[i][1]] = 1;
            }
        }
    }

    MoveDown = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                board[this.positions[i][0]][this.positions[i][1]] = 0;
            }
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][0] += 1;
                board[this.positions[i][0]][this.positions[i][1]] = 1;
            }
        }
    }
};

class Blocks {
    blocks = [];

    AddBlock = (positions, color) => {
        this.blocks.push(new Block(positions, color));
    }

    Check = () => {
        this.blocks.forEach(element => {
            let YMax = 0
            for (let i = 0; i < element.positions.length; ++i) {
                if (element.positions[i][0] > YMax) {
                    YMax = element.positions[i][0];
                } 
            }
            if (YMax === 14) {
                element.CanMove = false;
            } else {
                for (let i = 0; i < element.positions.length; ++i) {
                    if (board[YMax + 1][element.positions[i][1]] === 1) {
                        element.CanMove = false;
                    }
                }
            }
        });
    }

    MoveRight = () => {
        this.blocks[this.blocks.length - 1].MoveRight();

    }

    MoveLeft = () => {
        this.blocks[this.blocks.length - 1].MoveLeft();
    }

    MoveDown = (who = 0) => {
        if (who === 1) {
            this.blocks.forEach(element => element.MoveDown());
        } else {
            this.blocks[this.blocks.length - 1].MoveDown();
        }
    }

    Draw = () => {
        this.blocks.forEach(element => {
            context.fillStyle = element.color;
            for (let i = 0; i < element.positions.length; ++i) {
                for (let j = 0; j < element.positions[i].length; ++j) {
                    context.fillRect(element.positions[i][1] * 40, element.positions[i][0] * 40, 40, 40);
                }
            }
        });
    }
};

let test = new Blocks, down = false, right = false, left = false;
test.AddBlock([[2, 0], [3, 0], [4, 0]], "red");
test.AddBlock([[0, 0],[0, 1], [0, 2]], "cyan");
window.onkeydown = (e) => {
    if (e.key === "d" || e.key === "ArrowRight") {
        right = true;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        down = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        left = true;
    }
}
let timer = 0;
let auto = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ++timer;
    test.MoveDown(1);
    test.Check();
    test.Draw()
}, 1000);
let user = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (right) {
        test.MoveRight()
    } else if (down) {
        test.MoveDown()
    } else if (left) {
        test.MoveLeft()
    }
    test.Check();
    down = false, right = false, left = false;
    test.Draw();
}, 50);