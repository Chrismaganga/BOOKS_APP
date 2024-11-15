import  { useEffect, useState } from "react";

import Book from "./Book";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { search } from "../utils/BooksAPI";

const SearchInput = ({ booksOnShelves, onShelfChange }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchBooks = debounce(async () => {
      try {
        const data = await search(query, 20);
        // Merge books with their shelf information
        const updatedResults = data.map((book) => {
          const bookOnShelf = booksOnShelves.find((b) => b.id === book.id);
          return {
            ...book,
            shelf: bookOnShelf ? bookOnShelf.shelf : "none",
          };
        });
        setResults(updatedResults);
      } catch {
        setError("No books found.");
        setResults([]);
      }
    }, 500);

    fetchBooks();

    return () => {
      fetchBooks.cancel();
    };
  }, [query, booksOnShelves]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setError(null);
  };

  const handleShelfChange = (book, shelf) => {
    onShelfChange(book, shelf);
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search books..."
        />
      </div>
      <div className="search-results">
        {error && <p>{error}</p>}
        <ul>
          {results.length > 0 ? (
            results.map((book) => (
              <li key={book.id}>
                <Book book={book} onShelfChange={handleShelfChange} />
              </li>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  booksOnShelves: PropTypes.array.isRequired, 
  onShelfChange: PropTypes.func.isRequired,  
};

export default SearchInput;
