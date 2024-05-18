import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { decoder, getVideoDetails } from "../utils/fetch";
import Comments from "./Comments.jsx";
import "./Show.css";

export default function Show() {
  const { id: videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    function fetchVideo() {
      setLoading(true);
      setError(null);

      getVideoDetails(videoId)
        .then((videoDetails) => {
          setVideo(videoDetails);
        })
        .catch((err) => {
          setError("Failed to fetch video details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchVideo();
  }, [videoId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!video) return <div>No video found.</div>;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="video-container">
      <h1>{decoder(video.title)}</h1>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
        ></iframe>
      </div>
      <div className="video-stats">
        <span>
          <strong>Views:</strong> {decoder(video.statistics.viewCount)}
        </span>
        <span>
          <strong>Likes:</strong> {decoder(video.statistics.likeCount)}
        </span>
        <br />
        <span>
          <strong>Published on:</strong>{" "}
          {new Date(video.publishedAt).toLocaleDateString()}
        </span>
      </div>
      <p>
        <strong>Description</strong>
        <br />
        {showFullDescription
          ? decoder(video.description)
          : `${decoder(video.description).slice(0, 100)}...`}
        <button onClick={toggleDescription} className="toggle-description-btn">
          {showFullDescription ? "Show Less" : "Show More..."}
        </button>
      </p>
      <Comments />
    </div>
  );
}
