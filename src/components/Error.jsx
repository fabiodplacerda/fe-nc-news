import { useNavigate, Link } from 'react-router-dom';

const Error = ({ message }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2>{message}</h2>
      <Link
        className="escape-link"
        to={'..'}
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go back
      </Link>
      <Link to={'/'} className="escape-link">
        Homepage
      </Link>
    </>
  );
};

export default Error;
