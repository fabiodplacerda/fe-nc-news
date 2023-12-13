import axios from 'axios';

const getArticles = query => {
  if (query) {
    return axios
      .get(`https://nc-news-kx4n.onrender.com/api/articles?topic=${query}`)
      .then(({ data }) => {
        return data.articles;
      });
  } else {
    return axios
      .get('https://nc-news-kx4n.onrender.com/api/articles')
      .then(({ data }) => {
        return data.articles;
      });
  }
};

const getArticleById = id => {
  return axios
    .get(`https://nc-news-kx4n.onrender.com/api/articles/${id}`)
    .then(({ data }) => {
      return data;
    });
};

const getCommentsByArticleId = article_id => {
  return axios
    .get(
      `https://nc-news-kx4n.onrender.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data;
    });
};

const patchArticleVotesBy = (id, vote) => {
  const patchBody = {
    inc_votes: vote,
  };
  return axios.patch(
    `https://nc-news-kx4n.onrender.com/api/articles/${id}`,
    patchBody
  );
};

const getUsers = () => {
  return axios
    .get('https://nc-news-kx4n.onrender.com/api/users')
    .then(({ data }) => {
      return data;
    });
};

const postComment = (article_id, username, body) => {
  const postBody = {
    username,
    body,
  };
  return axios
    .post(
      `https://nc-news-kx4n.onrender.com/api/articles/${article_id}/comments`,
      postBody
    )
    .then(({ data }) => {
      return data.comment;
    });
};

const getTopics = () => {
  return axios
    .get(`https://nc-news-kx4n.onrender.com/api/topics`)
    .then(({ data }) => {
      return data;
    });
};

export {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotesBy,
  getUsers,
  postComment,
  getTopics,
};
