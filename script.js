var arr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

var temp = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

// Initialize arr with references to the DOM elements
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

function initializeTemp(temp) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;
        }
    }
}

function setTemp(board, temp) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }
        }
    }
}

function setColor(temp) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }
        }
    }
}

function resetColor() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j].style.color = "green";
        }
    }
}

var board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let button = document.getElementById('generate-sudoku');
let solve = document.getElementById('solve');

function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

// Add event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    button = document.getElementById('generate-sudoku');
    solve = document.getElementById('solve');
    
    if (button && solve) {
        setupEventListeners();
    } else {
        console.error("Button elements not found!");
    }
});

function setupEventListeners() {
    button.onclick = function() {
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = function() {
            if (xhrRequest.status === 200) {
                try {
                    var response = JSON.parse(xhrRequest.response);
                    console.log(response);
                    initializeTemp(temp);
                    resetColor();
                    
                    board = response.board;
                    setTemp(board, temp);
                    setColor(temp);
                    changeBoard(board);
                } catch (e) {
                    console.error("Error parsing JSON response:", e);
                    handleApiFailure();
                }
            } else {
                console.error("API request failed with status:", xhrRequest.status);
                handleApiFailure();
            }
        };
        
        xhrRequest.onerror = function() {
            console.error("Network error occurred");
            handleApiFailure();
        };
        
        xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy');
        xhrRequest.send();
    };

    solve.onclick = function() {
        solveSudoku(board);
    };
}

function handleApiFailure() {
    // Generate a simple random puzzle if API fails
    const randomBoard = generateRandomSudoku();
    board = randomBoard;
    setTemp(board, temp);
    setColor(temp);
    changeBoard(board);
    alert("Used a locally generated puzzle as the external API could not be reached.");
}

function generateRandomSudoku() {
    // This is a simplified random board generator
    // Creates a valid but very simple puzzle with ~20 filled cells
    const newBoard = Array(9).fill().map(() => Array(9).fill(0));
    
    // Fill in a few random cells with valid values
    for (let i = 0; i < 20; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        let num = Math.floor(Math.random() * 9) + 1;
        
        if (isSafe(newBoard, row, col, num) && newBoard[row][col] === 0) {
            newBoard[row][col] = num;
        }
    }
    
    return newBoard;
}

function isSafe(board, r, c, no) {
    // Check if number exists in the same row or column
    for (var i = 0; i < 9; i++) {
        if (board[i][c] == no || board[r][i] == no) {
            return false;
        }
    }
    
    // Check subgrid
    var sx = r - r % 3;
    var sy = c - c % 3;

    for (var x = sx; x < sx + 3; x++) {
        for (var y = sy; y < sy + 3; y++) {
            if (board[x][y] == no) {
                return false;
            }
        }
    }

    return true;
}

function solveSudokuHelper(board, r, c) {
    // Base case
    if (r == 9) {
        changeBoard(board);
        return true;
    }
    
    // Move to next row when column reaches end
    if (c == 9) {
        return solveSudokuHelper(board, r + 1, 0);
    }
    
    // Skip pre-filled cells
    if (board[r][c] != 0) {
        return solveSudokuHelper(board, r, c + 1);
    }

    // Try placing each number 1-9
    for (var i = 1; i <= 9; i++) {
        if (isSafe(board, r, c, i)) {
            board[r][c] = i;
            var success = solveSudokuHelper(board, r, c + 1);
            if (success == true) {
                return true;
            }
            // Backtrack if not successful
            board[r][c] = 0;
        }
    }
    return false;
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0);
}

// Add input handling for user to manually enter numbers
function setupInputHandling() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j].addEventListener('click', function() {
                // Only allow editing cells that were not pre-filled
                const cellId = parseInt(this.id);
                const row = Math.floor(cellId / 9);
                const col = cellId % 9;
                
                if (!temp[row][col]) {
                    const input = prompt("Enter a number (1-9):", "");
                    if (input !== null) {
                        const num = parseInt(input);
                        if (!isNaN(num) && num >= 1 && num <= 9) {
                            board[row][col] = num;
                            this.innerText = num;
                        } else if (input === "") {
                            board[row][col] = 0;
                            this.innerText = "";
                        }
                    }
                }
            });
        }
    }
}

// Initialize the input handling after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupInputHandling();
});