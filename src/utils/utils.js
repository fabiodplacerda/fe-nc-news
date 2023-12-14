import axios from 'axios';

const getArticles = (query, sort_by, order) => {
  // console.log(sort_by);

  return axios
    .get('https://nc-news-kx4n.onrender.com/api/articles', {
      params: {
        topic: query,
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
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

const deleteCommentById = id => {
  return axios.delete(`https://nc-news-kx4n.onrender.com/api/comments/${id}`);
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
  deleteCommentById,
  getTopics,
};
