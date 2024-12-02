import "./App.css";
import { getAll, search, update } from "./utils/BookAPI";
import { useEffect, useState } from "react";
import Bookshelf from "./components/Bookshelf";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Filter } from "./components/Filter";

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
 

  // Fetch books once on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAll();
      setBooks(books);
      };

    fetchBooks();
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
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
    <SearchPage
      booksOnShelves={books}
      onShelfChange={handleShelfChange}
      searchResults={searchResults}
      onSearch={handleSearch}
    />
            }
          />
          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Bookshelf
                    title="Currently Reading"
                    books={books.filter((book) => book.shelf === "currentlyReading")}
                    onShelfChange={handleShelfChange}
                  />
                  <Bookshelf
                    title="Want to Read"
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    onShelfChange={handleShelfChange}
                  />
                  <Bookshelf
                    title="Read"
                    books={books.filter((book) => book.shelf === "read")}
                    onShelfChange={handleShelfChange}
                  />
        
    
                </div>
              </div>
            }
          />
        </Routes>
        <Filter/>
        <Footer />
       
      </div>
    </Router>
  );
}

export default App;
