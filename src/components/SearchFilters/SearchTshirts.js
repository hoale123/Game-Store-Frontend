import React, { useState, useEffect } from "react";

const SearchTshirts = ({ setProducts }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [allShirtData, setAllShirtData] = useState([]);

  useEffect(() => {
      fetch("https://gamestore-backend.herokuapp.com/tshirts")
        .then((r) => r.json())
        .then((d) => setAllShirtData(d));
        console.log(selectedSize, selectedColor)

    if (selectedColor !== "" && selectedSize !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/tshirts?color=${selectedColor}&size=${selectedSize}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else if (selectedColor !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/tshirts?color=${selectedColor}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else if (selectedSize !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/tshirts?size=${selectedSize}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else {
      fetch("https://gamestore-backend.herokuapp.com/tshirts")
        .then((r) => r.json())
        .then((d) => setProducts(d));
    }
  }, [selectedColor, selectedSize, selectedColor, selectedSize]);

  let colors = [];
  let sizes = [];

  for (let i = 0; i < allShirtData.length; i++) {
    colors.push(allShirtData[i].color);
    sizes.push(allShirtData[i].size);
  }

  let colorList = ["", ...new Set([...colors])];
  let sizeList = ["", ...new Set([...sizes])];

  const selectHandler = (e) => {
    if (e.target.name === "color") {
      setSelectedColor(e.target.value);
    } else {
      setSelectedSize(e.target.value);
    }
  };

  const resetHandler = () => {
      console.log("reset")
    setSelectedColor("");
    setSelectedSize("");
  };

  return (
    <div className="dflex">
      <div>
        <label>By Color</label>
        <select value={selectedColor} onChange={selectHandler} name="color">
          {colorList.map((color) => {
            return <option value={color}>{color}</option>;
          })}
        </select>
      </div>
      <div>
        <label>By Size</label>
        <select value={selectedSize} onChange={selectHandler} name="size">
          {sizeList.map((size) => {
            return <option value={size}>{size}</option>;
          })}
        </select>
      </div>
      <button onClick={resetHandler}>Reset filters</button>
    </div>
  );
};

export default SearchTshirts;
