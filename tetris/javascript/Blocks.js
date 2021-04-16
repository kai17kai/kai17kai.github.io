"use strict";
class Blocks {
    blocks = [];

    AddBlock = (type) => {
        console.log(type);
        if (type === 0) { //straight block
            this.blocks.push(new Block([[0, 2],[0, 3],[0, 4],[0, 5],[0,6],[0, 7]], "cyan"));
        } else if (type === 1) { //cube
            this.blocks.push(new Block([[0,4],[0,5],[1,4],[1,5]], "yellow"));
        } else if (type === 2) { //weird ass block
            this.blocks.push(new Block([[0, 3],[0, 4],[0, 5],[1, 4]], "purple"));
        } else if (type === 3) { //shit number 1
            this.blocks.push(new Block([[1, 3],[1, 4],[1,5],[1,6],[2,6]], "orange"));
        } else if (type === 4) { //shit number 2
            this.blocks.push(new Block([[1, 3],[1, 4],[1,5],[1,6],[0,6]], "green"));
        }
    };

    Check = () => {
        for (let i = 0; i < this.blocks.length; ++i) {
            if (this.blocks[i].CanMove) {
                console.log(this.blocks[i].positions.length);
                for (let iBlock = 0; iBlock < this.blocks[i].positions.length; ++iBlock) {
                    if (this.blocks[i].positions[iBlock][0] === 14) {
                        this.blocks[i].CanMove = false;
                        let choice = Math.floor(Math.random() * 5)
                        test.AddBlock(choice);
                    }
                }
            }
        }
        /*
        this.blocks.forEach(element => {
            if (element.CanMove) {
                let YMax = 0;
                let XMax = 0;
                for (let i = 0; i < element.positions.length; ++i) {
                    if (element.positions[i][0] > YMax) {
                        YMax = element.positions[i][0];
                        XMax = element.positions[i][1];
                    }
                }
                let amount = 0;
                if (YMax === 14) {
                    ++amount;
                    element.CanMove = false;
                    if (amount <= 1) {
                        let choice = Math.floor(Math.random() * 5);
                        this.AddBlock(choice);
                    }
                } else {
                    for (let i = 0; i < element.positions.length; ++i) {
                        if (board[YMax + 1][element.positions[i][1]] === 1 && amount === 0) {
                            amount = 1;
                            element.CanMove = false;
                            let choice = Math.floor(Math.random() * 5)
                            test.AddBlock(choice);
                        }
                    }
                }
            }
        });
        */
    };

    MoveRight = () => {
        this.blocks[this.blocks.length - 1].MoveRight();

    };

    MoveLeft = () => {
        this.blocks[this.blocks.length - 1].MoveLeft();
    };

    MoveDown = (who = 0) => {
        if (who === 1) {
            this.blocks.forEach(element => element.MoveDown());
        } else {
            this.blocks[this.blocks.length - 1].MoveDown();
        }
    };

    Draw = () => {
        this.blocks.forEach(element => {
            context.fillStyle = element.color;
            for (let i = 0; i < element.positions.length; ++i) {
                for (let j = 0; j < element.positions[i].length; ++j) {
                    context.fillRect(element.positions[i][1] * 40, element.positions[i][0] * 40, 40, 40);
                }
            }
        });
    };
};