
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
}