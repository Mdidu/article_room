import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "./Chat.css";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const username = localStorage.getItem("user");

  useEffect(() => {
    setSocket(openSocket(`ws://localhost:8080`));
  }, []);

  useEffect(() => {
    (async () => {
      if (!socket) await setSocket(openSocket(`ws://localhost:8080`));

      socket.emit("getMessage");

      socket.on("getMessage", (data) => {
        data.chatMessageList.map((message) => {
          if (username === message.username)
            return addUserMessage(message.content);
          else return addResponseMessage(message.content);
        });
      });
    })();
  }, [socket]);

  const addMessage = (message) => {
    const token = localStorage.getItem("access_token");

    socket.emit("sendMessage", { message, token });
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={addMessage}
        title="General chat"
        subtitle=""
        senderPlaceHolder="Write a message !"
      />
    </div>
  );
};

export default Chat;
