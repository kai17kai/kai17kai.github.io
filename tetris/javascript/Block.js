"use strict";
class Block {
    constructor(positions, color) {
        console.log(positions);
        this.positions = positions;
        this.color = color;
        for (let i = 0; i < this.positions.length; ++i) {
            board[this.positions[i][0]][this.positions[i][1]] = 1;
        }
    }
    CanMove = true;

    MoveRight = () => {
        if (this.CanMove) {
            let XMax = 0;
            for (let i = 0; i < this.positions.length; ++i) {
                if (this.positions[i][1] > XMax) {
                    XMax = this.positions[i][1];
                }
            }
            console.log(XMax);
            if (XMax === 9) {
                var NotValid = true;
            } else {
                for (let i = 0; i < this.positions.length; ++i) {
                    if (board[XMax + 1][this.positions[i][1] + 1] === 1) {
                        var NotValid = true;
                    }
                }
            }
            if (!(NotValid)) {
                for (let i = 0; i < this.positions.length; ++i) {
                    board[this.positions[i][0]][this.positions[i][1]] = 0;
                }
                for (let i = 0; i < this.positions.length; ++i) {
                    this.positions[i][1] += 1;
                    board[this.positions[i][0]][this.positions[i][1]] = 1;
                }
            }
        }
    };

    MoveLeft = () => {
        let XLeast = 50;
        for (let i = 0; i < this.positions.length; ++i) {
            if (this.positions[i][1] < XLeast) {
                XLeast = this.positions[i][1];
            }
        }
        if (XLeast === 0) {
            var NotValid = true;
        } else {
            for (let i = 0; i < this.positions.length; ++i) {
                if (board[XLeast - 1][this.positions[i][1] - 1] === 1) {
                    var NotValid = true;
                }
            }
        }
        if (this.CanMove && !(NotValid)) {
            for (let i = 0; i < this.positions.length; ++i) {
                board[this.positions[i][0]][this.positions[i][1]] = 0;
            }
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][1] -= 1;
                board[this.positions[i][0]][this.positions[i][1]] = 1;
            }
        }
    };

    MoveDown = () => {
        let YMax = 0;
        for (let i = 0; i < this.positions.length; ++i) {
            if (this.positions[i][0] > YMax) {
                YMax = this.positions[i][0];
            }
        }
        console.log(YMax);
        if (YMax === 14) {
            var NotValid = true;
        } else {
            for (let i = 0; i < this.positions.length; ++i) {
                if (board[YMax + 1][this.positions[i][1]] === 1) {
                    var NotValid = true;
                }
            }
        }
        if (this.CanMove && !(NotValid)) {
            for (let i = 0; i < this.positions.length; ++i) {
                board[this.positions[i][0]][this.positions[i][1]] = 0;
            }
            for (let i = 0; i < this.positions.length; ++i) {
                this.positions[i][0] += 1;
                board[this.positions[i][0]][this.positions[i][1]] = 1;
            }
        }
    };
}
