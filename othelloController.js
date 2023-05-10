
//------------------------(Discs Array)--------------------------------
//Array of the Discs on board

var discs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

//-------------------------(View)---------------------------------------
//initial function for load the App in Browser.
var scoreLable;
var canMoveLayer;
var blackBackground;
var discLayer;
var gap = 3;
var cellWidth = 65;
var turn = 1;
var Turn = "Black";

var gameOver = false;

window.onload = function () {
    scoreLable = document.getElementById("score");
    canMoveLayer = document.getElementById("canMoveLayer");
    blackBackground = document.getElementById("blackBackground");
    discLayer = document.getElementById("discLayer");
    drawGreenSquares();
    drawDiscs();
    drawCanMoveLayer();
}

//draw 64 green Square by js DOM.

function drawGreenSquares() {
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var greenSquare = document.createElement("div");
            greenSquare.style.position = "absolute";
            greenSquare.style.width = cellWidth;
            greenSquare.style.height = cellWidth;
            greenSquare.style.backgroundColor = "green";
            greenSquare.style.left = (cellWidth + gap) * column + gap;
            greenSquare.style.top = (cellWidth + gap) * row + gap;
            greenSquare.setAttribute("onclick", "clickedSquare(" + row + "," + column + ")");

            blackBackground.appendChild(greenSquare);
        }
    }
}

//draw discs on board

function drawDiscs() {
    discLayer.innerHTML = "";
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 0) {

            }
            else {
                var disc = document.createElement("div");
                disc.style.position = "absolute";
                disc.style.width = cellWidth - 2;
                disc.style.height = cellWidth - 2;
                disc.style.borderRadius = "50%";
                disc.style.left = (cellWidth + gap) * column + gap + 1;
                disc.style.top = (cellWidth + gap) * row + gap + 1;

                if (value == 1) {
                    disc.style.backgroundColor = "black";
                }
                if (value == 2) {
                    disc.style.backgroundColor = "white";
                }
                discLayer.appendChild(disc);
            }
        }
    }
}

// draw circle showing the places where click is allowed.
function drawCanMoveLayer() {
    canMoveLayer.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let value = discs[row][column];
            if (value === 0 && canClickSpot(turn, row, column)) {
                let discOutline = document.createElement("div");
                discOutline.style.position = "absolute";
                discOutline.style.width = cellWidth - 8;
                discOutline.style.height = cellWidth - 8;
                discOutline.style.borderRadius = "50%";
                discOutline.style.left = (cellWidth + gap) * column + gap + 2;
                discOutline.style.top = (cellWidth + gap) * row + gap + 2;
                discOutline.setAttribute("onclick", "clickedSquare(" + row + "," + column + ")");
                if (turn === 1) discOutline.style.border = "2px solid black";
                else if (turn === 2) discOutline.style.border = "2px solid white";
                discLayer.appendChild(discOutline);
            }
        }
    }
}

function getAffectedDiscs(id, row, column) {
    var affectedDiscs = [];

    //flip the right
    var couldBeAffected = [];
    var columnIterator = column;
    while (columnIterator < 7) {
        columnIterator += 1;
        var valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: row, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the left
    var couldBeAffected = [];
    var columnIterator = column;
    while (columnIterator > 0) {
        columnIterator -= 1;
        var valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: row, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the up
    var couldBeAffected = [];
    var rowIterator = row;
    while (rowIterator > 0) {
        rowIterator -= 1;
        var valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: column };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the down
    var couldBeAffected = [];
    var rowIterator = row;
    while (rowIterator < 7) {
        rowIterator += 1;
        var valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: column };
            couldBeAffected.push(discLocation);
        }
    }

     //flip the down right
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator < 7 && columnIterator < 7) {
        rowIterator += 1;
        columnIterator += 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the down left
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator < 7 && columnIterator > 0) {
        rowIterator += 1;
        columnIterator -= 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the up right
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator > 0 && columnIterator < 7) {
        rowIterator -= 1;
        columnIterator += 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //flip the up left
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator > 0 && columnIterator > 0) {
        rowIterator -= 1;
        columnIterator -= 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == id) {
            if (valueAtSpot == id) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        }
        else {
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    return affectedDiscs;
}

// Decide if a cell is clickable
function canClickSpot(id, row, column) {
    var affectedDiscs = getAffectedDiscs(id, row, column);
    if (affectedDiscs.length == 0)
        return false;
    else return true;
}

function canMove(id) {
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            if (canClickSpot(id, row, column)) {
                return true;
            }
        }
    }
    return false;
}


//flip discs from balck to white && white to black
function flipDiscs(affectedDiscs) {
    for (var i = 0; i < affectedDiscs.length; i++) {
        var spot = affectedDiscs[i];
        if (discs[spot.row][spot.column] == 1) {
            discs[spot.row][spot.column] = 2;
        }
        else {
            discs[spot.row][spot.column] = 1;
        }
    }

}

// Update the score
function reWriteScore() {
    var ones = 0;
    var twos = 0;
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 1) ones += 1;
            else if (value == 2) twos += 1;
        }
    }

    if (turn == 2) Turn = "White";
    else if (turn == 1) Turn = "Black";

    scoreLable.innerHTML = "Turn: " + Turn + "<br />" + "Black: " + ones + " | " + "White: " + twos;
}

function clickedSquare(row, column) {
    if (gameOver) return;

    if (discs[row][column] != 0) {
        return;
    }
    if (canClickSpot(turn, row, column) == true) {
        var affectedDiscs = getAffectedDiscs(turn, row, column);
        flipDiscs(affectedDiscs);
        discs[row][column] = turn;
        if (turn == 1 && canMove(2)) turn = 2;
        else if (turn = 2 && canMove(1)) turn = 1;

        if ((canMove(1) == false && canMove(2) == false)) {
            alert("Game  Over");
            gameOver = true;
        }
        drawDiscs();
        drawCanMoveLayer();
        reWriteScore();
    }

}