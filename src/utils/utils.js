import axios from "axios";

const getArticles = () => {
    return axios
    .get("https://nc-news-kx4n.onrender.com/api/articles")
    .then(({ data }) => {
        return data.articles;
    });
};

const getArticleById = (id) => {
  return axios
    .get(`https://nc-news-kx4n.onrender.com/api/articles/${id}`)
    .then(({ data }) => {
      return data;
    });
};

export { getArticles, getArticleById };
