import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articleService from "../services/article";
import styles from "./Home.module.css";

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
    <div className={styles.home_pages}>
      <h1>Bienvenue !</h1>
      <div className={styles.home_article_list_block}>
        {renderedArticleList}
      </div>
    </div>
  );
};

export default Home;
