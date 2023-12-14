import { useEffect, useState } from 'react';
import { getArticles } from '../utils/utils';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Topics from './Topics';
import { useSearchParams } from 'react-router-dom';

const Articles = () => {
  const [articles, SetArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('topic');

  useEffect(() => {
    getArticles(query)
      .then(data => {
        SetArticles(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [searchParams]);

  if (isLoading) {
    return <Loading dynamicText={'articles'} />;
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
