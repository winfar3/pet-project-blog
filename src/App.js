import "./App.scss";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Header } from "./conponents/Header/Header";
import { Blog } from "./containers/Blog/Blog";
import { PostPage } from "./containers/Blog/components/PostPage/PostPage";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { PrivateRoute } from "./conponents/PrivateRoute/PrivateRoute";
import { Footer } from "./conponents/Footer/Footer";
import { NotFoundPage } from "./containers/NotFoundPage/NotFoundPage";
import { PublicRoute } from "./conponents/PublicRoute/PublicRoute";
import { PostCard } from "./containers/Blog/components/PostCard/PostCard";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  return (
    // <Router>
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
      />
      {/* <Hero /> */}
      <div className="container">
        <div className="content-wrapper">
          <main className="main">
            <Routes>
              <Route 
                path="/blog/:postId"
                element={ 
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <PostPage 
                      isAdmin={isAdmin}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Blog 
                      isAdmin={isAdmin}
                    />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/login"
                element={
                  <PublicRoute isLoggedIn={isLoggedIn}>
                    <LoginPage 
                      setIsLoggedIn={setIsLoggedIn} 
                      setUserName={setUserName}
                      setIsAdmin={setIsAdmin}
                    />
                  </PublicRoute>
                }
              />
              <Route 
                path="/404"
                element={ <NotFoundPage /> }
              />
              <Route 
                  path="/"
                  element={ isLoggedIn ? <Navigate to="/blog" /> : <Navigate to="/login" /> }
                />
              <Route 
                  path="*"
                  element={ <Navigate to="/404" /> }
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
