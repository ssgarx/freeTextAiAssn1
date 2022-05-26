import React from "react";

import searchIcon from "../assets/searchIcon.svg";
import closeIcon from "../assets/closeIcon.svg";

import styles from "./SearchBox.module.scss";

function SearchBox({ searchedText, setSearchedText }) {
  return (
    <div className={styles.searchBoxBox1}>
      <div>
        <img src={searchIcon} alt="searchIcon" />
      </div>
      <div>
        <input
          autoFocus={false}
          autoComplete="off"
          type="text"
          placeholder="search"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
      </div>
      {searchedText && (
        <div onClick={() => setSearchedText("")}>
          <img src={closeIcon} alt="closeIcon" />
        </div>
      )}
    </div>
  );
}

export default SearchBox;
