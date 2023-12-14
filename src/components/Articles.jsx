import { useEffect, useState } from 'react';
import { getArticles } from '../utils/utils';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Topics from './Topics';
import { useSearchParams } from 'react-router-dom';
import Error from './Error';
import SortByForm from './SortByForm';

const Articles = () => {
  const [articles, SetArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const [sort, setSort] = useState('votes');
  const [order, setOrder] = useState('DESC');
  const [searchParams, setSearchParams] = useSearchParams();

  const validSortBy = ['votes', 'created_at', 'author', 'title', null];
  const validOrderBy = ['ASC', 'DESC', null];

  const sortBySearchParam = searchParams.get('sort_by');
  const orderBySearchParam = searchParams.get('order');

  const query = searchParams.get('topic');

  useEffect(() => {
    if (
      !validSortBy.includes(sortBySearchParam) ||
      !validOrderBy.includes(orderBySearchParam)
    ) {
      setIsLoading(false);
      setPageError(true);
      setErrorCode(400);
      setErrorMsg('Bad request');
      return;
    }
    getArticles(query, sort, order)
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
  }, [query, sort, order]);

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
        <SortByForm
          setSort={setSort}
          setOrder={setOrder}
          setSearchParams={setSearchParams}
          query={query}
        />
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
