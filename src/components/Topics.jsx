import { useEffect } from 'react';
import { useState } from 'react';
import { getTopics } from '../utils/utils';
import { Link } from 'react-router-dom';

const Topics = ({ setIsLoading }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(topicsArray => {
      setTopics(topicsArray);
    });
  }, []);

  const clickHandler = () => {
    setIsLoading(true);
  };

  return (
    <ul className="topics">
      <Link to={'/articles'} className="topic-link" onClick={clickHandler}>
        All
      </Link>
      {topics.map(topic => {
        return (
          <Link
            className="topic-link"
            to={`/articles?topic=${topic.slug}`}
            key={topic.slug}
            onClick={clickHandler}
          >
            {topic.slug}
          </Link>
        );
      })}
    </ul>
  );
};

export default Topics;
