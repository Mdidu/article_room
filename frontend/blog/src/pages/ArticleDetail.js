import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import articleService from "../services/article";
import styles from "./ArticleDetail.module.css";
import {
  faArrowAltCircleLeft,
  faEdit,
} from "@fortawesome/free-regular-svg-icons";

const ArticleDetail = () => {
  const [renderedArticle, setRenderedArticle] = useState({});
  const { title, content, created_at, name } = renderedArticle;
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const datas = await articleService.findOneById(articleId);
      setRenderedArticle(await datas.json());
    })();
  }, [articleId]);

  const previousPage = () => {
    navigate(-1);
  };

  const updateArticle = () => {
    navigate(`/article/update/${articleId}`, { state: renderedArticle });
  };

  return (
    <div className={styles.article_detail_pages}>
      <h1>{title}</h1>
      <p className={styles.article_detail_date_theme}>
        <Moment format="DD/MM/YYYY hh:MM:mm">{created_at}</Moment><span>-</span>
        <span>{name}</span>
      </p>
      <p className="content" dangerouslySetInnerHTML={{ __html: content }} />

      <div className={styles.article_detail_button_block}>
        <Button onClick={previousPage}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          <span className={styles.all_theme_button_txt}>Previous page</span>
        </Button>
        <Button onClick={updateArticle}>
          <FontAwesomeIcon icon={faEdit} />
          <span className={styles.all_theme_button_txt}>Edit article</span>
        </Button>
      </div>
    </div>
  );
};

export default ArticleDetail;
