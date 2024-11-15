import Book from './Book';
import PropTypes from 'prop-types';
import  { useState } from 'react';

const SearchPage = ({ searchResults, onShelfChange, onSearch, onCloseSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={onCloseSearch}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
SearchPage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onCloseSearch: PropTypes.func.isRequired,
};

export default SearchPage;

