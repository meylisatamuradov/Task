import React, { useState, useEffect } from "react";
import { useStyles } from "./useStyles";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextareaAutosize,
  Snackbar,
  Switch,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../Redux/actions";
import { isEmailValid } from "../../Common/helpers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MuiAlert from "@material-ui/lab/Alert";

// Alert Modal window
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddTask({
  propTask,
  from,
  open,
  setOpen,
  buttonClick,
  handleApply,
}) {
  const [task, setTask] = useState(propTask);

  // Error state
  const [error, setError] = useState(false); // state no date
  const [errorText, setErrorText] = useState(""); // state no date
  const [errorType, setErrorType] = useState("error"); // state no date

  const dispatch = useDispatch();
  const classes = useStyles();
  const texts = {
    header: from === "add" ? "Add task" : "Edit task",
    buttonText: from === "add" ? "Add" : "Edit",
  };
  useEffect(() => {
    setTask(propTask);
  }, [propTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSwitchChenge = () => {
    setTask((prev) => ({
      ...prev,
      status:
        prev.status == 0
          ? 10
          : prev.status == 1
          ? 11
          : prev.status == 10
          ? 0
          : 1,
    }));
  };

  const handleSubmit = async () => {
    if (from !== "add") {
      if (task.text.length > 0) {
        if (localStorage.getItem("token")) {
          let newTask = task;
          if (task.text !== propTask.text) {
            newTask.status = task.status == 0 || task.status == 1 ? 1 : 11;
            setTask({
              ...task,
              status: task.status == 0 || task.status == 1 ? 1 : 11,
            });
          }
          setOpen(false);
          var res = await dispatch(
            editTask(newTask, localStorage.getItem("token"))
          );
          if (res === "success") {
            setError(true);
            setErrorText("The task edited successfully");
            setErrorType("success");
          } else if (res === "token_error") {
            setError(true);
            setErrorText("Token expired. Logout and Login again");
            setErrorType("error");
          } else {
            setError(true);
            setErrorText("Something went wrong");
            setErrorType("error");
          }
        } else {
          setError(true);
          setErrorText("First sign in then try to edit");
          setErrorType("error");
          setTask(propTask);
        }

        setOpen(false);
      }
    } else {
      if (
        isEmailValid(task.email) &&
        task.username.length > 0 &&
        task.text.length > 0
      ) {
        // Modal window,  Verification validations
        setOpen(false);
        let res = await dispatch(addTask(task));

        if (res) {
          setError(true);
          setErrorText("Added new task");
          setErrorType("success");
          setTask({
            username: "",
            email: "",
            text: "",
          });
          handleApply();
        } else {
          setError(true); // Modal window error
          setErrorText("Something went wrong");
          setErrorType("error");
        }
      } else {
        setError(true); // Modal window error
        setErrorText("Fill up all fields");
        setErrorType("error");
      }
    }
  };

  return (
    <Box className={classes.addTask}>
      <Button
        className={classes.btn}
        variant="contained"
        onClick={() => buttonClick()}
      >
        Add task
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{texts.header}</DialogTitle>
       

        <DialogContent className={classes.addTaskModal}>
        {from !== "add" ? (
          <>
            Status:
            <Switch
              checked={task.status == 0 || task.status == 1 ? false : true}
              onChange={handleSwitchChenge}
              name="status"
              color="primary"
            />
          </>
        ) : null}
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={(errors) => console.log("Error", errors)}
          >
            <TextValidator
            autoFocus
              variant="outlined"
              margin="normal"
              label="User name"
              onChange={handleChange}
              name="username"
              value={task.username}
              disabled={from === "add" ? false : true}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              label="Email Address"
              onChange={handleChange}
              name="email"
              value={task.email}
              disabled={from === "add" ? false : true}
              fullWidth
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <TextValidator
              className={classes.addTaskModalWidth}
              variant="outlined"
              fullWidth
              aria-label="empty textarea"
              multiline
              placeholder="Task"
              name="text"
              rows={12}
              value={task.text}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="outlined" color="primary">
                {texts.buttonText}
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
      {/* Alert modal window, No data available */}
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert severity={errorType}>{errorText}</Alert>
      </Snackbar>
    </Box>
  );
}
