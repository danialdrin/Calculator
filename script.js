const display = document.getElementById('display');
const previousDisplay = document.getElementById('previous-display');

let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;

    if (operation !== null) {
        previousDisplay.textContent = `${previousInput} ${operation}`;
    } else {
        previousDisplay.textContent = previousInput;
    }
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperation(op) {
    if (operation !== null) {
        calculate();
    }

    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;

    updateDisplay();
}

function calculate() {
    if (operation === null || shouldResetScreen) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    if (typeof result === 'number') {
        currentInput = result.toString();
        if (currentInput.includes('.') && currentInput.split('.')[1].length > 8) {
            currentInput = result.toFixed(8).toString();
            currentInput = currentInput.replace(/\.?0+$/, '');
        }
    } else {
        currentInput = result;
    }

    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLastDigit() {
    if (currentInput.length === 1 || currentInput === 'Error') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

document.getElementById('zero').addEventListener('click', () => appendNumber('0'));
document.getElementById('double-zero').addEventListener('click', () => appendNumber('00'));
document.getElementById('one').addEventListener('click', () => appendNumber('1'));
document.getElementById('two').addEventListener('click', () => appendNumber('2'));
document.getElementById('three').addEventListener('click', () => appendNumber('3'));
document.getElementById('four').addEventListener('click', () => appendNumber('4'));
document.getElementById('five').addEventListener('click', () => appendNumber('5'));
document.getElementById('six').addEventListener('click', () => appendNumber('6'));
document.getElementById('seven').addEventListener('click', () => appendNumber('7'));
document.getElementById('eight').addEventListener('click', () => appendNumber('8'));
document.getElementById('nine').addEventListener('click', () => appendNumber('9'));

document.getElementById('dot').addEventListener('click', appendDecimal);

document.getElementById('add').addEventListener('click', () => handleOperation('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperation('-'));
document.getElementById('multiply').addEventListener('click', () => handleOperation('*'));
document.getElementById('divide').addEventListener('click', () => handleOperation('/'));

document.getElementById('equal').addEventListener('click', calculate);

document.getElementById('clear').addEventListener('click', clearCalculator);

document.getElementById('delete').addEventListener('click', deleteLastDigit);

document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperation(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLastDigit();
    } else if (e.key === 'Escape') {
        clearCalculator();
    }
});

updateDisplay();
