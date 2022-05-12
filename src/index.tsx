import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";
import Token from "./routes/token";
import { client } from "./apollo";
import { Pages } from "./routes/pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":page" element={<Pages />}>
              <Route path=":token" element={<Token />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </ApolloProvider>
  </React.StrictMode>
);
