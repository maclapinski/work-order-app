import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import classes from "./RadioButtonsGroup.module.css";

export default function RadioButtonsGroup({ options, onOrderChange }) {
  const [value, setValue] = React.useState(options[0].value);

  const handleChange = (event) => {
    setValue(event.target.value);
    onOrderChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        className={classes.row}
        aria-label="list order"
        name="listOrderRadio"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
          key={option.label}
            value={option.value}
            control={<Radio color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
