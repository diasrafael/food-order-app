import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = props => {

    const [aumountIsValid, setAmountIsValid] =  useState(true);

    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = + enteredAmount;

        if (enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5) {
                setAmountIsValid(false);
                return
        }

        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input
            label="Amount"
            ref={amountInputRef}
            input={{
                id: 'amout',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
        }} />
        {!aumountIsValid && <p className={styles.error}>Please add a value between 1 and 5!</p>}
        <button>+ Add</button>
    </form>
}

export default MealItemForm;