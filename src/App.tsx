import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Page404 from "./pages/404NotFound/page404";
import Main from "./pages/Main"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/stocks" />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/stocks" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
