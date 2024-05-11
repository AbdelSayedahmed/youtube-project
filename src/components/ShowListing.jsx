import "./ShowListing.css";

export default function ShowListing({ show }) {
  const { title, thumbnail } = show;
  return (
    <div className="listing-container">
      <img src={thumbnail} alt={`Thumbnail of ${title}`} />
      <h3>{title}</h3>
    </div>
  );
}
