import * as type from "./types";

const defaultState = {
  loading: false,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  tasks: {
    total_task_count: 0,
    tasks: [],
  },
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case type.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case type.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case type.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case type.ADD_TASK:
      return {
        ...state,
        tasks: {
          total_task_count: state.tasks.total_task_count + 1,
          tasks: [...state.tasks.tasks, action.payload],
        },
      };
    case type.EDIT_TASK:
      return {
        ...state,
        tasks: {
          total_task_count: state.tasks.total_task_count,
          tasks: state.tasks.tasks.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        },
      };
    default:
      return state;
  }
};
