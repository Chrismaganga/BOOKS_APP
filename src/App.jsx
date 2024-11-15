import './App.css';

import { getAll, search, update } from './BooksAPI';
import { useEffect, useState } from 'react';

import Bookshelf from './Bookshelf';
import SearchPage from './SearchPage';

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAll().then((books) => setBooks(books));
  }, []);

  const handleShelfChange = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      setBooks((prevBooks) =>
        prevBooks.filter((b) => b.id !== book.id).concat(book)
      );
    });
  };

  const handleSearch = (query) => {
    if (query) {
      search(query).then((results) => setSearchResults(results));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          searchResults={searchResults}
          onShelfChange={handleShelfChange}
          onSearch={handleSearch}
          onCloseSearch={() => setShowSearchPage(false)}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf
              title="Currently Reading"
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              onShelfChange={handleShelfChange}
            />
            <Bookshelf
              title="Want to Read"
              books={books.filter((book) => book.shelf === 'wantToRead')}
              onShelfChange={handleShelfChange}
            />
            <Bookshelf
              title="Read"
              books={books.filter((book) => book.shelf === 'read')}
              onShelfChange={handleShelfChange}
            />
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
