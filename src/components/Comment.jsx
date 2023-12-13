import './Comment.css';
import moment from 'moment';

const Comment = ({ comment }) => {
  const date = comment.created_at;
  const formattedDate = moment(date).format('Do MMMM YYYY');

  return (
    <li className="comment-container" key={comment.comment_id}>
      <div className="comment-header">
        <h4 className="comment-author">@{comment.author}</h4>
        <p className="comment-date">{formattedDate}</p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </li>
  );
};

export default Comment;
