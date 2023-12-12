import Articles from "./components/Articles";
import Comments from "./components/Comments";
import Header from "./components/Header";
import Homepage from "./components/Homepage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route
          path="/articles/:article_id/comments"
          element={<Comments />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
