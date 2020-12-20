import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main/main";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./Redux/reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
