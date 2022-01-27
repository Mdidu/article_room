import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleService from "../services/article";

const Home = () => {
  const [renderedArticleList, setArticleList] = useState();

  useEffect(() => {
    (async () => {
      const datas = await articleService.findAll();

      setArticleList(
        (await datas.json()).map((article) => (
          <div key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </div>
        ))
      );
    })();
  }, []);

  return (
    <div>
      <h1>Bienvenue !</h1>
      {renderedArticleList}
    </div>
  );
};

export default Home;
