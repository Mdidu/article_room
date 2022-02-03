import React from "react";
import Card from "../components/UI/Card";
import styles from "./ValidateWaiting.module.css";

const ValidateWaiting = () => {
  return (
    <div className={styles.validate_waiting_pages}>
      <Card>
        <div>
          Please validate your account by clicking on the link received by email
          !
        </div>
      </Card>
    </div>
  );
};

export default ValidateWaiting;
