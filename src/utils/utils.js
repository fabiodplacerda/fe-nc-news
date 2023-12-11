import axios from "axios";

const getArticles = () => {
  return axios
    .get("https://nc-news-kx4n.onrender.com/api/articles")
    .then(({ data }) => {
      return data.articles;
    });
};

export { getArticles };
