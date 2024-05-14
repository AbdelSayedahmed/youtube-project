import React, { useState, useEffect } from "react";
import { getVideoDetails } from "../utils/fetch";
import "./Show.css";

export default function Show({ videoId }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      setError(null);
      try {
        const videoDetails = await getVideoDetails(videoId);
        setVideo(videoDetails);
      } catch (err) {
        setError("Failed to fetch video details.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return <div>No video found.</div>;
  }

  return (
    <div className="video-container">
      <h1>{video.title}</h1>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
        ></iframe>
      </div>
      <p>{video.description}</p>
      <div className="video-stats">
        <span>Views: {video.statistics.viewCount}</span>
        <span>Likes: {video.statistics.likeCount}</span>
        <span>Comments: {video.statistics.commentCount}</span>
      </div>
      <p>Published on: {new Date(video.publishedAt).toLocaleDateString()}</p>
    </div>
  );
}
