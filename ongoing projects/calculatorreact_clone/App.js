import { useReducer } from 'react'
import DigitButton from './DigitButton.js'
import './calculator.css'

export const ACTIONS =  {
    EVALUATE: 'evaluate',
    ADD_DIGIT: 'add-digit',
    CLEAR: 'clear',
    CHOOSE_OPERATION: 'choose-operation',
    DELETE_DIGIT: 'delete-digit'
}

function App() {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
    return (
        <div class="calculator-grid">
            <div class="output">
                <div data-previous-operand class="previous-operand">{previousOperand} {operation}</div>
                <div data-current-operand class="current-operand">{currentOperand}</div>
            </div>
            <button data-all-clear class="span-two">AC</button>
            <button data-delete>DEL</button>
            <button data-operation>÷</button>
            <DigitButton digit='1' dispatch={dispatch} />
            <button data-number>2</button>
            <button data-number>3</button>
            <button data-operation>*</button>
            <button data-number>4</button>
            <button data-number>5</button>
            <button data-number>6</button>
            <button data-operation>+</button>
            <button data-number>7</button>
            <button data-number>8</button>
            <button data-number>9</button>
            <button data-operation>-</button>
            <button data-number>.</button>
            <button data-number>0</button>
            <button data-equals class="span-two">=</button>
        </div>
    )
}

function reducer(state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            return {
                ...state,
                currentOperand: `${currentOperand||''}${payload.digit}`
            }
    }
}