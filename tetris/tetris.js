const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 400;
const context = canvas.getContext("2d");

let board = new Array(16);

for (let i = 0; i < board.length; ++i) {
    board[i] = new Array(12);
    for (let j = 0; j < board[i].length; ++j) {
        board[i][j] = 0;
    }
}

class Block {
    constructor(positions) {
        this.positions = positions;
    }
    CanMove = true;

    MoveRight = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                for (let j = 0; j < this.positions[i].length; ++j) {
                    this.positions[i][j][1] += 1;
                }
            }
        }
    }
    
    MoveLeft = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                for (let j = 0; j < this.positions[i].length; ++j) {
                    this.positions[i][j][1] -= 1;
                }
            }
        }
    }

    MoveDown = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                for (let j = 0; j < this.positions[i].length; ++j) {
                    this.positions[i][j][0] += 1;
                }
            }
        }
    }
};

class Blocks {
    blocks = [];

    AddBlock = (positions) => {
        this.blocks.push(new Block(positions));
    }

    Check = () => {
        let positions = [];
        this.blocks.forEach(element => {
            for (let i = 0; i < element.positions.length; ++i) {
                for (let j = 0; j < element.positions[i].length; ++j) {
                    if (board[element.positions[i][j][0]+1][element.positions[i][j][1]] === 1) {
                        element.CanMove = false;
                    }
                }
            }
            console.log(element.CanMove);
        });
    }
};

let test = new Blocks;
test.AddBlock(new Array([[0, 0], [0, 0]]));
test.AddBlock(new Array([[0, 0], [1, 0], [2, 0]]));
board[4][1] = 1;
test.blocks.forEach(element => element.MoveDown());
test.Check();
test.blocks.forEach(element => element.MoveRight());
test.Check();
test.blocks.forEach(element => element.MoveDown());
test.Check();
test.blocks.forEach(element => console.log(element));