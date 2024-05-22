const display = document.querySelector('.calculatorInput');
const keys = document.querySelector('.calculatorKeys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updatedValue();

function updatedValue() {
    display.value = displayValue;
}

keys.addEventListener('click', function(x) {
    const element = x.target;

    if(!(element.matches('button'))) return;

    if(element.classList.contains('operator')) {
        console.log('opeator ' + element.value);
        handleOperator(element.value);
        updatedValue();
    }
    else if(element.classList.contains('float')) {
        console.log('float ' + element.value);
        inputFloat(element.value);
        updatedValue();
    }
    else if(element.classList.contains('clear')) {
        console.log('clear ' + element.value);
        clearAll();
        updatedValue();
    }
    else {
        console.log('number ' + element.value);
        inputNumber(element.value);
        updatedValue();
    }
    
});

function inputNumber(number) {

    if(number == 'pi') {
        number = parseFloat(Math.PI.toFixed(5));;
    }
    
    if(number == "e") {
        number = parseFloat(Math.E.toFixed(5));;
    }

    if(waitingForSecondValue) {
        displayValue = number;
        waitingForSecondValue = false;
    }
    else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputFloat(dot) {
    if(displayValue.includes(dot)) return;  
    displayValue += dot;
}

function clearAll() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function handleOperator(localOpeator) {
    const value = parseFloat(displayValue);
    
    if(localOpeator == 'abs'){
        displayValue = Math.abs(displayValue);
        firstValue = displayValue;
    }
    else if(localOpeator == 'sqrt') {
        displayValue = Math.sqrt(displayValue);
        firstValue = displayValue;
    }

    if(operator && waitingForSecondValue) {
        operator = localOpeator;
        return;
    }

    if(!(firstValue)) {
        firstValue = value;
        waitingForSecondValue = true;
        operator = localOpeator;
    }
    else if(operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(5))}`;
        firstValue = result;
        waitingForSecondValue = true;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(value1, value2, operator) {

    switch(operator) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 * value2;
        case '/':
            return value1 / value2;
        case '%':
            return value1 % value2;
        case '^':
            return Math.pow(value1,value2);
        case '=':
            return value2;
        default:
            throw new Error("Geçersiz operatör: " + operator);
    }
}