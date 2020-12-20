import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import { useStyles } from "./useStyles";

const fields = ["username", "email", "status"];
const sort = ["asc", "desc"];

export default function GroupedSelect({ handleApply, handleChangeFilters }) {
  const classes = useStyles();

  return (
    <div className={classes.divBorder}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Field</InputLabel>
        <Select
          defaultValue={fields[0]}
          name="field"
          onChange={(e) => handleChangeFilters(e)}
        >
          {fields.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Sort</InputLabel>
        <Select
          defaultValue={sort[0]}
          name="fSort"
          onChange={(e) => handleChangeFilters(e)}
        >
          {sort.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.btnFilter}
        onClick={() => handleApply()}
        variant="contained"
      >
        Apply filter
      </Button>
    </div>
  );
}
