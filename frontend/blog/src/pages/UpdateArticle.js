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
    console.log("aaa", data, content);

    const datas = await fetch(`http://localhost:8080/article/${state.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        content,
        themeId: +data.theme,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const { msg, articleId } = await datas.json();

    if (!datas.ok) setError(msg);

    navigate(`/article/${articleId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={state.title}
          {...register("title", titleValidator)}
        />
        {errors.title && <ErrorMessage type={errors.title.type} />}
      </div>

      <EditorComponent
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />

      <div>
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
