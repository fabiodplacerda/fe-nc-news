import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, patchArticleVotesBy } from '../utils/utils';
import './SingleArticle.css';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then(data => {
      setArticle(data.article);
      setIsLoading(false);
    });
  }, []);

  // patchArticleVotesBy(article_id);

  const date = article.created_at;
  const formattedDate = moment(date).format('Do MMMM YYYY');

  if (isLoading) {
    return <p>Fetching Articles...</p>;
  }

  const upVote = event => {
    console.log(event);
    patchArticleVotesBy(article_id, +1);
    setArticle(currArticle => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
  };
  const downVote = () => {
    patchArticleVotesBy(article_id, -1);
    setArticle(currArticle => {
      return { ...currArticle, votes: currArticle.votes - 1 };
    });
  };

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
        <div className="votes">
          <ThumbUpAltIcon
            onClick={() => {
              upVote();
            }}
          />
          <ThumbDownIcon
            onClick={() => {
              downVote();
            }}
          />
          <p>{article.votes}</p>
        </div>
        <p id="comments">Comments: {article.comment_count}</p>
      </div>
    </div>
  );
};

export default SingleArticle;
