import React from "react";
import "./styles.css";
export default function SearchBar() {
  return (
    <div className="searchBox">
      <input className="searchInput" type="text" name="" placeholder="Search" />
      <button className="searchButton">
        <img src="src/assets/icons/search-icon.svg" alt="" />
      </button>
    </div>
  );
}
