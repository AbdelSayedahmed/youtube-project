import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filter.css";

export default function Filter({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Search.."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
