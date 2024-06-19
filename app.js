let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2, 'row-1'],
  [3, 4, 5, 'row-2'],
  [6, 7, 8, 'row-3'],
  [0, 3, 6, 'col-1'],
  [1, 4, 7, 'col-2'],
  [2, 5, 8, 'col-3'],
  [0, 4, 8, 'diag-1'],
  [2, 4, 6, 'diag-2']
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  removeLineThrough();
};

const removeLineThrough = () => {
  boxes.forEach(box => {
    box.classList.remove('line-through', 'row-1', 'row-2', 'row-3', 'col-1', 'col-2', 'col-3', 'diag-1', 'diag-2');
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X"
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner, winningPattern) => {
  msg.innerText = `Congratulations, the Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  addLineThrough(winningPattern);
};

const addLineThrough = (pattern) => {
  const [index1, index2, index3, className] = pattern;
  boxes[index1].classList.add('line-through', className);
  boxes[index2].classList.add('line-through', className);
  boxes[index3].classList.add('line-through', className);
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);