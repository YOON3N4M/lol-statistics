import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL + "/"}`,
    element: <Home />,
  },
  {
    path: "/:id",
    element: null,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
