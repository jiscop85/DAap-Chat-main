import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";
import Pusher from "pusher-js";

const Input = () => {
  const {
    setSearchAccount,
    searchAndAddFriend,
    setMessageInput,
    sendMessage,
    messageInput,
    setMessagesList
  } = useContext(ChatContext);

  const [text, setText] = useState("");

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");

    const userInfo = localStorage.getItem("username") ?? "";
    const parsedUser = JSON.parse(userInfo);

    channel.bind("chat-event", function (data) {
      // setMessageList((prevState) => [
      //   ...prevState,
      //   { sender: data.user, message: data.message },
      // ]);
console.log(data,'log_00')
      const { message, user } = data;


      const savedMessages = localStorage.getItem("messages") ?? [];
      const userInfo = localStorage.getItem("username") ?? "";
      const parsedUser = JSON.parse(userInfo);

      let parsedMessages = [];

      if (savedMessages?.length > 0) {
        parsedMessages = JSON.parse(savedMessages);

        parsedMessages.push({
          sender: user,
          timestamp: new Date(),
          msg: message,
        });
      } else {
        parsedMessages = [
          {
            sender: user,
            timestamp: new Date(),
            msg: message,
          },
        ];
      }

      localStorage.setItem("messages", JSON.stringify(parsedMessages));
      setMessagesList((prev) => [
        ...prev,
        {
          sender: user,
          timestamp: new Date(),
          msg: message,
        },
      ]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const onSendMessage = async (e) => {
    try {
      e.preventDefault();
      const userInfo = localStorage.getItem("username") ?? "";
      const parsedUser = JSON.parse(userInfo);

      const res = await fetch("/api/pusher", {
          method: "POST",
          body: JSON.stringify({ message: text, user: parsedUser }),
          headers: {
            "Content-Type": "application/json",
          },
        });;

      // const res = await fetch("/api/socket/message", {
      //   method: "POST",
      //   body: JSON.stringify({ message: text, user: parsedUser }),
      // });

      if (res.status == 200) {
        const { data } = await res.json();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setText("");
    }
  };

  return (
    <form onSubmit={onSendMessage} className="input">
      <input
        value={text}
        required
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default Input;
