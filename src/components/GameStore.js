import React, { useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import CartContainer from './CartContainer';
import data from '../data';
import GameStoreForm from './GameStoreForm';
import { useState } from 'react';

export const GameStore = () => {
  const {product} = data
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loadData, setLoadData] = useState([]);
    const [productType, setProductType] = useState("tshirts");

  const [scopedProdcut, setScopedProduct] = useState({});
  const [showForm, setShowForm] = useState(false);


useEffect(() => {
  fetch(`http://localhost:8080/${productType}`)
  .then(r => r.json())
  .then(data => setProducts(data))
},[])


function notify({action, product}){

  switch (action){
    case "delete":
      setProducts(products.filter((e) => e.id !== product.id))
      break;
    case "edit":
      setProducts(
        product.map((e) => {
          if (e.id === product.id) {
            return product;
          }
          return e;
        })
      );
      break;
    case "edit-form":
      setScopedProduct(product);
      setShowForm(true);
      return;
  }
  setShowForm(false)
}

if (showForm) {
  return <GameStoreForm product={setScopedProduct} notify={notify} />;
}






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
          <Main products={products} onAdd={onAdd} productType={productType} notify={notify}></Main>
          <CartContainer
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          ></CartContainer>
        </div>
      </div>
    );
}
