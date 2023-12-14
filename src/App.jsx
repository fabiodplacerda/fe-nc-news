import { Routes, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';
import Articles from './components/Articles';
import Header from './components/Header';
import Homepage from './components/Homepage';
import { UserProvider } from './contexts/userContext';
import Error from './components/Error';

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/*" element={<Error message={'Route not found!'} />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
