let operandOne;
let operandTwo;
let operator;

function operate(operator, operandOne, operandTwo) {
  if (operator === "+") {
    add(operandOne, operandTwo);
  }
  if (operator === "-") {
    subtract(operandOne, operandTwo);
  }
   if (operator === "*") {
    multiply(operandOne, operandTwo);
  }
   if (operator === "/") {
    divide(operandOne, operandTwo);
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

