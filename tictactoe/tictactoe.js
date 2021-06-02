//get visual board
let spots = Array.from(document.getElementsByTagName("div"));

//create board
let board = Array(3).fill().map(() => Array(3).fill(0));

//turn
let Player = 1;

//url
const urlParams = new URLSearchParams(window.location.search);

//choose who goes first
let OrderChooser = document.querySelectorAll("input[name=order]");
for (const rb of OrderChooser) {
    rb.addEventListener("change", (e) => {
        if (!board.includes(1) && !board.includes(2)) {
            Player = Number(e.target.value);
            urlParams.set("order", e.target.value);
            window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${urlParams}`));
        }
    })
}

//get user input for computer or not
let input = document.getElementById("choice");
input.onchange = (e) => {
    Computer = Boolean(e.target.checked);
    if (Computer) {
        urlParams.set("computer", 1);
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${urlParams}`));
    } else {
        urlParams.delete("computer");
        window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${urlParams}`));
    }
}

//if computer is playing
let Computer = parseInt(urlParams.get("computer"));
if(isNaN(Computer)) {
    Computer = false;
} else if (Computer === 1) {
    Computer = true;
    input.checked = true;
}

//if computer is first
let order = parseInt(urlParams.get("order"));
if (isNaN(order)) {
    Player = 1
} else {
    Player = order;
    for (const rb of OrderChooser) {
        if (Number(rb.getAttribute("value")) == order) {
            rb.setAttribute("checked", "true");
        }
    }
}

//if there is a win or not
let Win = false;

//add click to all spots
spots.forEach(element => {
    element.onclick = () => {
        if (!element.innerHTML) {
            let x = Number(element.getAttribute("data-x"));
            let y = Number(element.getAttribute("data-y"));
            if (Player > 0) {
                board[y][x] = 1;
                element.innerHTML = "X";
            } else if (Player < 0) {
                board[y][x] = 2;
                element.innerHTML = "O";
            }
            let WhoWon;
            if (WhoWon = SearchForWin()) {
                if (WhoWon === "Player") {
                    document.getElementById("win").innerHTML = "Player 1 Won";
                } else {
                    document.getElementById("win").innerHTML = "Player 2 Won";
                }
                spots.forEach(e => {
                    e.onclick = null;
                })
                Win = true;
            }
            element.onclick = null;
            Player = -Player;
        }
    }
})

function SearchForWin() {
    for (let row = 0; row < 3; ++row) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            if (board[row][0] == 1) {
                return "Player";
            } else if (board[row][0] == 2) {
                return "Com";
            }
        }
    }

    for (let col = 0; col < 3; ++col) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
            if (board[0][col] == 1) {
                return "Player";
            } else if (board[0][col] == 2) {
                return "Com";
            }
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if (board[0][0] == 1) {
            return "Player";
        } else if (board[0][0] == 2) {
            return "Com";
        }
    }

    if (board[0][2]==board[1][1] && board[1][1]==board[2][0])
    {
        if (board[0][2]==1)
            return "Player";
        else if (board[0][2]==2)
            return "Com";
    }


    return;
}

function IsMovesLeft(board) {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (board[i][j] === 0) {
                return true;
            }
        }
    }
    return false;
}

function evaluate(board, depth) {
    for (let row = 0; row < 3; ++row) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if (board[row][0] === 1) {
                return +10 - depth;
            } else if (board[row][0] === 2) {
                return -10 + depth;
            }
        }
    }

    for (let col = 0; col < 3; ++col) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if (board[0][col] == 1) {
                return +10 - depth;
            } else if (board[0][col] === 2) {
                return -10 + depth;
            }
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 1) {
            return +10 - depth;
        } else if (board[0][0] === 2) {
            return -10 + depth;
        }
    }

    if (board[0][2]===board[1][1] && board[1][1]===board[2][0])
    {
        if (board[0][2]===1) {
            return +10 - depth;
        } else if (board[0][2]===2) {
            return -10 + depth;
        }
    }


    return 0;
}

function minimax(board, depth, isMax, beta, alpha) {
    let score = evaluate(board, depth);
    if (score === 10 - depth || score === -10 + depth) {
        return score;
    }

    if (!IsMovesLeft(board)) {
        return 0;
    }

    if (isMax) {
        let best = -1000;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (board[i][j] === 0) {
                    board[i][j] = 1;
                    best = Math.max(best, minimax(board, depth + 1, false, 1000, -1000));
                    board[i][j] = 0;
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) {
                        i = j = 2;
                    }
                }
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (board[i][j] === 0) {
                    board[i][j] = 2;
                    best = Math.min(best, minimax(board, depth + 1, true, 1000, -1000));
                    board[i][j] = 0;
                    beta = Math.min(beta, best);
                    if (beta <= alpha) {
                        i = j = 2;
                    }
                }
            }
        }
        return best;
    }
}

function findBestMove(board) {
    let bestVal = 1000;
    let bestMove = {
        row: -1,
        col: -1
    }

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (board[i][j] === 0) {
                board[i][j] = 2
                let moveVal = minimax(board, 0, true, 1000, -1000);
                board[i][j] = 0

                if (moveVal < bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}

let computer = setInterval(() => {
    if (Computer && Player < 0 && !Win) {
        let bestMove = findBestMove(board);
        if (bestMove.row != -1 || bestMove.col != -1) {
            board[bestMove.row][bestMove.col] = 2;
        }
        spots.forEach(element => {
            let x = element.getAttribute("data-x");
            let y = element.getAttribute("data-y");
            let value = board[y][x];
            if (value === 1) {
                value = "X"
            } else if (value === 2) {
                value = "O";
            } else {
                value = "";
            }
            element.innerHTML = value;
        })
        let WhoWon;
        if (WhoWon = SearchForWin()) {
            if (WhoWon === "Player") {
                document.getElementById("win").innerHTML = "Player 1 Won";
            } else {
                document.getElementById("win").innerHTML = "Player 2 Won";
            }
            spots.forEach(e => {
                e.onclick = null;
            })
            Win = true;
        }

        Player = 1;
        console.log(board);
    }
})