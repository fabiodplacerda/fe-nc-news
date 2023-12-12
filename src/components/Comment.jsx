import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <li className="comment-container" key={comment.comment_id}>
      <div className="comment-header">
        <h4 className="comment-author">@{comment.author}</h4>
        <p className="comment-date">{comment.created_at}</p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </li>
  );
};

export default Comment;
