import React, { useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import CartContainer from './CartContainer';
import data from '../data';
import GameStoreForm from './GameStoreForm';
import { useState } from 'react';

export const GameStore = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
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
    case "add":
      setProducts([...products, product]);
      break;
    case "delete":
      setProducts(products.filter((e) => e.id !== product.id))
      break;
    case "edit":
      setProducts(
        products.map((e) => {
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


function addClick() {
  setScopedProduct({
    size: "",
    price: "",
    color: "",
    description: "",
    quantity: "",
  });
  setShowForm(true);
}
if (showForm) {
  return <GameStoreForm productType={productType} product={scopedProdcut} notify={notify} />;
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
        <Header showForm={showForm} productType={productType}  notify={notify} scopedProdcut={scopedProdcut}  countCartItems={cartItems.length} setScopedProduct={setScopedProduct} setShowForm={setShowForm}></Header>
        {/* Review */}
        <button style={{width: 100}} className="btn btn-primary" type="button" onClick={addClick}>
        Add Form
        </button>
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
