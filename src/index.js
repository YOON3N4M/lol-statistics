import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import Home from "./routes/Home";
import Summoners from "./routes/Summoners";
import rootReducer from "./modules/index";
import { composeWithDevTools } from "redux-devtools-extension";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL + "/"}`,
    element: <Home />,
  },
  {
    path: "summoners/kr/:summonersName",
    element: <Summoners />,
  },
]);
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
