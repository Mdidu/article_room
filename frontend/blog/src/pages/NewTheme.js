import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import ErrorMessage from "../components/UI/ErrorMessage";
import FormField from "../components/UI/FormField";
import themeService from "../services/theme";
import styles from "./NewTheme.module.css";

const NewTheme = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const datas = await themeService.addTheme(data);

    const msg = await datas.json();

    if (!datas.ok) setError(msg);

    navigate("/article/new");
  };

  const themeValidator = { required: true, minLength: 3 };

  return (
    <div className={styles.new_theme_pages}>
      <Card>
        <h1>Add a theme</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            labelText="Name : "
            type="text"
            name="name"
            validator={themeValidator}
            register={register}
            error={errors.name}
            errorType={errors.name && errors.name.type}
          />

          <Button type="submit" disabled={!isValid}>
            Valider
          </Button>

          {error && <ErrorMessage type="global" message={error.msg} />}
        </form>
      </Card>
    </div>
  );
};

export default NewTheme;
