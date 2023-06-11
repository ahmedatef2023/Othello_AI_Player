//------------------------(Discs Array)--------------------------------
//Array for store the Discs on board
let discs = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

//----------------------------------------------------------------------

//-------------------------(View)---------------------------------------
var dot1;
var dot2;
var dot3;
var AIInput;
var AIInput1;
var AIInput2;

var globalDepth;
var globalDepth1;
var globalDepth2;

let scoreLabel;
let canMoveLayer;
let blackBackground;
let discLayer;
let gap = 3;
let cellWidth = 65;
let turn = 1;
let Turn = 'Black';
var gameMode;

//initial function for load the App in Browser.
window.onload = function () {
    
              dot1 = document.getElementById('dot-1'); // human vs human
              dot2 = document.getElementById('dot-2'); // human vs AI
              dot3 = document.getElementById('dot-3'); // AI vs AI
              var inputBox1 = document.getElementById('input-box-1'); 
              var inputBox2 = document.getElementById('input-box-2'); 
              var inputBox3 = document.getElementById('input-box-3'); 
              AIInput = document.getElementById('AI');  // level human vs AI
              
              AIInput1 = document.getElementById('AI1');// level AI1
              AIInput2 = document.getElementById('AI2');// level AI2

              //making sure user can't force input value more than 4
              AIInput.addEventListener('input', function() {
                  if (parseFloat(AIInput.value) > 5) {
                    
                        AIInput.value = '5';
                        
                                        }});
              AIInput1.addEventListener('input', function() {
                  if (parseFloat(AIInput1.value) > 5) {
                        AIInput1.value = '5';
                                        }});
              AIInput2.addEventListener('input', function() {
                  if (parseFloat(AIInput2.value) > 5) {
                        AIInput2.value = '5';
                                        }});

              // greater number to be displayed is 5
              function toggleInputBoxes() {
                if (dot1.checked) {
                  inputBox1.style.display = 'none';
                  inputBox2.style.display = 'none';
                  inputBox3.style.display = 'none';
				  
                } 
                if(dot2.checked) {
                  inputBox1.style.display = 'none';
                  inputBox2.style.display = 'none';
                  inputBox3.style.display = 'block';
				  
                }
                if(dot3.checked)
                {
                  inputBox1.style.display = 'block';
                  inputBox2.style.display = 'block';
                  inputBox3.style.display = 'none';
				  
                }
              }
            
              dot1.addEventListener('change', toggleInputBoxes);
              dot2.addEventListener('change', toggleInputBoxes);
              dot3.addEventListener('change', toggleInputBoxes);
            
              // Initial state
              toggleInputBoxes();
             
            
	scoreLabel = document.getElementById('score');
	canMoveLayer = document.getElementById('canMoveLayer');
	blackBackground = document.getElementById('blackBackground');
	discLayer = document.getElementById('discLayer');
	drawGreenSquares();
	drawDiscs();
	drawCanMoveLayer();
	// showing overlay to disable clicks untill user adjust setting and press play
	Overlayshow(); 
};

function Overlayhide() { //hides the overlay that prevent the user to click on the board
	var overlay = document.querySelector('.Overlay');
	overlay.style.display = 'none';
	  }
	function Overlayshow() { //Shows the overlay that prevent the user to click on the board
	var overlay = document.querySelector('.Overlay');
	overlay.style.display = 'block';
	  }

function assign(event){
	event.preventDefault();
	Overlayhide();
	AIInput = document.getElementById('AI');  // level human vs AI          
    AIInput1 = document.getElementById('AI1');// level AI1
    AIInput2 = document.getElementById('AI2');// level AI2

    if (dot1.checked) gameMode='H2H';
    else if (dot2.checked){
        gameMode='H2A';
        globalDepth=AIInput.value;
    } 
    else if (dot3.checked){
        gameMode='A2A';
        globalDepth1=AIInput1.value;
        globalDepth2=AIInput2.value;
    } 
	console.log("level",globalDepth);
	console.log("Game Mode",gameMode);
    console.log("level A1",globalDepth1);
    console.log("level A2",globalDepth2);
	

}

function showPopupMessage(winnerName) {
	var popupMessage = document.querySelector('.popup-message');
	var winnerMessage = document.querySelector('#winnerMessage');
	winnerMessage.textContent = winnerName;
	popupMessage.classList.add('show');

	setTimeout(function() {
	  popupMessage.classList.remove('show');
   }, 2000); // Hide the popup message after 4 seconds 
  }
  function ResetGamingboard() {
	
	discs = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 0, 0, 0],
		[0, 0, 0, 1, 2, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
	drawGreenSquares();
	drawDiscs();
	drawCanMoveLayer();
	Overlayshow();
  }

//draw 64 green Square by js DOM.
function drawGreenSquares() {
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			let greenSquare = document.createElement('div');
			greenSquare.style.position = 'absolute';
			greenSquare.style.width = cellWidth;
			greenSquare.style.height = cellWidth;
			greenSquare.style.backgroundColor = 'green';
			greenSquare.style.left = (cellWidth + gap) * column + gap;
			greenSquare.style.top = (cellWidth + gap) * row + gap;
			greenSquare.setAttribute('onclick', 'clickedSquare(' + row + ',' + column + ')');
			blackBackground.appendChild(greenSquare);
		}
	}
}

//draw discs on board
function drawDiscs() {
	discLayer.innerHTML = '';
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			const value = discs[row][column];
			if (value !== 0) {
				let disc = document.createElement('div');
				disc.style.position = 'absolute';
				disc.style.width = cellWidth - 2;
				disc.style.height = cellWidth - 2;
				disc.style.borderRadius = '50%';
				disc.style.left = (cellWidth + gap) * column + gap + 1;
				disc.style.top = (cellWidth + gap) * row + gap + 1;
				if (value === 1) disc.style.backgroundColor = 'black';
				if (value === 2) disc.style.backgroundColor = 'white';
				discLayer.appendChild(disc);
			}
		}
	}
}

// draw circle showing the places where click is allowed.
function drawCanMoveLayer() {
	canMoveLayer.innerHTML = '';
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			const value = discs[row][column];
			if (value === 0 && canClickSpot(turn, row, column)) {
				let discOutline = document.createElement('div');
				discOutline.style.position = 'absolute';
				discOutline.style.width = cellWidth - 8;
				discOutline.style.height = cellWidth - 8;
				discOutline.style.borderRadius = '50%';
				discOutline.style.left = (cellWidth + gap) * column + gap + 2;
				discOutline.style.top = (cellWidth + gap) * row + gap + 2;
				discOutline.setAttribute('onclick', 'clickedSquare(' + row + ',' + column + ')');
				if (turn === 1) discOutline.style.border = '2px solid black';
				else if (turn === 2) discOutline.style.border = '2px solid white';
				discLayer.appendChild(discOutline);
			}
		}
	}
}

// for show the Turn && Current Score.
function reWriteScore() {
	let ones = 0;
	let twos = 0;
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			const value = discs[row][column];
			if (value === 1) ones += 1;
			else if (value === 2) twos += 1;
		}
	}
	if (turn === 2) Turn = 'White';
	else if (turn === 1) Turn = 'Black';
	scoreLabel.innerHTML = 'Turn: ' + Turn + '<br />' + 'Black: ' + ones + ' | ' + 'White: ' + twos;
	return [ones, twos];
}

//----------------------------------------------------------------------

//-------------------------(Controller)---------------------------------

function checkWinner() {
	//  2: black winner,  -2: white winner,  0: Tie,  1: No winner
	const [black, white] = reWriteScore();
	if (black + white === 64) {
		const winner = black > white ? 'black' : black < white ? 'white' : 'tie';
		showPopupMessage("Gameover , The Winner is "+winner);
		return winner;
	}
	return 1;
}

//click on green square && flip discs && finish of Game if all green square is filled.
function clickedSquare(row, column) {
    console.log(turn)
	if (discs[row][column] !== 0) {
		return;
	}
	if (canClickSpot(turn, row, column) === true) {
		let affectedDiscs = getAffectedDiscs(turn, row, column);
		flipDiscs(affectedDiscs);
		discs[row][column] = turn;
		if (turn === 1 && canMove(2)) {
			turn = 2;
			switch (gameMode) {
				case 'H2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
                case 'A2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
				default:
					break;
			}
		} else if (turn === 1 && !canMove(2))
        {
			turn = 1;
			switch (gameMode) {
				case 'H2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
                case 'A2A':
					setTimeout(function () {
						makeAIMove2();
					}, 100);
					break;
				default:
					break;
			}
		}
		else if (turn === 2 && canMove(1))
        {
			turn = 1;
			switch (gameMode) {
				case 'H2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
                case 'A2A':
					setTimeout(function () {
						makeAIMove2();
					}, 100);
					break;
				default:
					break;
			}
		}

		else if (turn === 2 && !canMove(1)) {
			turn = 2;
			switch (gameMode) {
				case 'H2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
                case 'A2A':
					setTimeout(function () {
						makeAIMove1();
					}, 100);
					break;
				default:
					break;
			}
		}

		drawDiscs();
		drawCanMoveLayer();
		reWriteScore();
		checkWinner();
	}
}

// can click on green square or no
function canMove(id) {
	for (let row = 0; row < 8; row++)
		for (let column = 0; column < 8; column++) if (canClickSpot(id, row, column)) return true;
	return false;
}

// Decide if a cell is clickable
function canClickSpot(id, row, column) {
	
	let affectedDiscs = getAffectedDiscs(id, row, column);
	if (affectedDiscs.length === 0) return false;
	else return true;
	
}

//flip discs from black to white && white to black
function flipDiscs(affectedDiscs) {
	for (let i = 0; i < affectedDiscs.length; i++) {
		const spot = affectedDiscs[i];
		if (discs[spot.row][spot.column] === 1) discs[spot.row][spot.column] = 2;
		else discs[spot.row][spot.column] = 1;
	}
}

//get all discs can flipped by click on any gree square.
function getAffectedDiscs(id, row, column) {
	let affectedDiscs = [];
	if (discs[row][column] === 0) {
		//flip the right
		let couldBeAffected = [];
		let columnIterator = column;
		let rowIterator = row;
		while (columnIterator < 7) {
			columnIterator += 1;
			const valueAtSpot = discs[row][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: row, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the left
		couldBeAffected = [];
		columnIterator = column;
		while (columnIterator > 0) {
			columnIterator -= 1;
			const valueAtSpot = discs[row][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: row, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the up
		couldBeAffected = [];
		rowIterator = row;
		while (rowIterator > 0) {
			rowIterator -= 1;
			const valueAtSpot = discs[rowIterator][column];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: column };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the down
		couldBeAffected = [];
		rowIterator = row;
		while (rowIterator < 7) {
			rowIterator += 1;
			const valueAtSpot = discs[rowIterator][column];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: column };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the down right
		couldBeAffected = [];
		rowIterator = row;
		columnIterator = column;
		while (rowIterator < 7 && columnIterator < 7) {
			rowIterator += 1;
			columnIterator += 1;
			const valueAtSpot = discs[rowIterator][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the down left
		couldBeAffected = [];
		rowIterator = row;
		columnIterator = column;
		while (rowIterator < 7 && columnIterator > 0) {
			rowIterator += 1;
			columnIterator -= 1;
			const valueAtSpot = discs[rowIterator][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the up right
		couldBeAffected = [];
		rowIterator = row;
		columnIterator = column;
		while (rowIterator > 0 && columnIterator < 7) {
			rowIterator -= 1;
			columnIterator += 1;
			const valueAtSpot = discs[rowIterator][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}

		//flip the up left
		couldBeAffected = [];
		rowIterator = row;
		columnIterator = column;
		while (rowIterator > 0 && columnIterator > 0) {
			rowIterator -= 1;
			columnIterator -= 1;
			const valueAtSpot = discs[rowIterator][columnIterator];
			if (valueAtSpot === 0 || valueAtSpot === id) {
				if (valueAtSpot === id) affectedDiscs = affectedDiscs.concat(couldBeAffected);
				break;
			} else {
				const discLocation = { row: rowIterator, column: columnIterator };
				couldBeAffected.push(discLocation);
			}
		}
	}
	return affectedDiscs;
}

//------------------------------AI----------------------------------------


function makeAIMove1() {
	let bestScore = -Infinity;
	let bestMove;

	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			if (discs[row][column] === 0 && canClickSpot(2, row, column)) {
				let affectedDiscs = getAffectedDiscs(2, row, column);
				flipDiscs(affectedDiscs);
				let tempBoard = JSON.parse(JSON.stringify(discs));
				tempBoard[row][column] = 2;
				const score = minimax(tempBoard, (globalDepth || globalDepth1), false);
				if (score === 'white') bestMove = { row, column };
				else if (score > bestScore) {
					bestScore = score;
					bestMove = { row, column };
				}
				// Undo the move
				tempBoard[row][column] = 0;
				flipDiscs(affectedDiscs.reverse());
			}
		}
	}

	if (bestMove) {
		let affectedDiscs = getAffectedDiscs(2, bestMove.row, bestMove.column);
		flipDiscs(affectedDiscs);
		discs[bestMove.row][bestMove.column] = 2;
		if (turn === 1 && canMove(2)) turn = 2;
		else if (turn === 2 && canMove(1)) turn = 1;
		else if (turn === 1 && !canMove(2)){
            turn = 1;
            switch (gameMode) {
                case 'H2A':
                    setTimeout(() => makeAIMove1(), 100);
                    break;
                case 'A2A':
                    setTimeout(() => makeAIMove2(), 100);
                    break;
                default:
                    break;
        }}
		else if (turn === 2 && !canMove(1)) {
			turn = 2;
			switch (gameMode) {
				case 'H2A':
					setTimeout(() => makeAIMove1(), 100);
					break;
                case 'A2A':
					setTimeout(() => makeAIMove1(), 100);
					break;
				default:
					break;
			}
		}

		drawDiscs();
		drawCanMoveLayer();
		reWriteScore();
		checkWinner();
	}
}
function makeAIMove2() {
	let bestScore = -Infinity;
	let bestMove;

	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			if (discs[row][column] === 0 && canClickSpot(1, row, column)) {
				let affectedDiscs = getAffectedDiscs(1, row, column);
				flipDiscs(affectedDiscs);
				let tempBoard = JSON.parse(JSON.stringify(discs));
				tempBoard[row][column] = 1;
				const score = minimax(tempBoard, globalDepth1, false);
				if (score === 'black') bestMove = { row, column };
				else if (score > bestScore) {
					bestScore = score;
					bestMove = { row, column };
				}
				// Undo the move
				tempBoard[row][column] = 0;
				flipDiscs(affectedDiscs.reverse());
			}
		}
	}

	if (bestMove) {
		let affectedDiscs = getAffectedDiscs(1, bestMove.row, bestMove.column);
		flipDiscs(affectedDiscs);
		discs[bestMove.row][bestMove.column] = 1;
		if (turn === 1 && canMove(2)) turn = 2;
		else if (turn === 2 && canMove(1)) turn = 1;
		else if (turn === 1 && !canMove(2)) {
           turn = 1; 
			switch (gameMode) {
				case 'A2A':
					setTimeout(() => makeAIMove2(), 100);
					break;
                case 'H2A':
                    setTimeout(() => makeAIMove1(), 100);
                    break;
				default:
					break;
			}
        }
		else if (turn === 2 && !canMove(1)) {
			turn = 2;
			switch (gameMode) {
				case 'H2A':
					setTimeout(() => makeAIMove1(), 100);
					break;
                case 'A2A':
                    setTimeout(() => makeAIMove1(), 100);
                    break;
				default:
					break;
			}
		}

		drawDiscs();
		drawCanMoveLayer();
		reWriteScore();
		checkWinner();
	}
}


function minimax(board, depth, maximizingPlayer) {
	const result = checkWinner();
	if (depth === 0 || result !== 1) return result;
	if (maximizingPlayer) {
		let bestScore = -Infinity;
		for (let row = 0; row < 8; row++) {
			for (let column = 0; column < 8; column++) {
				if (board[row][column] === 0 && canClickSpot(2, row, column)) {
					let affectedDiscs = getAffectedDiscs(2, row, column);
					flipDiscs(affectedDiscs);
					let tempBoard = JSON.parse(JSON.stringify(board));
					tempBoard[row][column] = 2;
					const score = minimax(tempBoard, depth - 1, false);
					bestScore = Math.max(bestScore, score);
					// Undo the move
					tempBoard[row][column] = 0;
					flipDiscs(affectedDiscs.reverse());
				}
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let row = 0; row < 8; row++) {
			for (let column = 0; column < 8; column++) {
				if (board[row][column] === 0 && canClickSpot(1, row, column)) {
					let tempBoard = JSON.parse(JSON.stringify(board));
					let affectedDiscs = getAffectedDiscs(1, row, column);
					flipDiscs(affectedDiscs);
					tempBoard = JSON.parse(JSON.stringify(board));
					tempBoard[row][column] = 1;
					const score = minimax(tempBoard, depth - 1, true);
					bestScore = Math.min(bestScore, score);
					// Undo the move
					tempBoard[row][column] = 0;
					flipDiscs(affectedDiscs.reverse());
				}
			}
		}
		return bestScore;
	}
}
