function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let id = 0;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell(id));
    }
  }

  const getBoard = () => board;

  const dropToken = (column, row, player) => {
    const cellValue = board[row][column].getValue();

    if (cellValue !== 0) {
      console.log("Cell Occupied. Choose a different cell.");
      return false;
    }

    board[row][column].addToken(player);
    return true;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell(id) {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  id += 1;

  return {
    id,
    addToken,
    getValue,
  };
}

const gameController = (function (
  playerOne = "Player One",
  playerTwo = "Player Two"
) {
  const winner = document.querySelector(".winner");
  const winnerPlayer = document.querySelector(".winner-text");
  const restart = document.querySelector(".restart");
  const cells = document.querySelectorAll(".cell");
  const formContainer = document.querySelector(".start-container");
  const form = document.querySelector(".start-inner");
  let player1;
  let player2;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(document.querySelector("#namep1").value.length);

    player1 =
      document.querySelector("#namep1").value.length > 1
        ? document.querySelector("#namep1").value
        : "Player One";

    console.log(player1);
    player2 =
      document.querySelector("#namep2").value.length > 1
        ? document.querySelector("#namep2").value
        : "Player Two";

    console.log(player2);
    formContainer.classList.add("hidden");
  });

  function isDraw() {
    let checked = 0;
    cells.forEach((cell) => {
      if (cell.classList.contains("x") || cell.classList.contains("circle")) {
        checked += 1;
      }
    });

    if (checked === 9) {
      return true;
    } else {
      return false;
    }
  }

  const checkWinner = (currentClass) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentClass);
      });
    });
  };

  const setHover = (circleTurn) => {
    const boardContainer = document.querySelector(".board");
    boardContainer.classList.remove("x");
    boardContainer.classList.remove("circle");
    if (circleTurn) {
      boardContainer.classList.add("circle");
    } else {
      boardContainer.classList.add("x");
    }
  };

  let circleTurn = false;

  function handleClick(e) {
    const cell = e.target;
    console.log(cell);

    const classCurrent = circleTurn ? "circle" : "x";

    cell.classList.add(classCurrent);

    if (checkWinner(classCurrent)) {
      if (circleTurn) {
        winnerPlayer.textContent = `${player2} Won!`;
      } else {
        winnerPlayer.textContent = `${player1} Won!`;
      }

      winner.classList.toggle("hidden");
    } else if (isDraw()) {
      winnerPlayer.textContent = "It's a Draw!";
      winner.classList.toggle("hidden");
    }

    circleTurn = !circleTurn;

    setHover(circleTurn);
  }

  restart.addEventListener("click", () => {
    winner.classList.toggle("hidden");
    form.reset();
    formContainer.classList.toggle("hidden");
    startCells(cells);
  });

  const startCells = () => {
    cells.forEach((cell) => {
      cell.classList.remove("x");
      cell.classList.remove("circle");
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    });
  };

  startCells(cells);
})();
