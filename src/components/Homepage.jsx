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

        <p>{errorMessage ? 'Please Select one of the valid users' : null}</p>
        <button>Login</button>
      </form>
    </>
  );
};

export default Homepage;
