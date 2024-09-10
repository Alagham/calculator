const resultDisplay = document.getElementById('result');
let currentValue = '';
let previousValue = '';
let operator = '';


function appendNumber(value) {
    currentValue += value;
    resultDisplay.value = currentValue;
}
function chooseOperator(op) {
    if (currentValue === '') return;
    if (previousValue !== '') {
        compute();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}
function clearDisplay() {
    currentValue = '';
    previousValue = '';
   operator = '';
    resultDisplay.value = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default:
            return;
    }

    currentValue = computation;
    operator = '';
    previousValue = '';
    resultDisplay.value = currentValue;
}

function toggleSign() {
    if (currentValue !== '') {
        currentValue = (-1 * parseFloat(currentValue)).toString();
        resultDisplay.value = currentValue;
    }
}

function percentage() {
    if (currentValue !== '') {
        currentValue = (parseFloat(currentValue) / 100).toString();
        resultDisplay.value = currentValue;
    }
}


function appendDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        resultDisplay.value = currentValue;
    }
}


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.innerText;
        if (!isNaN(value)) {
            appendNumber(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            compute();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '%') {
            percentage();
        } else if (value === '.') {
            appendDecimal();
        } else {
            chooseOperator(value);
        }
    });
});
