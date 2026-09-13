let currentOperand = '0';
let previousOperand = '';
let operation = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
  currentDisplay.innerText = currentOperand;
  if (operation != null) {
    previousDisplay.innerText = `${previousOperand} ${operation}`;
  } else {
    previousDisplay.innerText = '';
  }
}

function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '0';
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current === 0 ? 'Error' : prev / current;
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = '';
  updateDisplay();
}

// Keyboard input support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
  if (e.key === 'Enter' || e.key === '=') compute();
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Escape') clearDisplay();
});