import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import openSocket from "socket.io-client";
import Button from "./Button";
import Moment from "react-moment";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [currentChat, setCurrentChat] = useState(false);
  const [renderedChatMessage, setRenderedChatMessage] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const messageValidator = { required: true };

  useEffect(() => {
    setSocket(openSocket(`ws://localhost:8080`));
  }, []);

  useEffect(() => {
    (async () => {
      if (!socket) setSocket(openSocket(`ws://localhost:8080`));
      socket.emit("getMessage");

      socket.on("getMessage", (data) => {
        setRenderedChatMessage(
          data.chatMessageList.map((message) => (
            <div key={message.id}>
              <div>
                {message.username}
                <Moment format="DD/MM/YYYY hh:MM:mm">
                  {message.created_at}
                </Moment>
              </div>
              <div>{message.content}</div>
            </div>
          ))
        );
      });
      reset();
    })();
  }, [currentChat, reset, socket]);

  const addMessage = ({ message }) => {
    const token = localStorage.getItem("access_token");

    socket.emit("sendMessage", { message, token });

    socket.on("getMessage", (data) => {
      if (data.action === "create") setCurrentChat(!currentChat);
    });
  };

  return (
    <div>
      <div>{renderedChatMessage}</div>
      <form onSubmit={handleSubmit(addMessage)}>
        <input
          type="text"
          name="message"
          id="message"
          {...register("message", messageValidator)}
        />
        <Button type="submit" disabled={!isValid}>
          Valider
        </Button>
      </form>
    </div>
  );
};

export default Chat;
