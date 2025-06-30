import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import WatchList from "./components/WatchList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((respone) => respone.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchList = (movieid) => {
    setWatchList((prev) =>
      prev.includes(movieid)
        ? prev.filter((id) => id !== movieid)
        : [...prev, movieid]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/WatchList">WatchList</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>
            <Route
              path="/WatchList"
              element={
                <WatchList
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
