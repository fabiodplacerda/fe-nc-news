import { useEffect, useState } from 'react';
import { getArticles } from '../utils/utils';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Topics from './Topics';
import { useSearchParams } from 'react-router-dom';
import SortByForm from './SortByForm';

const Articles = () => {
  const [articles, SetArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('votes');
  const [order, setOrder] = useState('DESC');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('topic');

  useEffect(() => {
    getArticles(query, sort, order)
      .then(data => {
        SetArticles(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [query, sort, order]);

  if (isLoading) {
    return <Loading dynamicText={'articles'} />;
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
