import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import { AuthContext } from "../store/auth-context";
import authService from "../services/auth";
import Card from "../components/UI/Card";
import styles from "./Signin.module.css";
import FormField from "../components/UI/FormField";

const Signin = () => {
  const [error, setError] = useState();
  const authDatas = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const emailValidator = { required: true, pattern: regexEmail };
  const passwordValidator = {
    required: true,
    minLength: 8,
  };

  const onSubmit = async (data) => {
    const datas = await authService.signin(data);

    const { msg, user, token } = await datas.json();

    if (!datas.ok) setError(msg);

    if (token) {
      authDatas.loginHandler(token, user);
    }

    navigate("/");
  };

  return (
    <div className={styles.signin_form_pages}>
      <Card>
        <h1>Sign In</h1>
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
            labelText="Password : "
            type="password"
            name="password"
            validator={passwordValidator}
            register={register}
            error={errors.password}
            errorType={errors.password && errors.password.type}
          />

          <Button type="submit" disabled={!isValid}>
            SignIn
          </Button>

          {error && <ErrorMessage type="global" message={error.msg} />}
        </form>
      </Card>
    </div>
  );
};

export default Signin;
