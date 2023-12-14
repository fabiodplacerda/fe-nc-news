import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, patchArticleVotesBy } from '../utils/utils';
import './SingleArticle.css';
import moment from 'moment';
import Comments from './Comments';
import Loading from './Loading';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Error from './Error';

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPageError, setIsPageError] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getArticleById(article_id)
      .then(data => {
        setArticle(data.article);
        setCommentCount(data.article.comment_count);
        setIsLoading(false);
        setIsPageError(false);
      })
      .catch(({ data, status }) => {
        setIsLoading(false);
        setIsPageError(true);
        setErrorCode(status);
        setErrorMsg(data.msg);
      });
  }, []);

  const date = article.created_at;
  const formattedDate = moment(date).format('Do MMMM YYYY');

  if (isLoading) {
    return <Loading dynamicText={'article'} />;
  }

  const upVote = event => {
    patchArticleVotesBy(article_id, +1).catch(err => {
      setError(true);
    });
    setArticle(currArticle => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
    setError(false);
  };
  const downVote = () => {
    patchArticleVotesBy(article_id, -1).catch(err => {
      setError(true);
    });
    setArticle(currArticle => {
      return { ...currArticle, votes: currArticle.votes - 1 };
    });
    setError(false);
  };

  if (isPageError) {
    return <Error message={`${errorCode}: ${errorMsg}`} />;
  }

  return (
    <>
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

        <img
          src={article.article_img_url}
          alt={article.title}
          id="article-img"
        />
        <p id="article-body">{article.body}</p>
        <div id="votes-comments-container">
          <div className="votes">
            <ThumbUpAltIcon
              onClick={() => {
                upVote();
              }}
              className="vote-btn"
            />
            <ThumbDownIcon
              onClick={() => {
                downVote();
              }}
              className="vote-btn"
            />
            <p>{article.votes}</p>
          </div>
          <p className="error-msg">
            {error ? 'Something went wrong, Please try again!' : null}
          </p>
          <a href="#comments-list" id="comments">
            Comments: {commentCount}
          </a>
        </div>
      </div>

      <Comments article_id={article_id} setCommentCount={setCommentCount} />
    </>
  );
};

export default SingleArticle;
