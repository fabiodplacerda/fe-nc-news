import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { useContext } from 'react';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <h1>NC NEWS</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </nav>
    </header>
  );
};

export default Header;
