import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const [renderedArticle, setRenderedArticle] = useState({});
  const { id, title, content, theme_id, created_at, name } = renderedArticle;
  const { articleId } = useParams();

  useEffect(() => {
    (async () => {
      const datas = await fetch(`http://localhost:8080/article/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setRenderedArticle(await datas.json());
    })();
  }, [articleId]);

  return (
    <div>
      <h1>{title}</h1>
      <p className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <p>{name}</p>
      <Moment format="DD/MM/YYYY hh:MM:mm">{created_at}</Moment>
    </div>
  );
};

export default ArticleDetail;
