const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resultDisplayed = false;

// Utility
function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

// Handle semua input
function handleInput(value) {
  if (resultDisplayed && !isOperator(value)) {
    currentInput = value;
    resultDisplayed = false;
  } else {
    // Cegah operator dobel
    if (
      isOperator(value) &&
      isOperator(currentInput.slice(-1))
    ) {
      return;
    }
    currentInput += value;
  }

  display.value = currentInput;
}

// Hitung hasil
function calculate() {
  try {
    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
    resultDisplayed = true;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

// Clear
function clearDisplay() {
  currentInput = "";
  display.value = "";
}

// Delete
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

// Klik tombol
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) handleInput(value);
    if (action === "calculate") calculate();
    if (action === "clear") clearDisplay();
    if (action === "delete") deleteLast();
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || isOperator(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
const historyList = document.getElementById("history");

function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  li.onclick = () => {
    currentInput = result.toString();
    display.value = currentInput;
  };
  historyList.prepend(li);
}
// darkmode
document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("dark");
};
