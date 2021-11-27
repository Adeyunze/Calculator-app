class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}
//Select Elements
const numbers = document.querySelectorAll('.number');
const controls = document.querySelectorAll('.controls');
const equals = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})
controls.forEach(control => {
    control.addEventListener('click', () => {
        calculator.chooseOperation(control.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})
clear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay()
})
backspace.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
})