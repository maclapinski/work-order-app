import React from "react";
import RadioButtonsGroup from "./RadioButtonsGroup";
import SearchBar from "./SearchBar";
import Section from "../UI/Section";
import classes from "./Filter.module.css";
import SearchIcon from "@material-ui/icons/Search";

const Filter = (props) => {
  return (
    <Section>
      <SearchBar onChange={props.onSearchTermChange}/>
      <div className={classes.row}>
        <p>Sort</p>
        <RadioButtonsGroup onOrderChange={props.onOrderChange} options={props.options} />
      </div>
    </Section>
  );
};

export default Filter;
