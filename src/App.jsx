import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About.jsx";
import Show from "./components/Show.jsx";
import Nav from "./components/Nav.jsx";
import Shows from "./components/Shows.jsx";
import Home from "./components/Home.jsx";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/:id" element={<Show />} />
        <Route
          path="/search/:query"
          element={<Shows setSearchTerm={setSearchTerm} />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
