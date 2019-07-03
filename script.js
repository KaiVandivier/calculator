// Make functions that operator buttons:
// On each button, have an event listener on click
// When clicked:
  // if it's a number, add it to the display value
  // if it's a decimal, add it to the display value and DISABLE
  // if it's an operator, store it AND the displayed number as n1; 
    // next button will clear the display and ENABLE decimal
    // Note: store number string as an integer
  // (or, display operator, and continue? more difficult to parse operation)
  // (if that's the case, it might make sense to store the displayed value separate from actual operations)
  // if it's an equals, store n2 call operate(operator, n1, n2)


function newEquation(eq) {
  eq.n1 = null;
  eq.n2 = null;
  eq.operator = null;
  eq.decimal = null;
  return eq;
}

function loadButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      pressButton(e);
    });
  });
}

function pressButton(e) {
  const btn = e.target;
  if (btn.className == "num") pressNum(btn.value);
  else if (btn.className == "op") pressOp(btn.id);
  else if (btn.id == "clear") clearAll();
  else if (btn.id == "decimal") addDecimal();
  else if (btn.id == "equals") equals();
}

function pressNum(num) {
  const display = document.querySelector('#display');
  if (eq.n1 && eq.n2) {
    newEquation(eq);
    clearDisplay();
  }
  if (display.textContent === "0") display.textContent = num;
  else if (display.textContent.length < 9) display.textContent += num;
  // TODO: handle screen refresh once operator is pressed
}

function pressOp(op) {
  const display = document.querySelector('#display');
  if (eq.n1 && eq.n2) newEquation(eq);
  if (!eq.operator) eq.operator = op;
  if (!eq.n1) eq.n1 = parseFloat(display.textContent);
  // TO DO WEDNESDAY: use updateScreen() function and eq instead of using textContent
  clearDisplay(display);
  // TODO: keep number on screen until next button is pressed
}

function addDecimal() {
  const display = document.querySelector('#display');
  if (!display.textContent.includes('.') && display.textContent.length < 9) {
    display.textContent += '.';
  };
}

function equals() {
  const display = document.querySelector('#display');
  if (!eq.n2) eq.n2 = parseFloat(display.textContent);
  const result = operate(eq.operator, eq.n1, eq.n2);
  display.textContent = result.toString().slice(0,9);
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
const divide = (n1, n2) => n1 / n2;

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