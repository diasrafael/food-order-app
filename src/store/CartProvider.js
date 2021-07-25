import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + action.item.price;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }

    } else if (action.type === 'REMOVE') {

        const itemToBeRemovedIndex = state.items.findIndex(item => item.id === action.id)
        const itemToBeRemoved = state.items[itemToBeRemovedIndex];
        const updatedTotalAmount = state.totalAmount - itemToBeRemoved.price

        let updatedItems;
        if (itemToBeRemoved.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            updatedItems = [...state.items]
            updatedItems[itemToBeRemovedIndex] = {...itemToBeRemoved, amount: itemToBeRemoved.amount - 1}
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCardAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => dispatchCardAction({ type: 'ADD', item: item });
    const removeItemFromCartHandler = id => dispatchCardAction({ type: 'REMOVE', id: id });

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;