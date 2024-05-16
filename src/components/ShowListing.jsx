import React from "react";
import "./ShowListing.css";
import decoder from "../utils/decoder";

export default function ShowListing({ title, thumbnail }) {
  return (
    <div className="listing-container">
      <img src={thumbnail} alt={`Thumbnail of ${title}`} />
      <h3>{decoder(title)}</h3>
    </div>
  );
}
