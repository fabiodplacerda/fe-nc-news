import { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { postComment } from '../utils/utils';

const CommentAdder = ({ article_id, setComments }) => {
  console.log(article_id);
  const { user } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState('');

  const inputHandler = event => {
    setCommentInput(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    postComment(article_id, user, commentInput).then(({ data }) => {
      console.log(data);
      setComments(currComments => {
        return [data.comment, ...currComments];
      });
    });
    setCommentInput('');
  };

  //   if (user !== '') {
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
      <button>Post comment</button>
    </form>
  );
  //   } else {
  //     return (
  //       <h3 id="comment-adder-msg">
  //         User is not logged in. Please login to add a comment.
  //       </h3>
  //     );
  //   }
};

export default CommentAdder;
