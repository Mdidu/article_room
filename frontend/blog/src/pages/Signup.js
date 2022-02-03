import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import ErrorMessage from "../components/UI/ErrorMessage";
import FormField from "../components/UI/FormField";
import authService from "../services/auth";
import styles from "./Signup.module.css";

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
    <div className={styles.signup_form_pages}>
      <Card>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            labelText="Email : "
            type="text"
            name="email"
            validator={emailValidator}
            register={register}
            error={errors.email}
            errorType={errors.email && errors.email.type}
          />

          <FormField
            labelText="Username : "
            type="text"
            name="username"
            validator={usernameValidator}
            register={register}
            error={errors.username}
            errorType={errors.username && errors.username.type}
          />

          <FormField
            labelText="Password : "
            type="password"
            name="password"
            validator={passwordValidator}
            register={register}
            error={errors.password}
            errorType={errors.password && errors.password.type}
          />

          <FormField
            labelText="CheckingPassword : "
            type="password"
            name="checkingPassword"
            validator={passwordValidator}
            register={register}
            error={errors.checkingPassword}
            errorType={errors.checkingPassword && errors.checkingPassword.type}
            message={errors.checkingPassword && errors.checkingPassword.message}
          />
          <Button type="submit" disabled={!isValid}>
            Register
          </Button>
          {error && <ErrorMessage type="global" message={error.msg} />}
        </form>
      </Card>
    </div>
  );
};

export default Signup;
