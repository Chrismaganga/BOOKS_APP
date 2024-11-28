import Book from './Books';
import PropTypes from 'prop-types';

const Bookshelf = ({ title, books, onShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} onShelfChange={onShelfChange} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);
Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Bookshelf;

