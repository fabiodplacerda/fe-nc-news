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
    setIsLoading(true);
    postComment(article_id, user, commentInput)
      .then(newComment => {
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
        setIsLoading(false);
      });

    setCommentInput('');
  };

  if (user !== '') {
    return (
      <>
        <form id="comment-form" onSubmit={submitHandler}>
          <textarea
            name=""
            id=""
            cols="100"
            rows="10"
            required
            minLength="5"
            onChange={inputHandler}
            value={commentInput}
          ></textarea>
          <p>{commentInput.length} of 300 max characters</p>
          {commentInput.length > 300 ? (
            <p className="error-msg">This comment is too long!</p>
          ) : null}
          <button
            disabled={isLoading || commentInput.length > 300 ? true : false}
          >
            {isLoading ? 'Posting...' : 'Post comment'}
          </button>
          {success ? (
            <p className="success-msg">comment successfully posted</p>
          ) : null}
          {error ? (
            <p className="error-msg">something went wrong, please try again</p>
          ) : null}
        </form>
      </>
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
