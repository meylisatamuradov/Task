import React, { useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Login from "../header/login";
import AddTask from "../task/addTask";
import Card from "../Card";
import Pagination from "../Pagination";
import { getTasks } from "../../Redux/actions";
import { useStyles } from "./useStyles";
import Filter from "../Filter";

export default function Main() {
  const { tasks, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    field: "username",
    fSort: "asc",
  });
  const [page, setPage] = useState(1);
  const [task, setTask] = useState({
    text: "add",
    task: {
      id: 0,
      username: "",
      email: "",
      text: "",
      status: 0,
    },
  });
  const classes = useStyles();

  const handleChangeFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const handleApply = () => {
    dispatch(
      getTasks({
        sort_field: filters.field,
        sort_direction: filters.fSort,
        page,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getTasks({
        sort_field: filters.field,
        sort_direction: filters.fSort,
        page,
      })
    );
  }, [dispatch]);

  const handlePaginationChange = (v) => {
    setPage(() => {
      dispatch(
        getTasks({
          sort_field: filters.field,
          sort_direction: filters.fSort,
          page: v,
        })
      );
      return v;
    });
  };
  const editClick = (id) => {
    let taskObj = tasks.tasks.filter((item) => item.id === id)[0];
    setTask({
      text: "edit",
      task: taskObj,
    });
    setOpen(true);
  };
  const buttonClick = () => {
    setTask({
      text: "add",
      task: {
        id: 0,
        username: "",
        email: "",
        text: "",
        status: 0,
      },
    });
    setOpen(true);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Login />
        <AddTask
          propTask={task.task}
          from={task.text}
          open={open}
          setOpen={setOpen}
          buttonClick={buttonClick}
          handleApply={handleApply}
        />
        <Filter
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          handleApply={handleApply}
        />
        {tasks.tasks.length>0 ? tasks.tasks.map((item) => (
          <Card key={item.id} task={item} editClick={editClick} />
        )) : (<h2 className={classes.noInfo}>No tasks</h2>)
        }
        {tasks.total_task_count >= 3 ? (
          <Pagination
            count={
              tasks.total_task_count % 3 > 0
                ? parseInt(tasks.total_task_count / 3) + 1
                : tasks.total_task_count / 3
            }
            page={page}
            handlePaginationChange={handlePaginationChange}
          />
        ) : null}
      </Container>
    </>
  );
}
