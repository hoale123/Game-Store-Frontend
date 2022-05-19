import React, { useEffect } from 'react'
import Header from './Header';
import Main from './Main';
import CartContainer from './CartContainer';
import GameStoreForm from './GameStoreForm';
import { useState } from 'react';

export const GameStore = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [productType, setProductType] = useState("tshirts");
    const [search, setSearch] = useState("");

  const [scopedProdcut, setScopedProduct] = useState({});
  const [showForm, setShowForm] = useState(false);

useEffect(() => {
  fetch(`https://gamestore-backend.herokuapp.com/${productType}`)
  .then(r => r.json())
  .then(data => setProducts(data))
},[])

const handleSearch = (event) => {
  setSearch(event.target.value);
};

const filteredProducts = products.filter(
  product =>
  product.color.toLowerCase().includes(search.toLocaleLowerCase())||
  product.size.toLowerCase().includes(search.toLocaleLowerCase())
);


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
// function handleChange(evt) {
//   const clone = { ...products };
//   clone[evt.target.name] = evt.target.value;
//   setProductType(productType);
// }
// const productSwitch = (type) => {
//   switch(type) {
//     case "tshirts":
//       setProductType("tshirts")
//       break;
//     case "consoles":
//       setProductType("consoles")
//       break;
//     case "games":
//       setProductType("games")
//       break;
//   }
// } 
const handleSelect = (event) => {
  setProductType(event.target.value);
};

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
        {/* <form onSubmit={handleSubmit}> */}
        <select value={productType} onChange={handleSelect}>
        <option value='tshirts'>T-Shirts</option>
        <option value='games'>Games</option>
        <option value='consoles'>consoles</option>
      </select>
        {/* </form> */}
        <div className="searchbar">
      <label htmlFor="search">Search Products:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a product name to search..."
        onChange={handleSearch}
      />
    </div>
        <div className="row">
          <Main products={filteredProducts} onAdd={onAdd} productType={productType} notify={notify}></Main>
          <CartContainer
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          ></CartContainer>
        </div>
      </div>
    );
}
