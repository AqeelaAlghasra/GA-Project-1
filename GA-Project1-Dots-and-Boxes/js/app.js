// Elements 
const rows = document.getElementById("rows-number");
const cols = document.getElementById("cols-number");
const buildCustomBtn = document.getElementById('custom');
const playerName = document.getElementById('P1Name');
const player2Name = document.getElementById('P2Name');
const p1box = document.getElementById("P1colorMenu");
const p2box = document.getElementById("P2colorMenu");
const startGameBtn = document.getElementById('startGame');
const stopGameBtn = document.getElementById('stop');

let boxes=[]
const players = [];
let turn = true;
let currentBoardSize = "5x5";
let currentGameOption = "PxP"; // Default to Player vs Player
const gridOptionsBtns = document.querySelectorAll('.Grid');
const gameOptionsBtns = document.querySelectorAll('.Game');
let letter = "A";
let you = 0;
let comp = 0;
let playerletter;
let player2letter;
let anotherRound = false;
let gameStarted = false; // Initialize gameStarted
let sizeOptionClicked = false;
let gameOptionClicked = false;

// Grid Size Selection
gridOptionsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'size1':
                setGridSize(5, p1box.value);
                break;
            case 'size2':
                setGridSize(10, p1box.value);
                break;
            case 'size3':
                setGridSize(15, p1box.value);
                break;
            case 'custom':
                setGridSize(rows.value, p1box.value);
                break;
        }
    });
});

// Game Option Selection
gameOptionsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (event.target.id === 'PxP') {
            gameOptionClicked = true;
            currentGameOption = 'PxP';
            $('#player2').text(`${player2Name.value} : 0`);
            $('.P2-data').show();
        }
    });
});

// Start Game
startGameBtn.addEventListener('click', () => {
    gameStarted = true;
    if (!sizeOptionClicked) {
        setBoard(5, 5, p1box.value);
    } else {
        setBoard(cols.value, rows.value, p1box.value);
    }
    if (!gameOptionClicked) {
        currentGameOption = 'PxC'; // Default to Player vs Computer if not selected
    }
    disableBtn();
    players.push(playerName.value, player2Name.value);
    applyEvents();
});

// Stop Game
stopGameBtn.addEventListener('click', () => {
    gameStarted = false;
    enableBtn();
    if (anotherRound) {
        console.log('Another Game:');
    } else {
        clearBoard();
    }
});

// Set Grid Size Function
function setGridSize(size, color) {
    rows.value = size;
    cols.value = size;
    sizeOptionClicked = true;
    setBoard(size, size, color);
}

// Set Board Function
function setBoard(cols, rows, p1box) {
    let boxes = Array(rows * cols).fill(0);
    let html = "";
    $("#board").html(html);
    let c = 0;
    let offset = 100;
    let sx = window.innerWidth / 2 - (cols * offset) / 2;
    let sy = offset * 5;

    for (let dot = 0; dot < rows; dot++) {
        for (let col = 0; col < cols; col++) {
            let x = sx + col * offset; // Corrected calculation
            let y = sy + dot * offset; // Corrected calculation
            html += `
                <div class="box" data-id="${c}" style="left:${x + 2.5}px; top:${y + 2.5}px; background-color:${p1box};">
                    <h2 class="letter" style="text-align:center; top:-20px; color:Black;"></h2>
                </div>
                <div class="dot" style="left:${x - 5}px; top:${y - 5}px; background-color:${p1box};" data-box="${c}"></div>
                <div class="line lineh" data-line-1="${c}" data-line-2="${c - cols}" style="left:${x}px; top:${y}px;" data-active="false"></div>
                <div class="line linev" data-line-1="${c}" data-line-2="${c - 1}" style="left:${x}px; top:${y}px;" data-active="false"></div>`;
            boxes[c] = 0; // Initialize box state
            c++;
        }
    }

    // Add additional dots and lines for edges
    addEdgeDotsAndLines(html, rows, cols, sx, sy, p1box, c);
    $("#board").html(html);
}

// Function to add edge dots and lines
function addEdgeDotsAndLines(html, rows, cols, sx, sy, p1box, c) {
    // Right edge
    for (let i = 0; i < rows; i++) {
        let x = sx + cols * 100;
        let y = sy + i * 100; // Adjust as needed
        html += `
                <div class="dot" style="left:${x - 5}px; top:${y - 5}px; background-color:${p1box};" data-box="${c}"></div>
                <div class="line linev" data-line-1="${cols * (i + 1) - 1}" data-line-2="-1" style="left:${x}px; top:${y}px;" data-active="false"></div>`;
    }

    // Bottom edge
    for (let i = 0; i < cols; i++) {
        let x = sx + i * 100;
        let y = sy + rows * 100;
        html += `
                <div class="dot" style="left:${x - 5}px; top:${y - 5}px; background-color:${p1box};" data-box="${c}"></div>
                <div class="line lineh" data-line-1="${(rows - 1) * cols + i}" data-line-2="-1" style="left:${x}px; top:${y}px;" data-active="false"></div>`;
    }

    // Last dot bottom right
    html += `<div class="dot" style="left:${sx + cols * 100 - 5}px; top:${sy + rows * 100 - 5}px; background-color:${p1box};" data-active="false"></div>`;
}

// Clear Board Function
function clearBoard() {
    $("#board").html("");
}

// Apply Events Function
function applyEvents() {
    playerletter = getInitials(playerName.value);
    player2letter = getInitials(player2Name.value);
    $('#Turn').text('Turn: ' + players[0]);

    $("div.line").off('click').on('click', function () {
        let id1 = parseInt($(this).attr("data-line-1"));
        let id2 = parseInt($(this).attr("data-line-2"));

        if (checkValid(this) && turn) {
            let a = id1 >= 0 ? addValue(id1) : false;
            let b = id2 >= 0 ? addValue(id2) : false;
            $(this).addClass("line-active");
            $(this).attr("data-active", "true");

            if (!a && !b) {
                if (currentGameOption === 'PxC') {
                    switchTurn('Computer');
                } else {
                    switchTurn(players[1]);
                }
            }
        }
    });
}

// Check if line is valid
function checkValid(t) {
    return $(t).attr("data-active") === "false";
}

// Switch turn function
function switchTurn(nextTurn) {
    turn = !turn; // Toggle turn
    $('#Turn').text('Turn: ' + (turn ? players[0] : players[1]));
}

// Get initials from name
function getInitials(name) {
    return name.substring(0, 1);
}

// Disable buttons
function disableBtn() {
    if (gameStarted) {
        stopGameBtn.disabled = false;
        gameOptionsBtns.forEach(el => el.disabled = true);
        gridOptionsBtns.forEach(el => el.disabled = true);
        startGameBtn.disabled = true;
        rows.disabled = true;
        cols.disabled = true;
        $('.players').hide();
        $('#board').show();
    }
}

// Enable buttons
function enableBtn() {
    startGameBtn.disabled = false;
    gameOptionsBtns.forEach(el => el.disabled = false);
    gridOptionsBtns.forEach(el => el.disabled = false);
    rows.disabled = false;
    cols.disabled = false;
    stopGameBtn.disabled = true; // Fixed typo
    $('.players').show();
}

// Acquire function - handles box completion
function acquire(id) {
    letter = turn ? playerletter : 'C';
    if (turn) {
        you++;
    } else {
        comp++;
    }

    // Update the letter inside the box
    $("div.box[data-id='" + id + "'] h2.letter").text(letter);
    boxes[id] = "full"; // Mark box as full
    
    $("#player1").text(`${players[0]}: ${you}`);
    $("#player2").text(`${players[1]}: ${comp}`);

    // Check for winner
    if (boxes.every(box => box === "full")) {
        alert((you > comp ? players[0] : players[1]) + " won!");
    }
}

// Random number function
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add value function
function addValue(id) {
    boxes[id]++;
    if (boxes[id] === 4) {
        acquire(id);
        return true;
    }
    return false;
}