import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";

const NewTheme = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const datas = await fetch("http://localhost:8080/theme", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const msg = await datas.json();

    console.log(msg);

    if (!datas.ok) setError(msg);
    navigate("/article/new");
  };

  const themeValidator = { required: true, minLength: 3 };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name", themeValidator)}
        />
        {errors.name && <ErrorMessage type={errors.name.type} />}
      </div>

      <Button type="submit" disabled={!isValid}>
        Valider
      </Button>

      {error && <ErrorMessage type="global" message={error.msg} />}
    </form>
  );
};

export default NewTheme;
