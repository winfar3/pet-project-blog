import "./App.scss";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, unstable_HistoryRouter, useLocation, useNavigate, useParams } from "react-router-dom";

import { Header } from "./conponents/Header/Header";
import { Blog } from "./containers/Blog/Blog";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Footer } from "./conponents/Footer/Footer";

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
                  path="/"
                  element={<Blog />}
                />
                <Route 
                  // exact
                  path="/login"
                  element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
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
