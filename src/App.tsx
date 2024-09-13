import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<div>Hello World</div>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
