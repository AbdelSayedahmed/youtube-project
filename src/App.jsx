import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "/src/components/About.jsx";
import Home from "/src/components/Home.jsx";
import Show from "/src/components/Show.jsx";
import Nav from "/src/components/Nav.jsx";
import Shows from "/src/components/Shows.jsx";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  function handleFilter(input) {
    setSearch(input);
  }

  return (
    <>
      <Nav handleFilter={handleFilter} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:search" element={<Shows />} />
        <Route path="/home/:search/:id" element={<Show />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
