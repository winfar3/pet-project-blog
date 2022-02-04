import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./conponents/Header/Header";
import { Blog } from "./containers/Blog/Blog";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Footer } from "./conponents/Footer/Footer";

export function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* <Hero /> */}
        <div className="container">
          <div className="content-wrapper">
            <main className="main">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Blog />}
                />
                <Route 
                  exact
                  path="/login"
                  element={<LoginPage />}
                />
              </Routes>
            </main>
            {/* <Sidebar /> */}
          </div>
        </div>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
