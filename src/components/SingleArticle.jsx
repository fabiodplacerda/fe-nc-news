import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/utils";
import "./SingleArticle.css";
import moment from "moment";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
    });
  }, []);

  const date = article.created_at;
  const formattedDate = moment(date).format("Do MMMM YYYY");

  return (
    <div id="single-article">
      <div id="article-header">
        <h2 id="article-title">
          {article.title}
          <span id="article-topic">{article.topic}</span>
        </h2>
        <div id="article-info">
          <h3 id="article-author">@{article.author}</h3>
          <p id="article-created-at">{formattedDate}</p>
        </div>
      </div>

      <img src={article.article_img_url} alt="" id="article-img" />
      <p id="article-body">{article.body}</p>
      <div id="votes-comments-container">
        <p id="votes">Votes: {article.votes}</p>
        <p id="comments">Comments: {article.comment_count}</p>
      </div>
    </div>
  );
};

export default SingleArticle;
