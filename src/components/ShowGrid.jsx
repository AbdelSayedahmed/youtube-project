import React from "react";
import { Link } from "react-router-dom";
import ShowListing from "./ShowListing";
import "./ShowGrid.css"

export default function ShowGrid({ items }) {
  return (
    <div className="shows-container">
      {items.map((item, i) => (
        <Link key={i} to={`/${item.videoId}`}>
          <ShowListing title={item.title} thumbnail={item.thumbnail} />
        </Link>
      ))}
    </div>
  );
}
