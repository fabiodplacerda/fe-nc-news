import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import './Comment.css';
import moment from 'moment';
import { useState } from 'react';
import { deleteCommentById } from '../utils/utils';

const Comment = ({
  comment,
  setComments,
  setDeleted,
  setCommentCount,
  setError,
}) => {
  const date = comment.created_at;
  const formattedDate = moment(date).format('Do MMMM YYYY');

  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = () => {
    deleteCommentById(comment.comment_id)
      .then(() => {
        setError(false);
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setDeleted(true);
          setComments(currComments => {
            const filteredComments = currComments.filter(commentToFilter => {
              return commentToFilter.comment_id !== comment.comment_id;
            });
            return [...filteredComments];
          });
          setCommentCount(currCount => {
            return --currCount;
          });
          setTimeout(() => {
            setDeleted(false);
          }, 1500);
        }, 2000);
      })
      .catch(err => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  return (
    <>
      <li className="comment-container" key={comment.comment_id}>
        <div className="comment-header">
          <h4 className="comment-author">@{comment.author}</h4>
          <p className="comment-date">{formattedDate}</p>
        </div>
        <p className="comment-body">{comment.body}</p>
        <p className="comment-votes">Votes: {comment.votes}</p>
        {user === comment.author ? (
          <button onClick={deleteHandler} disabled={isLoading ? true : false}>
            {isLoading ? 'Deleting...' : 'Delete comment'}
          </button>
        ) : null}
      </li>
    </>
  );
};

export default Comment;
