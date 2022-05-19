import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import CartContainer from "./CartContainer";
import GameStoreForm from "./GameStoreForm";
import { useState } from "react";

import SearchConsoles from "./SearchFilters/SearchConsoles";
import SearchGames from "./SearchFilters/SearchGames";
import SearchTshirts from "./SearchFilters/SearchTshirts";

export const GameStore = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productType, setProductType] = useState("tshirts");
  const [search, setSearch] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const [scopedProdcut, setScopedProduct] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`https://gamestore-backend.herokuapp.com/${productType}`)
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, [invoiceDetails]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  function notify({ action, product }) {
    switch (action) {
      case "add":
        setProducts([...products, product]);
        break;
      case "delete":
        setProducts(products.filter((e) => e.id !== product.id));
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
    setShowForm(false);
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

    console.log(products);

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
    return (
      <GameStoreForm
        productType={productType}
        product={scopedProdcut}
        notify={notify}
      />
    );
  }

  const onAdd = (product) => {
    // && product.quantity <= exist.qty
    const exist = cartItems.find((x) => x.id === product.id);
    console.log(exist)
    if (exist && exist.qty < exist.quantity) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else if (cartItems.length == 0) {
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

      
      

  const renderFilterOptions = () => {
    switch (productType) {
      case "games":
        return <SearchGames setProducts={setProducts} />;
      case "tshirts":
        return <SearchTshirts setProducts={setProducts} />;
      case "consoles":
        return <SearchConsoles setProducts={setProducts} />;
    }
  };

  return (
    <div className="App">
      <Header
        showForm={showForm}
        productType={productType}
        notify={notify}
        scopedProdcut={scopedProdcut}
        countCartItems={cartItems.length}
        setScopedProduct={setScopedProduct}
        setShowForm={setShowForm}
      ></Header>
      {/* Review */}
      <button
        style={{ width: 100 }}
        className="btn btn-primary"
        type="button"
        onClick={addClick}
      >
        Add Form
      </button>
      {/* <form onSubmit={handleSubmit}> */}
      <select value={productType} onChange={handleSelect}>
        <option value="tshirts">T-Shirts</option>
        <option value="games">Games</option>
        <option value="consoles">consoles</option>
      </select>
      {/* </form> */}
      <div className="searchbar">
        <label htmlFor="search">Search Products:</label>
        {renderFilterOptions()}
      </div>
      <div className="row">
        <Main
          products={products}
          onAdd={onAdd}
          productType={productType}
          notify={notify}
        ></Main>
        <CartContainer
          setInvoiceDetails={setInvoiceDetails}
          invoiceDetails={invoiceDetails}
          productType={productType}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></CartContainer>
      </div>
    </div>
  );
};
