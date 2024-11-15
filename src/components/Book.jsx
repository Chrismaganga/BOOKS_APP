import PropTypes from 'prop-types';

const Book = ({ book, onShelfChange }) => {
  // Fallbacks for missing data
  const {
    title = "No Title Available",
    authors = ["Unknown Author"],
    imageLinks = {},
    shelf = "none",
  } = book;

  const handleShelfChange = (event) => {
    const newShelf = event.target.value;
    onShelfChange(book, newShelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail || ""})`,
            backgroundColor: imageLinks.thumbnail ? "transparent" : "#d3d3d3",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleShelfChange}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book;

