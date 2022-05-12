import React from "react";
import ReactDOM from "react-dom/client";

import { RoutesWrapper } from "./components/RouteWrapper";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoutesWrapper />
  </React.StrictMode>
);
