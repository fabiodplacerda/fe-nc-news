import "./ArticleCard.css";
const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h3 className="article-title">{article.title}</h3>
      <h4>{article.topic}</h4>
      <img src={article.article_img_url} alt="" className="article-card-img" />
      <p>votes: {article.votes}</p>
      <p>comments: {article.comment_count}</p>
    </div>
  );
};

export default ArticleCard;
