const displayEl = document.getElementById('display');
const clearEl = document.getElementById('clear');
const equalsEl = document.getElementById('equals');
const numBtns = Array.from(document.querySelectorAll('.btn'));

let prevInp = "";
let currInp = "";
let operator = "";

function updateDisplay() {
    displayEl.value = currInp || prevInp || "0";
}

numBtns.forEach(btn => { 
    btn.addEventListener("click", (e) => {
        const value = e.target.dataset.value;
        if (["+", "-", "*", "/"].includes(value)) {
            if (currInp === "") {
                return; 
            }
            if (prevInp !== "") {
                calculate(); 
            }
            operator = value; 
            prevInp = currInp; 
            currInp = ""; 
            updateDisplay();
        } else {
            currInp += value; 
            updateDisplay(); 
        }
    });
});

function calculate() {
    let result = "";
    const prev = parseFloat(prevInp);
    const curr = parseFloat(currInp);
    if (operator === "/" && curr === 0) {
        currInp = "Error";
        prevInp = "";
        operator = "";
        return;
    }
    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = prev / curr;
            break;
        default:
            return;
    }
    currInp = result;
    prevInp = ""; 
    operator = "";
}

equalsEl.addEventListener("click", e => {
    calculate();
    updateDisplay();
});

clearEl.addEventListener("click", e => {
    currInp = "";
    prevInp = "";
    operator = "";
    updateDisplay();
});
