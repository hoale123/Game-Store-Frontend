import React, { useState, useEffect } from "react";

import "./style.css";

const SearchGames = ({ setProducts }) => {
  const [selectedStudio, setSelectedStudio] = useState("");
  const [selectedEsrbRating, setSelectedEsrbRating] = useState("");
  const [inputtedTitle, setInputtedTitle] = useState("");
  const [allGameData, setAllGameData] = useState([]);

  useEffect(() => {
    fetch("https://gamestore-backend.herokuapp.com/games")
      .then((r) => r.json())
      .then((d) => setAllGameData(d));

    if (selectedStudio !== "" && selectedEsrbRating !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/games?studio=${selectedStudio}&esrbRating=${selectedEsrbRating}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else if (selectedStudio !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/games?studio=${selectedStudio}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else if (selectedEsrbRating !== "") {
      fetch(
        `https://gamestore-backend.herokuapp.com/games?esrbRating=${selectedEsrbRating}`
      )
        .then((r) => r.json())
        .then((d) => setProducts(d));
    } else {
      fetch("https://gamestore-backend.herokuapp.com/games")
        .then((r) => r.json())
        .then((d) => setProducts(d));
    }
  }, [selectedStudio, selectedEsrbRating]);

  let studios = [];
  let esrbRatings = [];

  for (let i = 0; i < allGameData.length; i++) {
    studios.push(allGameData[i].studio);
    esrbRatings.push(allGameData[i].esrbRating);
  }

  let studioList = ["", ...new Set([...studios])];
  let esrbRatingList = ["", ...new Set([...esrbRatings])];

  const selectHandler = (e) => {
    if (e.target.name === "studio") {
      setSelectedStudio(e.target.value);
    } else {
      setSelectedEsrbRating(e.target.value);
    }
  };

  const resetHandler = () => {
    setSelectedStudio("");
    setSelectedEsrbRating("");
    setInputtedTitle("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://gamestore-backend.herokuapp.com/games/title/${inputtedTitle}`
    )
      .then((r) => r.json())
      .then((d) => setProducts([d]));

    resetHandler();
  };

  return (
    <div className="dflex">
      <div>
        <label>By Studio</label>
        <select value={selectedStudio} onChange={selectHandler} name="studio">
          {studioList.map((studio) => {
            return <option value={studio}>{studio}</option>;
          })}
        </select>
      </div>
      <div>
        <label>By ESRB Rating</label>
        <select
          value={selectedEsrbRating}
          onChange={selectHandler}
          name="esrbRating"
        >
          {esrbRatingList.map((rating) => {
            return <option value={rating}>{rating}</option>;
          })}
        </select>
      </div>
      <form onSubmit={submitHandler}>
        <label>By Title</label>
        <input
          value={inputtedTitle}
          onChange={(e) => setInputtedTitle(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={resetHandler}>Reset filters</button>
    </div>
  );
};

export default SearchGames;
