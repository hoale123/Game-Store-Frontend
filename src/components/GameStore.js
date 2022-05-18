import React, { useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import CartContainer from './CartContainer';
import data from '../data';
import { useState } from 'react';

export const GameStore = () => {
    const { products } = data;
    const [cartItems, setCartItems] = useState([]);
    const [loadData, setLoadData] = useState([]);
    const [productType, setProductType] = useState("consoles");


useEffect(() => {
  fetch("http://localhost:8080/"+ productType)
  .then(r => r.json())
  .then(data => setLoadData(data))
},[])


    const onAdd = (product) => {
      const exist = cartItems.find((x) => x.id === product.id);
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
    };
    const onRemove = (product) => {
      const exist = cartItems.find((x) => x.id === product.id);
      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
    };
    return (
      <div className="App">
        <Header countCartItems={cartItems.length}></Header>
        <div className="row">
          <Main products={products} onAdd={onAdd}></Main>
          <CartContainer
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          ></CartContainer>
        </div>
      </div>
    );
}
