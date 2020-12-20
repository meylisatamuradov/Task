import React from "react";
import { Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useStyles } from "./useStyles";

export default function PaginationControlled({
  count,
  page,
  handlePaginationChange,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={count}
        page={page}
        onChange={(e, v) => handlePaginationChange(v)}
      />
    </div>
  );
}
