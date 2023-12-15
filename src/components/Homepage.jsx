import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { getUsers } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const Homepage = ({ setIsHomepage }) => {
  const { user, setUser } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsHomepage(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const inputHandler = event => {
    setInput(event.target.value);
    setErrorMessage(false);
  };

  const submitHandler = event => {
    setIsLoading(true);
    event.preventDefault();
    getUsers().then(({ users }) => {
      const username = users.map(userData => userData.username);
      if (username.includes(input)) {
        setUser(input);
        setTimeout(() => {
          navigate('/articles');
          setIsLoading(false);
        }, 1000);
      } else {
        setErrorMessage(true);
        setIsLoading(false);
      }
    });
    setInput('');
  };

  return (
    <div id="homepage">
      <div className="welcome-page-text">
        <h1>Welcome to NC News{user !== '' ? `, ${user}` : ''}</h1>
        <p>
          Discover and discuss the latest articles and join the conversation.
        </p>
      </div>

      <div className="login-container">
        <h2 className="welcome-user-text">Log In</h2>

        <form onSubmit={submitHandler} className="login-form">
          <label htmlFor="username">Username</label>

          <select
            name="username"
            id="username"
            value={input}
            onChange={inputHandler}
          >
            <option value="null">---</option>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
          </select>

          <p className="login-error-msg">
            {errorMessage ? 'Please select one of the valid users' : null}
          </p>
          <button disabled={isLoading ? true : false}>
            {isLoading ? 'Redirecting....' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
