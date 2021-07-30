import React from "react";
import classes from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ onChange }) => {
  const inputChangeHandler = (event) => {
    onChange(event.target.value);
  };
  return (
    <form action="." className={classes["form-inline"]}>
      <SearchIcon className={classes.icon} />
      <input
        onChange={inputChangeHandler}
        className={classes["form-control"]}
        name="search"
        type="search"
        placeholder="Filter by worker name..."
        aria-label="Filter by worker name"
      />
    </form>
  );
};
export default SearchBar;
