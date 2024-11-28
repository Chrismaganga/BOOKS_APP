import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Books";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import * as BookAPI from "../utils/BookAPI";
import { FaArrowLeft } from "react-icons/fa";



const SearchPage = ({ booksOnShelves, onShelfChange }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchBooks = debounce(async () => {
      try {
        const data = await BookAPI.search(query, 20);
        if (data.error) {
          setError("No books found.");
          setResults([]);
        } else {
          // Filter books by name
          const filteredBooks = data.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          );
          // Merge books with their shelf information
          const updatedResults = filteredBooks.map((book) => {
            const bookOnShelf = booksOnShelves.find((b) => b.id === book.id);
            return {
              ...book,
              shelf: bookOnShelf ? bookOnShelf.shelf : "none",
            };
          });
          setResults(updatedResults);
          console.log(updatedResults);
        }
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
        <button className="close-search" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <input
          className="search-input"
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
            <p>search for results.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  booksOnShelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default SearchPage;
