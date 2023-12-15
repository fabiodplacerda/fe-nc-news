import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3340',
    },
  },
});

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <div className="article-card">
        <h3 className="article-title">{article.title}</h3>
        <h4 className="article-topic">{article.topic}</h4>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-card-img"
        />
        <div className="votes-comments-container">
          <ThumbUpAltIcon
            sx={{ color: theme.palette.primary.main }}
          ></ThumbUpAltIcon>
          <p>{article.votes}</p>

          <ChatBubbleIcon
            sx={{ color: theme.palette.primary.main }}
            id="comment-icon"
          ></ChatBubbleIcon>
          <p>{article.comment_count}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
