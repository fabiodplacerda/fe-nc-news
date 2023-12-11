import { useEffect, useState } from "react";
import { getArticles } from "../utils/utils";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  const [articles, SetArticles] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      SetArticles(data);
    });
  });

  return (
    <>
      <div id="articles">
        <h2>Articles</h2>
        <ul id="articles-list">
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default Articles;
