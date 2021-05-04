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
let colors = ["green", "white", "red", "rgb(78, 49, 30)"];

range.value = square_side.toString();
range.onchange = (e) => {
    let side = e.target.value;
    canvas.setAttribute('width', side.toString());
    canvas.setAttribute('height',side.toString());
    DisplayMap();
}

function MoveUp(pos, who = 0) {
    if (who == 0) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    }
    else {
        var iter = board.indexOf(4);
        board[iter] = 2;
    }
    
    if (pos > 0) {
        pos -= 1;
        iter += gameLevel * -1;
    }

    who == 0 ? board[iter] = 1 : board[iter] = 4;
    return pos;
}

function MoveRight(pos, who = 0) {
    if (who === 0) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    } else {
        var iter = board.indexOf(4);
        board[iter] = 2;
    }
    if (pos < gameLevel - 1) {
        pos += 1;
        iter += 1;
    }
    who === 0 ? board[iter] = 1 : board[iter] = 4;
    return pos;
}

function MoveDown(pos, who = 0) {
    if (who === 0) {
        var iter = board.indexOf(1);
        board[iter] = 0;
    } else {
        var iter = board.indexOf(4);
        board[iter] = 2;
    }

    if (pos < gameLevel - 1) {
        pos += 1;
        iter += gameLevel;
    }

    who === 0 ? board[iter] = 1 : board[iter] = 4;
    return pos;
}

function MoveLeft(pos, who = 0)
{
	if (who == 0) {
		var iter = board.indexOf(1);
		board[iter] = 0;
	}
	else {
		var iter = board.indexOf(4);
		board[iter] = 2;
	}


	if (pos > 0)
	{
		pos -= 1;
		iter -= 1;
	}

	who == 0 ? board[iter] = 1 : board[iter] = 4;
	return pos;
}

function CreateMap() {
    board = new Array(gameLevel * gameLevel).fill(0);
    let ComX = 0, ComY = 0;
    board[0] = 4;
    board[board.length - 1] = 3;
    let PastMoves = [];
    while (board.includes(3)) {
        let Move = Math.floor(Math.random() * 4) + 1;
        let position = board.indexOf(4);
        if (Move === 1) {
            if (ComY > 0) {
                if (board[position - gameLevel] != 2) {
                    PastMoves.push('w');
                    ComY = MoveUp(ComY, 1);
                }
            }
            else {
                for (let x = 0; x < 2; ++x) {
                    if (PastMoves.length > 3) {
                        if (PastMoves[PastMoves.length - 1] === 'w') {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY += 1;
                            iter += gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "s") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY -= 1;
                            iter -= gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "d") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX -= 1;
                            iter -= 1;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "a") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX += 1;
                            iter += 1;
                            board[iter] = 4;
                        }
                        PastMoves.pop();
                    }
                }
            }
        } else if (Move === 2) {
            if (ComX < gameLevel - 1) {
                if (board[position + 1] != 2) {
                    PastMoves.push("d");
                    ComX = MoveRight(ComX, 1);
                }
            }
            else {
                for (let x = 0; x < 2; ++x) {
                    if (PastMoves.length > 3) {
                        if (PastMoves[PastMoves.length - 1] === 'w') {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY += 1;
                            iter += gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "s") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY -= 1;
                            iter -= gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "d") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX -= 1;
                            iter -= 1;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "a") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX += 1;
                            iter += 1;
                            board[iter] = 4;
                        }
                        PastMoves.pop();
                    }
                }
            }
        } else if (Move === 3) {
            if (ComY < gameLevel - 1) {
                if (board[position + gameLevel] != 2) {
                    PastMoves.push("s");
                    ComY = MoveDown(ComY, 1);
                }
                else {
                    for (let x = 0; x < 2; ++x) {
                        if (PastMoves.length > 3) {
                            if (PastMoves[PastMoves.length - 1] === 'w') {
                                let iter = board.indexOf(4);
                                board[iter] = 0;
                                ComY += 1;
                                iter += gameLevel;
                                board[iter] = 4;
                            } else if (PastMoves[PastMoves.length - 1] === "s") {
                                let iter = board.indexOf(4);
                                board[iter] = 0;
                                ComY -= 1;
                                iter -= gameLevel;
                                 board[iter] = 4;
                            } else if (PastMoves[PastMoves.length - 1] === "d") {
                                let iter = board.indexOf(4);
                                board[iter] = 0;
                                ComX -= 1;
                                iter -= 1;
                                board[iter] = 4;
                            } else if (PastMoves[PastMoves.length - 1] === "a") {
                                let iter = board.indexOf(4);
                                board[iter] = 0;
                                ComX += 1;
                                iter += 1;
                                board[iter] = 4;
                            }
                            PastMoves.pop();
                        }
                    }
                }
            }
        } else if (Move === 4) {
            if (ComX > 0) {
                if (board[position - 1] != 2) {
                    PastMoves.push("a");
                    ComX = MoveLeft(ComX, 1);
                }
            }
            else {
                for (let x = 0; x < 2; ++x) {
                    if (PastMoves.length > 3) {
                        if (PastMoves[PastMoves.length - 1] === 'w') {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY += 1;
                            iter += gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "s") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComY -= 1;
                            iter -= gameLevel;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "d") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX -= 1;
                            iter -= 1;
                            board[iter] = 4;
                        } else if (PastMoves[PastMoves.length - 1] === "a") {
                            let iter = board.indexOf(4);
                            board[iter] = 0;
                            ComX += 1;
                            iter += 1;
                            board[iter] = 4;
                        }
                        PastMoves.pop();
                    }
                }
            }
        }
    }

    for (let x = 0; x < board.length; ++x) {
        if (board[x] === 2) {
            board[x] = 0;
        } else if (board[x] === 0) {
            board[x] = 2;
        }
    }

    board[0] = 1;
    board[board.length - 1] = 3;
    console.log(board);
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