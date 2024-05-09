import React from "react";
import "./Filter.css";

export default function Filter({ handleFilter }) {
  return (
    <input
      id="filter-input"
      type="text"
      placeholder="Search"
      onChange={(e) => handleFilter(e.target.value)}
    />
  );
}
