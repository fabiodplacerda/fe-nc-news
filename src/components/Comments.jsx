import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/utils";

import Comment from "./Comment";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((data) => {
      setComments(data.comments);
    });
  }, []);

  return (
    <ul>
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
};

export default Comments;
