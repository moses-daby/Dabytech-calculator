class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear();
    };
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.ops = '';
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(num) {
        if (num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + num.toString();
    };

    chooseOperation(ops) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        };

        this.ops = ops;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (this.previousOperand && !this.currentOperand) {
            this.currentOperand = this.previousOperand;
            this.ops = '';
            this.previousOperand = '';
        };
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.ops) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        };
        this.currentOperand = computation;
        this.ops = '';
        this.previousOperand = '';
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        };
    }

    updateDisplay() {
        this.current.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.ops !== null) {
            this.previous.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.ops}`;
        } else {
            this.previous.innerText = '';
        }
    }
};

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

const calculator = new Calculator(previous, current);

numberBtn.forEach(btn => {
    btn.onclick = () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    };
});

operationBtn.forEach(btn => {
    btn.onclick = () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    };
});

equalsBtn.onclick = () => {
    calculator.compute();
    calculator.updateDisplay();
};

allClearBtn.onclick = () => {
    calculator.clear();
    calculator.updateDisplay();
}

deleteBtn.onclick = () => {
    calculator.delete();
    calculator.updateDisplay();
}