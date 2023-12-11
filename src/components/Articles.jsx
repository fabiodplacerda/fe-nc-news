import { useEffect, useState } from "react";
import { getArticles } from "../utils/utils";

const Articles = () => {
  const [articles, SetArticles] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      SetArticles(data);
    });
  });

  return <h2>Articles</h2>;
};

export default Articles;
