import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/UI/Card";
import authService from "../services/auth";
import styles from "./ValidationAccount.module.css";

const ValidationAccount = () => {
  const { username } = useParams();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const datas = await authService.validateAccount(username);

      const data = await datas.json();

      if (!datas.ok)
        setMessage(`${data.msg} You will be redirected in 3 seconds !`);
      else
        setMessage(
          "Validation successful, you will be redirected in 3 seconds !"
        );

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    })();
  }, [username, navigate]);

  return (
    <div className={styles.validation_account_pages}>
      <Card >
        <h1>Validate account</h1>
        <div>{message}</div>
      </Card>
    </div>
  );
};

export default ValidationAccount;
