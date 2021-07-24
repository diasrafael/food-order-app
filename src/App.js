import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown, setCartIsShonw] = useState(false)

  const showCartHandler = () => {
    setCartIsShonw(true)
  };

  const hideCartHandler = () => {
    setCartIsShonw(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onDismiss={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
