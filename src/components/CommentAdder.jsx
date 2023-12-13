import { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { postComment } from '../utils/utils';

const CommentAdder = ({ article_id, setComments, setCommentCount }) => {
  const { user } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputHandler = event => {
    setCommentInput(event.target.value);
    setError(false);
    setSuccess(false);
  };

  const submitHandler = event => {
    event.preventDefault();
    postComment(article_id, user, commentInput)
      .then(newComment => {
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          setCommentCount(currCount => {
            return ++currCount;
          });
          setComments(currComments => {
            return [newComment, ...currComments];
          });
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }, 1000);
      })
      .catch(err => {
        setError(true);
      });

    setCommentInput('');
  };

  if (user !== '') {
    return (
      <form id="comment-form" onSubmit={submitHandler}>
        <textarea
          name=""
          id=""
          cols="100"
          rows="10"
          required
          minLength="5"
          maxLength="400"
          onChange={inputHandler}
          value={commentInput}
        ></textarea>
        <button disabled={isLoading ? true : false}>
          {isLoading ? 'Posting...' : 'Post comment'}
        </button>
        <p className="success-msg">
          {success ? 'comment successfully posted' : null}
        </p>
        <p className="error-msg">
          {error ? 'something went wrong, please try again' : null}
        </p>
      </form>
    );
  } else {
    return (
      <h3 id="comment-adder-msg">
        User is not logged in. Please login to add a comment.
      </h3>
    );
  }
};

export default CommentAdder;
