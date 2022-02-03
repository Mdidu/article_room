import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import EditorComponent from "../components/UI/EditorComponent";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ErrorMessage from "../components/UI/ErrorMessage";
import SelectTheme from "../components/UI/SelectTheme";
import { useNavigate } from "react-router-dom";
import articleService from "../services/article";
import FormField from "../components/UI/FormField";
import styles from "./NewArticle.module.css";

const NewArticle = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    // value du content via editor text
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const datas = await articleService.addArticle(data, content);

    const { msg, articleId } = await datas.json();

    if (!datas.ok) setError(msg);

    navigate(`/article/${articleId}`);
  };

  const titleValidator = { required: true, minLength: 8 };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className={styles.new_article_pages}>
      <h1>Add a article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          labelText="Title : "
          type="text"
          name="title"
          validator={titleValidator}
          register={register}
          error={errors.title}
          errorType={errors.title && errors.title.type}
        />

        <EditorComponent
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <div className={styles.new_article_select_component}>
          <SelectTheme register={register} />

          {errors.theme && <ErrorMessage type={errors.theme.type} />}
        </div>

        <Button type="submit" disabled={!isValid}>
          Valider
        </Button>

        {error && <ErrorMessage type="global" message={error.msg} />}
      </form>
    </div>
  );
};

export default NewArticle;
