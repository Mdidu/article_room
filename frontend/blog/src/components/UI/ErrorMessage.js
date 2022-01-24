import React from "react";

const ErrorMessage = (props) => {
  const { type, message } = props;

  switch (type) {
    case "required":
      return <div>This is required !</div>;
    case "pattern":
      return <div>Invalid email !</div>;
    case "minLength":
      return <div>Minimum length not reached !</div>;
    case "maxLenth":
      return <div>Maximum length exceeded !</div>;
    case "validate":
      return <div>{message}</div>;
    case "global":
      return <div>{message}</div>
    default:
      return <div></div>;
  }
};

export default ErrorMessage;
