


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
