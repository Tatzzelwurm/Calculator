let operandOne;
let operandTwo;
let operator;
let expressionParts = [];

const equals = document.querySelector("#equals");
equals.addEventListener("click", () =>
  operate(operator, operandOne, operandTwo),
);

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) =>
  number.addEventListener("click", () => processInput(number.textContent)),
);

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
  operator.addEventListener("click", () => processInput(operator.textContent)),
);

const allClearBtn = document.querySelector("#allClearBtn");
allClearBtn.addEventListener("click", () => clearCalculator());

const display = document.querySelector("#display");
display.textContent = "0";

function operate(operator, operandOne, operandTwo) {
  if (operator === "+") {
    display.textContent = add(operandOne, operandTwo);
  }
  if (operator === "-") {
    display.textContent = subtract(operandOne, operandTwo);
  }
  if (operator === "*") {
    display.textContent = multiply(operandOne, operandTwo);
  }
  if (operator === "÷") {
    display.textContent = divide(operandOne, operandTwo);
  }
  if (
    operator === undefined ||
    operandOne === undefined ||
    operandTwo === undefined
  ) {
    alert("Please enter a complete expression");
  }
}

function add(operandOne, operandTwo) {
  return operandOne + operandTwo;
}

function subtract(operandOne, operandTwo) {
  return operandOne - operandTwo;
}

function multiply(operandOne, operandTwo) {
  return operandOne * operandTwo;
}

function divide(operandOne, operandTwo) {
  return operandOne / operandTwo;
}

function isOperator(symbol) {
  return ["+", "-", "*", "÷"].includes(symbol);
}

function processInput(symbol) {
  if (display.textContent == 0 && !isOperator(symbol)) {
    // number = 0
    display.textContent = display.textContent.replace("0", symbol);
  } else if (display.textContent == 0 && isOperator(symbol)) {
    display.textContent += ` ${symbol} `;
  } else if (display.textContent != 0 && !isOperator(symbol)) {
    // number > 0
    display.textContent += symbol;
  } else if (display.textContent != 0 && isOperator(symbol)) {
    display.textContent += ` ${symbol} `;
  }

  expressionParts = display.textContent.split(" ");

  operandOne = +expressionParts[0];
  operator = expressionParts[1];
  operandTwo = +expressionParts[2];
}

function clearCalculator() {
  display.textContent = "0";
  operandOne = undefined;
  operandTwo = undefined;
  operator = undefined;
  expressionParts = [];
}
