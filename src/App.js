import "./App.scss";

import { Header } from "./conponents/Header/Header";
import { Blog } from "./conponents/Blog/Blog";
import { Footer } from "./conponents/Footer/Footer";

export function App() {
  return (
    <div className="App">
      <Header />
      {/* <Hero /> */}
      <div className="container">
        <div className="content-wrapper">
          <main className="main">
            <Blog />
          </main>
          {/* <Sidebar /> */}
        </div>
      </div>
      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}