import "./App.scss";

import { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, unstable_HistoryRouter, useLocation, useNavigate, useParams } from "react-router-dom";

import { Header } from "./conponents/Header/Header";
import { Blog } from "./containers/Blog/Blog";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Footer } from "./conponents/Footer/Footer";
import { NotFoundPage } from "./containers/NotFoundPage/NotFoundPage";

export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    // <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
        {/* <Hero /> */}
        <div className="container">
          <div className="content-wrapper">
            <main className="main">
              <Routes>
                <Route
                  // exact
                  path="/blog"
                  element={ isLoggedIn ? <Blog /> : <Navigate to="/login" /> }
                />
                <Route 
                  // exact
                  path="/login"
                  element={isLoggedIn ? < Navigate to="/blog" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
                />
                <Route 
                  path="/"
                  element={ isLoggedIn ? <Navigate to="/blog" /> : <Navigate to="/login" /> }
                />
                <Route 
                  path="*"
                  element={ <NotFoundPage /> }
                />
              </Routes>
            </main>
            {/* <Sidebar /> */}
          </div>
        </div>
        {/* <Footer year={new Date().getFullYear()} /> */}
      </div>
    // </Router>
  );
}
