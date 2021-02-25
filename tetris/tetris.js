const canvas = document.getElementById("canvas");
canvas.height = 800;
canvas.width = 600;
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
        this.positions = new Array(positions.length);
        for (let i = 0; i < this.positions.length; ++i) {
            this.positions[i] = positions[i];
        }
        console.log(this.positions);
    }
    CanMove = true;

    MoveRight = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][0][0] += 1;
            }
        }
    }
    
    MoveLeft = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][0][0] -= 1;
            }
        }
    }

    MoveDown = () => {
        if (this.CanMove) {
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][0][1] += 1;
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
            let YPosition = [];
            for (let i = 0; i < element.positions.length; ++i) {
                for (let j = 0; j < element.positions[i].length; ++j) {
                    YPosition.push(element.positions[i][j][1]);
                }
            }
            let max = YPosition.reduce(function(a, b) {
                return Math.max(a, b);
            });
            for (let i = 0; i < element.positions.length; ++i) {
                for (let j = 0; j < element.positions[i].length; ++j) {
                    if (element.positions[i][j].includes(max)) {
                        positions.push(new Array([i, j, 1]));
                    }
                }
            }
        });
        console.log(positions);
    }
};

let test = new Blocks;
test.AddBlock(new Array([[0, 0], [0, 0]]));
test.Check();