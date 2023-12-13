import { useEffect, useState } from 'react';
import { getCommentsByArticleId } from '../utils/utils';

import Comment from './Comment';
import Loading from './Loading';
import CommentAdder from './CommentAdder';

const Comments = ({ article_id, setCommentCount }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article_id).then(data => {
      setComments(data.comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading dynamicText={'comments'} />;
  }

  if (!comments.length) {
    return <h3>No comments yet. Be the first to comment!</h3>;
  }

  return (
    <>
      <CommentAdder
        article_id={article_id}
        setComments={setComments}
        setCommentCount={setCommentCount}
      />
      <ul id="comments-list">
        {comments.map(comment => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </>
  );
};

export default Comments;
