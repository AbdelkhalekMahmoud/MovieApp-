import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "./component/Header/header";
import Home from "./pages/Home/home";
import Login from "./pages/login/login";
import Reg from "./pages/reg/reg";
import Movies from "./pages/Movies/Movies";
import MoviesDetails from "./pages/Movies/MovieDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoriteMovie from "./pages/Movies/FavoriteMovie";
import NotFound from "./pages/NotFound/NotFound";
import { Provider } from "react-redux";
import Store from "./Store/strore";
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <div className="app-wrapper">
          <Head />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reg" element={<Reg />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/movieD/:id" element={<MoviesDetails />} />
              <Route path="/Fav" element={<FavoriteMovie />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
