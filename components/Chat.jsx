import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import Input from "./Input";

const Chat = () => {
  const { selectedUserName, logoutUser, setMessagesList } =
    useContext(ChatContext);
  const [username, setUsername] = useState(undefined);


  useEffect(() => {
    const userInfo = localStorage.getItem("username");
    const parsedValue = JSON.parse(userInfo);

    setUsername(parsedValue);
  }, []);



  return (
    <>
      <div className="chat">
        <div className="chatInfo">
          <span>{username ?? ""}</span>



          {/* <button
            onClick={() => {
              // Get the current font size from the <html> element
              const currentFontSize = parseFloat(
                window.getComputedStyle(document.documentElement).fontSize
              );

              // Increment the font size by 1px
              document.documentElement.style.fontSize = `${
                currentFontSize + 1
              }px`;
            }}
          >
            Change Font Size To Up
          </button>

          <button
            onClick={() => {
              // Get the current font size from the <html> element
              const currentFontSize = parseFloat(
                window.getComputedStyle(document.documentElement).fontSize
              );

              // Increment the font size by 1px
              document.documentElement.style.fontSize = `${
                currentFontSize - 1
              }px`;
            }}
          >
            Change Font Size To Down
          </button> */}

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMessagesList([]);
              localStorage.removeItem("messages");
            }}
          >
            Clear Chat
          </div>

          <span className="logo">DApp Chat</span>
          <div>
            <button onClick={logoutUser}>logout</button>
          </div>
        </div>
        <Message />
        <Input />
      </div>
    </>
  );
};

export default Chat;
