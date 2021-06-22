const choices = ["b", "i", "n", "g", "o"];
const urlParams = new URLSearchParams(window.location.search);
let answer = parseInt(urlParams.get('admin'));
if (isNaN(answer)) {
    game();
} else if (answer == 1) {
    document.getElementById("admin").style.display = "block";
}

function game() {
    let board = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    document.getElementById("game").style.display = "block";

    let min = 1, max = 15, used = [];
    for (let x = 0; x < 5; ++x) {
        for (let y = 0; y < 5; ++y) {
            let number = Math.floor(Math.random() * (max - min)) + min + 1;
            if (used.length == 0 || used.indexOf(number) < 0) {
                document.getElementById(String(y * 5 + x + 1)).innerHTML = number;
                used.push(number);
            } else {
                --y;
                continue;
            }

            document.getElementById(String(y * 5 + x + 1)).onclick = () => {
                if (document.getElementById(String(y * 5 + x + 1)).className != "red") {
                    document.getElementById(String(y * 5 + x + 1)).className = "red";
                    check(y, x, true);
                } else {
                    document.getElementById(String(y * 5 + x + 1)).className = "item";
                    check(y, x, false);
                }
            }

            if ((y * 5 + x + 1) >= 21) {
                min += 15;
                max += 15;
            }
        }
    }

    function check(y, x, TrueOrFalse) {
        if (TrueOrFalse) {
            board[y][x] = 1;
        } else {
            board[y][x] = 0;
        }
        console.log(board);
        let amount = 0;
        
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                if (board[i][j] == 1) {
                    ++amount;
                }
            }
        }

        if (amount >= 5) {
            let result = Vertical();
            if (result == true) {
                document.getElementById("win").style.display = "block";
            }
            result = Horizontal();
            if (result == true) {
                document.getElementById("win").style.display = "block";
            }
            result = Diagonal();
            if (result == true) {
                document.getElementById("win").style.display = "block";
            }
        }

        //vertical
        function Vertical() {
            let amount = 0;
            for (let i = 0; i < 5; ++i) {
                for (let j = 0; j < 5; ++j) {
                    if (board[i][j] == 1) {
                        ++amount;
                        if (amount >= 5) {
                            return true;
                        }
                    }
                }
                amount = 0;
            }
        }

        //horizontal
        function Horizontal() {
            let amount = 0;
            for (let i = 0; i < 5; ++i) {
                for (let j = 0; j < 5; ++j) {
                    if (board[j][i] == 1) {
                        ++amount;
                        if (amount >= 5) {
                            return true;
                        }
                    }
                }
                amount = 0;
            }
        }

        //diagonal
        function Diagonal() {
            let amount = 0;
            let right = true;
            let left = true;
            for (let runs = 0; runs < 5; ++runs) {
                if (right == true) {
                    for (let x = 0, y = 0; x < 5 && y < 5; ++x, ++y) {
                        if (board[y][x] == 1) {
                            ++amount;
                        }
                        if (amount == 5) {
                            return true;
                        }
                        if (x == 4 && y == 4) {
                            amount = 0;
                            right = false;
                            left = true;
                        }
                    }
                }
                if (left == true) {
                    for (let x = 4, y = 0; x > -1 && y < 5; --x, ++y) {
                        if (board[y][x] == 1) {
                            ++amount;
                        }
                        if (amount == 5) {
                            return true;
                        }
                        if (x == 0 && y == 4) {
                            amount = 0;
                            right = false;
                            left = true;
                        }
                    }
                }
            }
        }
    }
}

function check() {
    let input = String(document.getElementById("input").value);
    let values = input.split(",");

    console.log(values);

    let count = 0;
    for (let i = 0; i < values.length; ++i) {
        values[i].replace(" ", "");
        if (random.indexOf(values[i]) >= 0) {
            ++count;
        }
    }

    if (count > 0) {
        document.getElementById("true").innerHTML = "true";
    } else {
        document.getElementById("true").innerHTML = "false";
    }
}

let random = [];
function x() {
    let x = Math.floor(Math.random() * 5) + 1;
    let max = x * 15;
    let min = max - 14;
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    let letter = choices[x - 1].toUpperCase();
    if (random.indexOf(letter + String(number)) < 0) {
        document.getElementById("result").innerHTML = letter + String(number);
        random.push(letter + String(number));
    }
    document.getElementById("done").innerHTML = random.join(", ");
    document.getElementById("length").innerHTML = String(random.length) + ", " + String(random.length / 75) + " (Used Length/75)";
}