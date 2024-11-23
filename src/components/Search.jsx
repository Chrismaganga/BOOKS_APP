// import { useEffect, useState } from "react";
// import Book from "./Book";
// import PropTypes from "prop-types";
// import debounce from "lodash.debounce";
// import { search } from "../utils/BooksAPI";

// const Search = ({ booksOnShelves, onShelfChange }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setResults([]);
//       setError(null);
//       return;
//     }

//     const fetchBooks = debounce(async () => {
//       try {
//         const books = await search(query, 20);
//         console.log(books);
//         if (books.error) {
//           setError("No books found.");
//           setResults([]);
//         } else {
//           // Merge books with their shelf information
//           const updatedResults = books.map((book) => {
//             const bookOnShelf = booksOnShelves.find((b) => b.id === book.id);
//             return {
//               ...book,
//               shelf: bookOnShelf ? bookOnShelf.shelf : "none",
//             };
//           });
//           setResults(updatedResults);
//           console.log(updatedResults);
//           setError(null);
//         }
//       } catch {
//         setError("No books found.");
//         setResults([]);
//       }
//     }, 500);

//     fetchBooks();

//     return () => {
//       fetchBooks.cancel();
//     };
//   }, [query, booksOnShelves, results]); // Add booksOnShelves as a dependency

//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//     setError(null);
//   };

//   const handleShelfChange = (book, shelf) => {
//     onShelfChange(book, shelf);
//   };

//   return (
//     <div className="search-page">
//       <div className="search-bar">
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearchChange}
//           placeholder="Search books..."
//           onClick={()=> setResults([])}
//         />
//       </div>
//       <div className="search-results">
//         {error && <p>{error}</p>}
//         <ul>
//           {results.length > 0 ? (
//             results.map((book) => (
//               <li key={book.id}>
//                 <Book book={book} onShelfChange={handleShelfChange} />
//               </li>
//             ))
//           ) : (
//             !error && <p>No results found.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// Search.propTypes = {
//   booksOnShelves: PropTypes.array.isRequired,
//   onShelfChange: PropTypes.func.isRequired,
// };

// export default Search;
import { useEffect, useState } from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { search } from "../utils/BooksAPI";

const Search = ({ booksOnShelves, onShelfChange }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setError(null);
      return;
    }

    const fetchBooks = debounce(async () => {
      try {
        const books = await search(query, 20);
        if (books.error) {
          setError("No books found.");
          setResults([]);
        } else {
          // Merge books with their shelf information
          const updatedResults = books.map((book) => {
            const bookOnShelf = booksOnShelves.find((b) => b.id === book.id);
            return {
              ...book,
              shelf: bookOnShelf ? bookOnShelf.shelf : "none",
            };
          });
          setResults(updatedResults);
          setError(null);
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
  }, [query, booksOnShelves]); // Corrected dependency array

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
          onClick={() => setResults([])}
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
            !error && <p>No results found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

Search.propTypes = {
  booksOnShelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Search;
