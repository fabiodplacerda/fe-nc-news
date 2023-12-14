import axios from 'axios';

const ncNewApi = axios.create({
  baseURL: 'https://nc-news-kx4n.onrender.com/api',
});

const getArticles = (query, sort_by, order) => {
  return ncNewApi
    .get('/articles', {
      params: {
        topic: query,
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch(({ response }) => {
      return Promise.reject(response);
    });
};

const getArticleById = id => {
  return ncNewApi
    .get(`/articles/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return Promise.reject(response);
    });
};

const getCommentsByArticleId = article_id => {
  return ncNewApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

const patchArticleVotesBy = (id, vote) => {
  const patchBody = {
    inc_votes: vote,
  };
  return ncNewApi.patch(`/articles/${id}`, patchBody);
};

const getUsers = () => {
  return ncNewApi.get('/users').then(({ data }) => {
    return data;
  });
};

const postComment = (article_id, username, body) => {
  const postBody = {
    username,
    body,
  };
  return ncNewApi
    .post(`/articles/${article_id}/comments`, postBody)
    .then(({ data }) => {
      return data.comment;
    });
};

const deleteCommentById = id => {
  return ncNewApi.delete(`/comments/${id}`);
};

const getTopics = () => {
  return ncNewApi.get(`/topics`).then(({ data }) => {
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
