import React, { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import EditorComponent from "../components/UI/EditorComponent";
import ErrorMessage from "../components/UI/ErrorMessage";
import SelectTheme from "../components/UI/SelectTheme";
import Button from "../components/UI/Button";
import articleService from "../services/article";
import styles from "./UpdateArticle.module.css";
import FormField from "../components/UI/FormField";

const UpdateArticle = () => {
  const { state } = useLocation();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const blocksFromHtml = htmlToDraft(state.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const titleValidator = { required: true, minLength: 8 };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = async (data) => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const datas = await articleService.updateArticle(state.id, data, content);

    const { msg, articleId } = await datas.json();

    if (!datas.ok) setError(msg);

    navigate(`/article/${articleId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        labelText="Title : "
        type="text"
        name="title"
        defaultValue={state.title}
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
        <SelectTheme register={register} name={state.name} />

        {errors.theme && <ErrorMessage type={errors.theme.type} />}
      </div>

      <Button type="submit" disabled={!isValid}>
        Valider
      </Button>

      {error && <ErrorMessage type="global" message={error.msg} />}
    </form>
  );
};

export default UpdateArticle;
