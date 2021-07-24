import { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = props => {

    const price = `$${props.meal.price.toFixed(2)}`;
    const ctx = useContext(CartContext);

    const addItemHandler = (amount) => {
        ctx.addItem({...props.meal, amount: amount});
    }

    return <li key={props.meal.id} className={styles.meal}>
        <div>
            <h3>{props.meal.name}</h3>
            <div className={styles.description}>{props.meal.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addItemHandler}/>
        </div>
    </li>

}

export default MealItem;