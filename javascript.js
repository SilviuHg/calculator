const add = function (a, b) {
  return a + b;
};

const substract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b == 0) {
    return "error: can't divide by 0";
  } else {
    return a / b;
  }
};

function operate(operator, a, b) {
  if (operator == add) {
    return add(a, b);
  } else if (operator == substract) {
    return substract(a, b);
  } else if (operator == multiply) {
    return multiply(a, b);
  } else {
    return divide(a, b);
  }
}

let operator;
let firstOperand = "";
let secondOperand = "";

const display = document.querySelector(".display");
const displayValue = document.createElement("displayValue");
displayValue.textContent = "";
display.appendChild(displayValue);

const buttons = Array.from(document.querySelectorAll(".number"));
const clear = document.querySelector("#AC");
const dot = document.querySelector("#dot");
const sum = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const times = document.querySelector("#times");
const divider = document.querySelector("#divide");
const equal = document.querySelector("#equal");
const plusMinus = document.querySelector("#plus-minus");
const mod = document.querySelector("#mod");

// Function for each digit
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // This is used in order not to stack zeros

    if (firstOperand === "0") {
      firstOperand = "";
    }

    firstOperand += button.id;
    displayValue.textContent = firstOperand;
  });
});

// Clear function
clear.addEventListener("click", () => {
  firstOperand = "";
  secondOperand = "";
  displayValue.textContent = "";
});

// Function to append decimal
dot.addEventListener("click", () => {
  if (displayValue.textContent === "") firstOperand = "0";
  if (displayValue.textContent.includes(".")) return;
  firstOperand += ".";
  displayValue.textContent = firstOperand;
});

// Function for "+"
sum.addEventListener("click", () => {
  // This is used to chain operations without pressing equal

  if (secondOperand) {
    firstOperand = roundResult(
      operate(operator, +secondOperand, +firstOperand)
    );
    displayValue.textContent = firstOperand;
  }

  secondOperand = firstOperand;
  firstOperand = "";
  operator = add;
});

// Function for "-"
minus.addEventListener("click", () => {
  if (secondOperand) {
    firstOperand = roundResult(
      operate(operator, +secondOperand, +firstOperand)
    );
    displayValue.textContent = firstOperand;
  }
  secondOperand = firstOperand;
  firstOperand = "";
  operator = substract;
});

// Function for "*"
times.addEventListener("click", () => {
  if (secondOperand) {
    firstOperand = roundResult(
      operate(operator, +secondOperand, +firstOperand)
    );
    displayValue.textContent = firstOperand;
  }
  secondOperand = firstOperand;
  firstOperand = "";
  operator = multiply;
});

// Function for "/"
divider.addEventListener("click", () => {
  if (secondOperand) {
    firstOperand = roundResult(
      operate(operator, +secondOperand, +firstOperand)
    );
    displayValue.textContent = firstOperand;
  }
  secondOperand = firstOperand;
  firstOperand = "";
  operator = divide;
});

// Function for "="
equal.addEventListener("click", () => {
  if (secondOperand === "") {
    displayValue.textContent = firstOperand;
  } else {
    firstOperand = roundResult(
      operate(operator, +secondOperand, +firstOperand)
    );
    displayValue.textContent = firstOperand;
    secondOperand = "";
  }
});

// +/- function
plusMinus.addEventListener("click", () => {
  if (
    displayValue.textContent == "" ||
    firstOperand === "0" ||
    secondOperand === "0"
  ) {
    return;
  } else {
    firstOperand = -firstOperand;
    displayValue.textContent = firstOperand;
  }
});

// Remainder operation function
mod.addEventListener("click", () => {
  if (displayValue.textContent == "") return;
  firstOperand = firstOperand / 100;
  displayValue.textContent = firstOperand;
});

// Round the result
function roundResult(number) {
  if (isNaN(number)) return "error: can't divide by 0";
  return Math.round(number * 1000) / 1000;
}
