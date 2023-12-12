import axios from "axios";

const getArticles = () => {
  return axios
    .get("https://nc-news-kx4n.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};

const getCommentsByArticleId = (article_id) => {
  return axios
    .get(
      `https://nc-news-kx4n.onrender.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data;
    });
};

export { getArticles, getCommentsByArticleId };
