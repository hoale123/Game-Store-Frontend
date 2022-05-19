import React, {useState, useEffect} from 'react';

const SearchConsoles = ({setProducts}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [allConsoleData, setAllConsoleData] = useState([]);

  useEffect(() => {
      fetch("https://gamestore-backend.herokuapp.com/consoles")
        .then((r) => r.json())
        .then((d) => {
          console.log(d);
          setAllConsoleData(d);
        });

    if (selectedManufacturer) {
      fetch(
        `https://gamestore-backend.herokuapp.com/consoles?manufacturer=${selectedManufacturer}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else {
      fetch("https://gamestore-backend.herokuapp.com/consoles")
        .then((r) => r.json())
        .then((d) => setProducts(d));
    }

  }, [selectedManufacturer]);

  let manufacturers = [];

  for (let i = 0; i < allConsoleData.length; i++) {
    manufacturers.push(allConsoleData[i].manufacturer);
  }

  let manufacturerList = ["", ...new Set([...manufacturers])];

  const selectHandler = (e) => {
      setSelectedManufacturer(e.target.value);
  };

  const resetHandler = () => {
    setSelectedManufacturer("");
  };

  return (
    <div className="dflex">
      <div>
        <label>By Manufacturer</label>
        <select
          value={selectedManufacturer}
          onChange={selectHandler}
          name="manufacturer"
        >
          {manufacturerList.map((manufacturer) => {
            return <option value={manufacturer}>{manufacturer}</option>;
          })}
        </select>
      </div>
      <button onClick={resetHandler}>Reset filters</button>
    </div>
  );
}

export default SearchConsoles;
