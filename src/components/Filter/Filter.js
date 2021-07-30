import React from "react";
import RadioButtonsGroup from "../RadioButtons/RadioButtonsGroup";
import SearchBar from "../SearchBar/SearchBar";
import Section from "../Section/Section";
import classes from "./Filter.module.css";

const Filter = (props) => {
  return (
    <Section>
      <SearchBar onChange={props.onSearchTermChange} />
      <div className={classes.row}>
        <p>Sort</p>
        <RadioButtonsGroup
          onOrderChange={props.onOrderChange}
          options={props.options}
          value={props.value}
        />
      </div>
    </Section>
  );
};

export default Filter;
