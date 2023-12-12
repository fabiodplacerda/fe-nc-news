import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/utils";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

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
