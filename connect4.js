/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const currPlayerText = document.getElementById('header')


let currPlayer = 1; // active player: 1 or 2
let nextPlayer = 2; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
    return board
 };
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
const htmlBoard = document.getElementById("board");  // gets "htmlBoard" variable from the item in HTML w/ID of "board"

  const top = document.createElement("tr"); //defines what top does in creating a "table row"
  top.setAttribute("id", "column-top"); //sets ID of the entire top row
  top.addEventListener("click", handleClick); //top row is listening for clicks

  //below code creates/appends TDs within the top tr with IDs equal to 0 - WIDTH increasing with each iteration. 
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell); 
  }
  htmlBoard.append(top);

  // below code dynamically creates trs and tds which makes up the board itself. it sets IDs dynamically based on iterations of loop (y) and loop within loop (x). 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    row.setAttribute("id", `row${y}`)
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

//added this function so user better knows whose turn it is based on text color
function changeTextColor(){
  headerTextValue = currPlayerText.innerHTML
  console.log(headerTextValue)
  if( nextPlayer === 1 ) {
    currPlayerText.style.color = 'red'
  } else {
    currPlayerText.style.color = 'blue'
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  changeTextColor()
  currPlayerText.innerHTML = `Player ${nextPlayer} Turn`
    // get x from ID of clicked cell
    const x = +evt.target.id;
    console.log(`x=${x}`)
  
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    console.log(`y=${y}`)
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);
    
    // check for win
    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }
    
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
    }
      
    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
    nextPlayer = nextPlayer === 1 ? 2 : 1;

  };
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
