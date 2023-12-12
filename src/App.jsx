import { Routes, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';
import Articles from './components/Articles';
import Header from './components/Header';
import Homepage from './components/Homepage';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
