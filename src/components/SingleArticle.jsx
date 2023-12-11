import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./utils/utils";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
    });
  }, []);

  const date = new Date(article.created_at);

  console.log(date);
  return (
    <div id="single-article">
      <h2>{article.title}</h2>
      <h3>{article.topic}</h3>
      <h3>{article.author}</h3>
      <p>{article.created_at}</p>
      <img src={article.article_img_url} alt="" />
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </div>
  );
};

export default SingleArticle;
