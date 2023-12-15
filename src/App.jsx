import { Routes, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';
import Articles from './components/Articles';
import Header from './components/Header';
import Homepage from './components/Homepage';
import { UserProvider } from './contexts/userContext';
import Error from './components/Error';
import { useState } from 'react';

function App() {
  const [isHomepage, setIsHomepage] = useState(false);
  return (
    <UserProvider>
      {isHomepage ? null : <Header />}
      <Routes>
        <Route
          path="/"
          element={<Homepage setIsHomepage={setIsHomepage} />}
        ></Route>
        <Route
          path="/articles"
          element={<Articles setIsHomepage={setIsHomepage} />}
        ></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/*" element={<Error message={'Route not found!'} />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
