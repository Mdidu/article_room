import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import authService from '../services/auth';

const Signup = () => {
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const password = {};
  password.current = watch("password", "");

  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const emailValidator = { required: true, pattern: regexEmail };
  const usernameValidator = { required: true, minLength: 5, maxLength: 18 };
  const passwordValidator = {
    required: true,
    minLength: 8,
    validate: (value) => value === password.current || "Password not equals ",
  };

  const onSubmit = async (data) => {
    const datas = await authService.signup(data);

    const message = await datas.json();

    if (!datas.ok) setError(message);
    else navigate("/validate");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          name="email"
          id="email"
          {...register("email", emailValidator)}
        />
        {errors.email && <ErrorMessage type={errors.email.type} />}
      </div>
      <div>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", usernameValidator)}
        />
        {errors.username && <ErrorMessage type={errors.username.type} />}
      </div>
      <div>
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", passwordValidator)}
        />
        {errors.password && <ErrorMessage type={errors.password.type} />}
      </div>
      <div>
        <label htmlFor="checkingPassword">CheckingPassword : </label>
        <input
          type="password"
          name="checkingPassword"
          id="checkingPassword"
          {...register("checkingPassword", passwordValidator)}
        />
        {errors.checkingPassword && (
          <ErrorMessage
            type={errors.checkingPassword.type}
            message={errors.checkingPassword.message}
          />
        )}
      </div>
      <Button type="submit" disabled={!isValid}>
        Valider
      </Button>
      {error && <ErrorMessage type="global" message={error.msg} />}
    </form>
  );
};

export default Signup;
