import PropTypes from 'prop-types';

const Book = ({ book, onShelfChange }) => {
  const handleShelfChange = (event) => {
    const shelf = event.target.value;
    onShelfChange(book, shelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ backgroundImage: `url(${book.imageLinks?.thumbnail})` }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || 'none'}
            onChange={handleShelfChange}
          >
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
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book;


