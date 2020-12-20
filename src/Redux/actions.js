import * as types from "./types";
import { Fetchs } from "../Common/helpers";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const setLogout = (update) => ({
  type: types.SET_LOGOUT,
  payload: update,
});

export const getTasks = (query) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(setLoading(true));
      await Fetchs("", query, "GET", null, (res) => {
        if (res.error || res.status === "error") reject(false);
        let action = {
          type: types.GET_TASKS,
          payload: res.message,
        };
        dispatch(action);
        dispatch(setLoading(false));
        resolve(true);
      });
    });
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(setLoading(true));
      await Fetchs("create", task, "POST", null, (res) => {
        if (res.error || res.status === "error") reject(false);
        dispatch(setLoading(false));
        resolve(true);
      });
    });
  };
};

export const editTask = (task, token) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(setLoading(true));
      await Fetchs(
        `edit/${task.id}`,
        {
          text: task.text,
          status: task.status,
          token,
        },
        "POST",
        null,
        (res) => {
          if (res.error || res.status === "error") reject("server_error");
          if (
            res.status &&
            res.status === "error" &&
            res.message.token === "Токен истёк"
          )
            reject("token_error");
          dispatch(setLoading(false));
          let action = {
            type: types.EDIT_TASK,
            payload: task,
          };
          dispatch(action);
          resolve("success");
        }
      );
    });
  };
};
