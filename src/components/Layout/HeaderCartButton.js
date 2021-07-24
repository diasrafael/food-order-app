import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {

    const ctx = useContext(CartContext);
    const numberOfItems = ctx.items.reduce((acc, item) => acc + item.amount, 0);
    
    const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);
    useEffect(() => {
        if (numberOfItems === 0) {
            return
        }
        setbtnIsHighlighted(true)
        const timer = setTimeout(()=>setbtnIsHighlighted(false),300);

        return () => {
            clearTimeout(timer);
        }

    }, [numberOfItems])
    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfItems}</span>
    </button>

}

export default HeaderCartButton;