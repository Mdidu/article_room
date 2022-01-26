import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import EditorComponent from "../components/UI/EditorComponent";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ErrorMessage from "../components/UI/ErrorMessage";
import SelectTheme from "../components/UI/SelectTheme";
import { useNavigate } from "react-router-dom";

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
    
    const datas = await fetch("http://localhost:8080/article", {
      method: "POST",
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

  const titleValidator = { required: true, minLength: 8 };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", titleValidator)}
        />
        {errors.title && <ErrorMessage type={errors.title.type} />}
      </div>

      <EditorComponent
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <div>
        <SelectTheme register={register} />

        {errors.theme && <ErrorMessage type={errors.theme.type} />}
      </div>

      <Button type="submit" disabled={!isValid}>
        Valider
      </Button>

      {error && <ErrorMessage type="global" message={error.msg} />}
    </form>
  );
};

export default NewArticle;
