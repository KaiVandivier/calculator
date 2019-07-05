
function newEquation(eq) {
  eq.n1 = null;
  eq.n2 = null;
  eq.operator = null;
  eq.result = null;
}

function loadButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', clickButton);
  });
}

function loadKeyboard() {
  window.addEventListener('keydown', pressKey);
}

function pressKey(e) {
  const btn = document.querySelector(`button[data-key="${e.key}"]`);
  if (btn) {
    btn.classList.add('pressed');
    window.addEventListener('keyup', () => removeAnimation(btn))
    activateButton(btn);
  }
}

function removeAnimation(btn) {
  btn.classList.remove('pressed');
}

function clickButton(e) {
  const btn = e.target;
  if (btn) activateButton(btn);
}

function activateButton(btn) {
  if (btn.className.includes("num")) pressNum(btn.value);
  else if (btn.className.includes("op")) pressOp(btn.id);
  else if (btn.id == "clear") clearAll();
  else if (btn.id == "decimal") addDecimal();
  else if (btn.id == "equals") equals();
}

function pressNum(num) {
  const display = document.querySelector('#display');
  if (eq.result !== null) {
    newEquation(eq);
    clearDisplay();
  }
  if (display.textContent === "0" 
      || (eq.operator && display.textContent == eq.n1)) {
    display.textContent = num;
  } 
  else if (display.textContent.length < 9) display.textContent += num;
}

function pressOp(op) {
  const display = document.querySelector('#display');
  if (eq.operator) equals();
  if (eq.result !== null) newEquation(eq);
  if (!eq.operator) eq.operator = op;
  if (!eq.n1) eq.n1 = parseFloat(display.textContent);
}

function addDecimal() {
  const display = document.querySelector('#display');
  if (eq.result !== null) {
    newEquation(eq);
    clearDisplay();
  }
  if (eq.operator && display.textContent == eq.n1) clearDisplay(); 
  if (!display.textContent.includes('.') && display.textContent.length < 9) {
    display.textContent += '.';
  };
}

function equals() {
  const display = document.querySelector('#display');
  if (!eq.n2) eq.n2 = parseFloat(display.textContent);
  eq.result = (eq.operator && eq.n1 !== null && eq.n2 !== null) ? operate(eq.operator, eq.n1, eq.n2)
      : display.textContent;
  if (eq.result !== null) display.textContent = formatResult(eq.result);
}

function formatResult(result) {
  let formattedResult = 
      ((Math.abs(result) >= 1e+9) || (Math.abs(result) < 1e-5 && result.toString().length > 9)) ?
      result.toExponential(3).toString()
      : result.toString().slice(0,9); 
  return formattedResult;
}

function clearDisplay() {
  const display = document.querySelector('#display');
  display.textContent = "0";
}

function clearAll() { 
  clearDisplay();
  newEquation(eq);
}

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => (n2 == 0)? "n/a" : n1 / n2;

function operate(operator, n1, n2) {
  return (operator == "add") ? add(n1,n2)
      : (operator == "subtract") ? subtract(n1,n2)
      : (operator == "multiply") ? multiply(n1,n2)
      : (operator == "divide") ? divide(n1,n2)
      : null;
}

const eq = {};
newEquation(eq);
loadButtons();
loadKeyboard();