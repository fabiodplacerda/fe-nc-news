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

  const changeHandler = event => {
    const sortingValues = event.target.value.split(',');

    setSearchParams({ sort_by: sortingValues[0], order: sortingValues[1] });
    setSort(sortingValues[0]);
    setOrder(sortingValues[1]);
  };

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
  }, [searchParams]);

  if (isLoading) {
    return <Loading dynamicText={'articles'} />;
  }

  return (
    <>
      <div id="articles">
        <h2>Articles</h2>
        <Topics setIsLoading={setIsLoading} />
        <form>
          <label htmlFor="">Sort by</label>
          <select onChange={changeHandler}>
            <option value="votes,DESC">Most Popular </option>
            <option value="created_at,DESC">Most Recent Articles</option>
            <option value="created_at,ASC">Oldest Articles</option>
            <option value="author,ASC">Author (Ascending)</option>
            <option value="author,DESC">Author (Descending)</option>
            <option value="title,ASC">Title (Ascending)</option>
            <option value="title,DESC">Title (Descending)</option>
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
