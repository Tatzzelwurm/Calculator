let operandOne;
let operandTwo;
let operator;
let expressionParts = [];
let isErrorState = false;
let isDisabled = true;
let currentTheme = "Light";
let result;

const powerBtn = document.querySelector("#powerBtn");
powerBtn.addEventListener("click", () => toggleCalculator());

const clearEntryBtn = document.querySelector("#clearEntryBtn");
clearEntryBtn.addEventListener("click", () => clearLastEntry());

const allClearBtn = document.querySelector("#allClearBtn");
allClearBtn.addEventListener("click", () => clearCalculator());

const themeToggleBtn = document.querySelector("#themeToggleBtn");
themeToggleBtn.addEventListener("click", () => toggleTheme());

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

const display = document.querySelector("#display");

function operate(operator, operandOne, operandTwo) {
  if (isDisabled) return;
  if (operator === "+") {
    result = add(operandOne, operandTwo);
    display.textContent = result;
    expressionParts = [];
  }
  if (operator === "-") {
    result = subtract(operandOne, operandTwo);
    display.textContent = result;
    expressionParts = [];
  }
  if (operator === "*") {
    result = Number(multiply(operandOne, operandTwo));
    display.textContent = result;
    expressionParts = [];
  }
  if (operator === "÷") {
    result = divide(operandOne, operandTwo);
    if (typeof result === "number") {
      result = Number(result.toFixed(3));
      display.textContent = result;
    } else {
      display.textContent = result;
    }
    expressionParts = [];
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
  return (operandOne * operandTwo).toFixed(3);
}

function divide(operandOne, operandTwo) {
  if (operandTwo == 0 && operandOne != 0) {
    displayError(0);
    return "Error 404: Logic not found";
  } else if (operandOne == 0 && operandTwo == 0) {
    displayError(1);
    return "¯\\_(ツ)_/¯";
  } else {
    return operandOne / operandTwo;
  }
}

function displayError(errorCode) {
  isErrorState = true;
  display.style.textAlign = "center";
  display.style.color = "red";
  if (errorCode == 0) {
    display.style.fontSize = "30px";
    display.style.lineHeight = "80px";
  }
  if (errorCode == 1) {
    display.style.fontSize = "50px";
  }
}

function isOperator(symbol) {
  return ["+", "-", "*", "÷"].includes(symbol);
}

function processInput(symbol) {
  if (isErrorState || isDisabled) return;

  if (display.textContent == 0 && !isOperator(symbol)) {
    // number = 0
    display.textContent = display.textContent.replace("0", symbol);
  } else if (display.textContent == 0 && isOperator(symbol)) {
    display.textContent += ` ${symbol} `;
  } else if (
    display.textContent != 0 &&
    !isOperator(symbol) &&
    display.textContent != String(result)
  ) {
    // number > 0
    display.textContent += symbol;
  } else if (
    display.textContent != 0 &&
    isOperator(symbol) &&
    expressionParts.length < 3
  ) {
    display.textContent += ` ${symbol} `;
  }
  if (display.textContent == result && !isOperator(symbol)) {
    display.textContent = symbol;
  }

  expressionParts = display.textContent.split(" ");

  operandOne = +expressionParts[0];
  operator = expressionParts[1];
  operandTwo = +expressionParts[2];
}

function clearCalculator() {
  if (!isDisabled) {
    display.textContent = "0";
    operandOne = undefined;
    operandTwo = undefined;
    operator = undefined;
    result = undefined;
    expressionParts = [];
    display.style.fontSize = "";
    display.style.textAlign = "";
    display.style.color = "";
    display.style.lineHeight = "";
    isErrorState = false;
  }
}

function toggleCalculator() {
  if (isDisabled) {
    isDisabled = false;
    powerBtn.textContent = "OFF";
    currentTheme == "Light"
      ? (display.style.backgroundColor = "whitesmoke")
      : (display.style.backgroundColor = "lightblue");
    display.textContent = "0";
  } else {
    clearCalculator();
    isDisabled = true;
    powerBtn.textContent = "ON";
    display.style.backgroundColor = "";
    display.textContent = "";
  }
}
function clearLastEntry() {
  if (!isDisabled) {
    let str = display.textContent;
    str = str.trim();
    display.textContent = str.substring(0, str.lastIndexOf(" "));
    if (display.textContent == "") {
      display.textContent = "0";
    }
    if (expressionParts.length == 0) {
      display.textContent = "0";
      display.style.fontSize = "";
      display.style.textAlign = "";
      display.style.color = "";
      display.style.lineHeight = "";
      isErrorState = false;
    }
  }
}
function toggleTheme() {
  const body = document.body;
  const calculator = document.querySelector("#calculator");
  const buttons = document.querySelectorAll("button");
  const headerText = document.querySelector("p");
  const credit = document.querySelector("#credit");
  const topLink = document.querySelector("#topLink");
  const githubLink = document.querySelector("#githubLink");
  const themeElements = [
    body,
    calculator,
    ...buttons,
    headerText,
    credit,
    topLink,
    githubLink,
  ];

  if (currentTheme == "Light") {
    themeToggleBtn.textContent = "☀️";
    currentTheme = "Dark";
    themeElements.forEach((element) => element.classList.add("dark-theme"));
    !isDisabled
      ? (display.style.backgroundColor = "lightblue")
      : (display.style.backgroundColor = "");
  } else {
    themeToggleBtn.textContent = "🌙";
    currentTheme = "Light";
    themeElements.forEach((element) => element.classList.remove("dark-theme"));
    !isDisabled
      ? (display.style.backgroundColor = "whitesmoke")
      : (display.style.backgroundColor = "");
  }
}
