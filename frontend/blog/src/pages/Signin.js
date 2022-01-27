import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import { AuthContext } from "../store/auth-context";
import authService from '../services/auth';

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
    <div>
      <h1>Sign In</h1>
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
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", passwordValidator)}
          />
          {errors.password && <ErrorMessage type={errors.password.type} />}
        </div>
        <Button type="submit" disabled={!isValid}>
          Valider
        </Button>

        {error && <ErrorMessage type="global" message={error.msg} />}
      </form>
    </div>
  );
};

export default Signin;
