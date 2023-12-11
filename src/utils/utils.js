import axios from "axios";

const getArticleById = (id) => {
  return axios
    .get(`https://nc-news-kx4n.onrender.com/api/articles/${id}`)
    .then(({ data }) => {
      return data;
    });
};

export { getArticleById };
