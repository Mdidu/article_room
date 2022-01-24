import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ValidationAccount = () => {
  const { username } = useParams();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const datas = await fetch(
        `http://localhost:8080/auth/validate/${username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await datas.json();
      
      if (!datas.ok)
        setMessage(`${data.msg} Vous allez être redirigé dans 3 secondes !`);
      else
        setMessage(
          "Validation réussi, vous allez être redirigé dans 3 secondes !"
        );

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    })();
  }, [username, navigate]);

  return <div>{message}</div>;
};

export default ValidationAccount;
