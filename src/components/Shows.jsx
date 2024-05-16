import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchVideos } from "../utils/fetch.js";
import ShowGrid from "./ShowGrid";

export default function Shows({ setSearchTerm }) {
  const [items, setItems] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    searchVideos(search)
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("Error searching videos:", error));
    return () => {
      setSearchTerm("");

      
    };
  }, [search]);

  return <ShowGrid items={items} />;
}
