//PART A
localStorage.setItem('key', 0);
console.log("storing a value requires a key and a value.");
let value = localStorage.getItem('key');
console.log("getting a stored value by their key: " + value);
localStorage.removeItem('key');
value = localStorage.getItem('key');
console.log("removing a stored value by their key: " + value);
localStorage.setItem('key1', 1);
localStorage.setItem('key2', 2);
let value1 = localStorage.getItem('key1');
let value2 = localStorage.getItem('key2');
console.log("2 keys stored in localStorage: " + value1 + ", " + value2);
//store gameObj and stats so they save during the clear
let game = JSON.parse(localStorage.getItem("gameObj"));
let xwins = localStorage.getItem("xwin");
let owins = localStorage.getItem("owin");
let draw = localStorage.getItem("draw");
let totalGames = localStorage.getItem("totalGames");
localStorage.clear();
console.log("clearing all the stored values.");
value1 = localStorage.getItem('key');
value2 = localStorage.getItem('key');
console.log("2 keys no longer in localStorage: " + value1 + ", " + value2);

localStorage.setItem('string', "VALUE");
console.log("string storing is the same as ints.");
let array = ["index0", "index1", "index2"];
localStorage.setItem('array', JSON.stringify(array));
let obj = {
    key1: 'value1',
    key2: 'value2'
}
localStorage.setItem('obj', JSON.stringify(obj));
console.log("string arrays and obj you need to stringify.");
array = JSON.parse(localStorage.getItem('array'));
obj = JSON.parse(localStorage.getItem('obj'));
console.log("to get them you need to parse.");
console.log(array);
console.log(obj);

if (localStorage)
    console.log("local storage is supported.");

//PART B
const cellsEl = document.querySelectorAll('.cell');
let gameObj;
loadGame();
updateScreen();

const newGameBtnEl = document.getElementById("newGameBtn");
const resetDataBtnEl = document.getElementById("resetStatsBtn");
newGameBtnEl.addEventListener('click', newGame);
resetDataBtnEl.addEventListener('click', resetStats);
function newGame() {
    gameObj.board = ['', '', '', '', '', '', '', '', ''];
    gameObj.currentPlayer = "X";
    gameObj.gameStatus = "playing";
    gameObj.winner = "";
    gameObj.winnerCombonation = undefined;

    saveGame();
    cellsEl.forEach((cell) => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('taken');
        cell.classList.remove('winning');
        cell.textContent = '';

    });
    updateScreen();
}

cellsEl.forEach((cell) => {
    cell.addEventListener('click', makeMove);
});
function makeMove(e) {
    let index = e.target.getAttribute('data-index');
    if (gameObj.gameStatus == "playing" && gameObj.board[index] == "") {
        //game is being played and spot is empty
        gameObj.board[index] = gameObj.currentPlayer;

        //checks for win, draw, or continue playing
        updateGameStatus();

        if (gameObj.gameStatus == "playing") {
            gameObj.currentPlayer = gameObj.currentPlayer == "X" ? "O" : "X";
        } else if (gameObj.gameStatus == "win") {
            gameObj.winner = gameObj.currentPlayer;
        }

        saveGame();
        updateScreen();
    }
}

function updateGameStatus() {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    WINNING_COMBINATIONS.forEach((combo) => {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            if (gameObj.board[combo[i]] == gameObj.currentPlayer) {
                count++;
            }
        }
        if (count == 3) {
            gameObj.winnerCombonation = combo;
        }
    });
    if (gameObj.winnerCombonation != undefined) {
        gameObj.gameStatus = "win";
    } else {
        let count = 0;
        for (let i = 0; i < gameObj.board.length; i++) {
            if (gameObj.board[i] != "") {
                count++;
            }
        }
        if (count == 9 && gameObj.gameStatus != "win") {
            gameObj.gameStatus = "draw";
        }
    }
}

//PART C
function resetStats() {
    localStorage.setItem("xwin", 0);
    localStorage.setItem("owin", 0);
    localStorage.setItem("draw", 0);
    localStorage.setItem("totalGames", 0);
    updateScreen();
}

function saveGame() {
    //save stats
    if (gameObj.gameStatus == "draw") {
        let d = localStorage.getItem("draw");
        d++;
        localStorage.setItem("draw", d);
        let total = localStorage.getItem("totalGames");
        total++;
        localStorage.setItem("totalGames", total);
    }
    else if (gameObj.gameStatus == "win") {
        if (gameObj.currentPlayer == "X") {
            let x = localStorage.getItem("xwin");
            x++;
            localStorage.setItem("xwin", x);
        }
        else {
            let o = localStorage.getItem("owin");
            o++;
            localStorage.setItem("owin", o);
        }
        let total = localStorage.getItem("totalGames");
        total++;
        localStorage.setItem("totalGames", total);
    }
    //save gameObj
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
}

function loadGame() {
    if (game != null) {
        //there is data
        gameObj = game;
    } else {
        //no data found
        gameObj = {
            board: ['', '', '', '', '', '', '', '', ''],
            currentPlayer: "X",
            gameStatus: "playing",
            winner: "",
            winnerCombonation: undefined
        }
        xwins = 0;
        owins = 0;
        draw = 0;
        totalGames = 0;
    }
    localStorage.setItem("gameObj", JSON.stringify(gameObj));
    localStorage.setItem("xwin", xwins);
    localStorage.setItem("owin", owins);
    localStorage.setItem("draw", draw);
    localStorage.setItem("totalGames", totalGames);
    console.log(game);
}

//PART E
function updateScreen() {
    //status update
    const statusEl = document.getElementById('statusMessage');
    statusEl.classList.remove('winner');
    statusEl.classList.remove('draw');
    if (gameObj.gameStatus == "playing") {
        statusEl.innerHTML = "Player " + gameObj.currentPlayer + "'s turn";
    }
    else if (gameObj.gameStatus == "win") {
        statusEl.innerHTML = "Player " + gameObj.winner + " won!";
        statusEl.classList.add('winner');
    }
    else {
        //draw
        statusEl.innerHTML = "It's a draw!";
        statusEl.classList.add('draw');
    }
    //board update
    for (let i = 0; i < gameObj.board.length; i++) {
        if (gameObj.board[i] == "X") {
            cellsEl[i].classList.add("x");
            cellsEl[i].classList.add("taken");
            cellsEl[i].textContent = 'X';
        } else if (gameObj.board[i] == "O") {
            cellsEl[i].classList.add("o");
            cellsEl[i].classList.add("taken");
            cellsEl[i].textContent = 'O';
        }
    }
    //highlight winning 
    if (gameObj.winnerCombonation != undefined) {
        gameObj.winnerCombonation.forEach((index) => {
            cellsEl[index].classList.add('winning');
        });
    }
    //total games update
    const statsEl = document.querySelectorAll('.stat-value');
    statsEl[0].innerHTML = localStorage.getItem('totalGames');
    //xwins update
    statsEl[1].innerHTML = localStorage.getItem('xwin');
    //owins update
    statsEl[2].innerHTML = localStorage.getItem('owin');
    //draws update
    statsEl[3].innerHTML = localStorage.getItem('draw');
}