import { Routes, Route } from "react-router-dom";
import SingleArticle from "./components/SingleArticle";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
