import React from "react";
import "./ShowListing.css";

export default function ShowListing({ title, thumbnail }) {
  return (
    <div className="listing-container">
      <img src={thumbnail} alt={`Thumbnail of ${title}`} />
      <h3>{title}</h3>
    </div>
  );
}
