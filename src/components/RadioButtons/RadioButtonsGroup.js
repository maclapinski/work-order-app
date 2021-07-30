import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import classes from "./RadioButtonsGroup.module.css";

export default function RadioButtonsGroup({ options, value, onOrderChange }) {

  return (
    options ? (
      <FormControl component="fieldset">
        <RadioGroup
          className={classes.row}
          aria-label="list order selector"
          name="listOrderRadio"
          value={value}
          onChange={(event) => onOrderChange(event.target.value)}
        >
          {options.map((option) => (
            <FormControlLabel
            classes={{
              root: classes.buttonRoot,
              label: classes.buttonLabel,
            }}
              key={option.value}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    ) : (<div></div>)
  );
}
