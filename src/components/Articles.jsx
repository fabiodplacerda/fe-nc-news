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

  const [sort, setSort] = useState('');

  const changeHandler = event => {
    setSearchParams({ sort: event.target.value });
    setSort(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('topic');

  useEffect(() => {
    getArticles(query, sort)
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
        <Topics />
        <form>
          <label htmlFor="">Sort by</label>
          <select onChange={changeHandler} value={sort}>
            <option value="">Select an option</option>
            <option value="votes&order=DESC">Most Popular</option>
            <option value="created_at&order=ASC">Most Recent Articles</option>
            <option value="created_at&order=DESC">Oldest Articles</option>
            <option value="author&order=ASC">Author (Ascending)</option>
            <option value="author&order=DESC">Author (Descending)</option>
            <option value="title&order=ASC">Title (Ascending)</option>
            <option value="title&order=DESC">Title (Descending)</option>
          </select>
        </form>
        {/* <SortByForm /> */}
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
