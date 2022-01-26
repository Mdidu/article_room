import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";

const ArticleDetail = () => {
  const [renderedArticle, setRenderedArticle] = useState({});
  const { title, content, created_at, name } = renderedArticle;
  const { articleId } = useParams();
  const navigate = useNavigate();

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

  const updateArticle = () => {
    navigate(`/article/update/${articleId}`, { state: renderedArticle });
  };

  return (
    <div>
      <h1>{title}</h1>
      <p className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <p>{name}</p>
      <Moment format="DD/MM/YYYY hh:MM:mm">{created_at}</Moment>

      <Button onClick={updateArticle}>Modifier l'article</Button>
    </div>
  );
};

export default ArticleDetail;
