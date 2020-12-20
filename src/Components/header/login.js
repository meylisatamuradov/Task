import React, { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Box,
  Dialog,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Fetchs } from "../../Common/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setLogout } from "../../Redux/actions";
import { useStyles } from "./useStyles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// Alert Modal window
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  //  Alert Modal window: state
  const [error, setError] = useState(false); // state no date
  const [errorText, setErrorText] = useState(""); // state no date
  const [errorType, setErrorType] = useState("error"); // state no date

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { isLoggedIn } = useSelector((state) => state);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (isLoggedIn) {
      localStorage.clear();
      setOpen(false);
      dispatch(setLogout(false));
      setForm({
        username: "",
        password: "",
      });
    } else {
      if (form.username.length > 0 && form.password.length > 0) {
        setOpen(false);
        dispatch(setLoading(true));
        // Request to server
        await Fetchs("login", form, "POST", null, (res) => {
          dispatch(setLoading(false));
          if (res.status === "ok") {
            localStorage.setItem("token", res.message.token);
            dispatch(setLogout(true));

            setError(true); // Modal window for successful request
            setErrorText("Login success");
            setErrorType("success");
          } else {
            setOpen(true);
            setError(true); // Modal, request not successful
            setErrorText("Login failed");
            setErrorType("error");
          }
        });
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box className={classes.login}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {isLoggedIn ? "Log out" : "Log in"}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <ValidatorForm
          inpuRef="form"
          onSubmit={handleSubmit}
          onError={(errors) => console.log("Error", errors)}
        >
          <DialogTitle id="form-dialog-title">
            {isLoggedIn ? "Do you relly want to log out?" : "Sign in"}
          </DialogTitle>
          <DialogContent>
            {!isLoggedIn ? (
              <>
                <TextValidator
                  autoFocus
                  margin="dense"
                  name="username"
                  label="Username"
                  type="text"
                  value={form.username}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                  onChange={handleChange}
                />
                <TextValidator
                  autoFocus
                  margin="dense"
                  name="password"
                  label="Password"
                  type="password"
                  value={form.password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                  onChange={handleChange}
                />
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="outlined">
              {isLoggedIn ? "Log out" : "log in"}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>

      {/* Alert modal window, No data available */}
      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
      >
        <Alert severity={errorType}>{errorText}</Alert>
      </Snackbar>
    </Box>
  );
}
