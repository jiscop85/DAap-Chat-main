import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const PrivateMessage = ({ message }) => {
  const ref = useRef();
  const router = useRouter();

  const[username,setUsername] = useState("");


  const {
    friendsList,
    addFriUseEffect,
    getMyFriendList,
    currentAccount,
    privateMessagesList,
    showMessages,
    showPrivateMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    showPrivateMessages();
    const userInfo = localStorage.getItem("username") ?? "";
    const parsedUser = JSON.parse(userInfo);
    setUsername(parsedUser)
  }, []);


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [privateMessagesList]);



  return (
    <div className="messages">
      {privateMessagesList.map((item) => (
        <>
          <div
            ref={ref}
            key={item.sender}
            className={`message ${item?.sender == username ? 'owner' : null}`}
          >
            <div className="messageInfo">
              <img
                src="https://png.pngitem.com/pimgs/s/130-1300253_female-user-icon-png-download-user-image-color.png"
                alt=""
              />
             <span style={{fontSize:14,marginTop:1,display:'block'}}>{item.sender}</span>
            </div>
            <div className="messageContent">
              <p style={{ marginBottom: 0 }}>{item.msg}</p>
              <span style={{fontSize:14,marginTop:1,display:'block',color:'#71717a'}} >{new Date(item.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default PrivateMessage;
