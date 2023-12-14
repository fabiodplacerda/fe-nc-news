import { useEffect, useState } from 'react';
import { getArticles } from '../utils/utils';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Topics from './Topics';
import { useSearchParams } from 'react-router-dom';
import Error from './Error';

const Articles = () => {
  const [articles, SetArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('topic');

  useEffect(() => {
    getArticles(query)
      .then(data => {
        SetArticles(data);
        setIsLoading(false);
        setPageError(false);
      })
      .catch(({ data, status }) => {
        setErrorCode(status);
        setErrorMsg(data.msg);
        setPageError(true);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return <Loading dynamicText={'articles'} />;
  }
  if (pageError) {
    return <Error message={`${errorCode}: ${errorMsg}`} />;
  }

  return (
    <>
      <div id="articles">
        <h2>Articles</h2>
        <Topics setIsLoading={setIsLoading} />
        <ul id="articles-list">
          {articles.map(article => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default Articles;
