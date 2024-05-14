import { useState } from "react";
import "./Comments.css";

export default function Comments() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && comment) {
      const newComment = { name, comment };
      setCommentsList([...commentsList, newComment]);
      setComment("");
      setName("");
    }
    console.log("Comment submitted:", comment);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          rows="4"
        />
        <button type="submit">Submit</button>
      </form>
      {/* when i write */}
      <div>
        {commentsList.map((item, index) => (
          <div key={index} className="comment">
            <p>
              <strong>{item.name}</strong>: {item.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
