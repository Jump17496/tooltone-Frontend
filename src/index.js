import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import MyRoute from "./MyRoute";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReduer from "./components/reducers/index";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReduer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MyRoute />
  </Provider>
);

