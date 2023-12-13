import { useEffect } from 'react';
import { useState } from 'react';
import { getTopics } from '../utils/utils';
import { Link } from 'react-router-dom';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(topicsArray => {
      setTopics(topicsArray);
    });
  }, []);

  return (
    <ul className="topics">
      <Link to={'/articles'} className="topic-link">
        all
      </Link>
      {topics.map(topic => {
        return (
          <Link
            className="topic-link"
            to={`/articles?topic=${topic.slug}`}
            key={topic.slug}
          >
            {topic.slug}
          </Link>
        );
      })}
    </ul>
  );
};

export default Topics;
