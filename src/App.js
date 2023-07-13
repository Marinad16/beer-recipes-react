import {Routes, Route, BrowserRouter} from "react-router-dom";
import React from "react";
import Layout from "./layout";
import HomePage from "./pages/home/home";
import RecipePage from "./pages/recipe/recipe";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index path="/" element={<HomePage />} />
            <Route index path="/:id" element={<RecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

