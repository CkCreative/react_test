import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Token from "../routes/token";
import { Pages } from "../routes/pages";

export function RoutesWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":page" element={<Pages />}>
            <Route path=":token" element={<Token />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
