import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
