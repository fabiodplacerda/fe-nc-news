import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { getUsers } from '../utils/utils';

const Homepage = () => {
  const { user, setUser } = useContext(UserContext);

  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
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
    event.preventDefault();
    getUsers().then(({ users }) => {
      const username = users.map(userData => userData.username);
      if (username.includes(input)) {
        setUser(input);
      } else {
        setErrorMessage(true);
      }
    });
    setInput('');
  };

  return (
    <>
      <h2>Welcome{user !== '' ? ` ${user}` : ''}!</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="your username"
          onChange={inputHandler}
          value={input}
        />
        <p>{errorMessage ? "user doesn't exist" : null}</p>
        <button>Login</button>
      </form>
    </>
  );
};

export default Homepage;
