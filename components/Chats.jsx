import React, { useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const {
    friendsList,
    addFriUseEffect,
    getMyFriendList,
    showMessages,
    setSelectedUserName,
  } = useContext(ChatContext);

  useEffect(() => {
    getMyFriendList();
  }, []);



  return (
    <div className="chats">
      {friendsList.map((item) => (
        <>
          <div
            className="userChat"
            key={item.pubkey}
            onClick={() => {
              showMessages(item.pubkey);
              setSelectedUserName(item.name);
            }}
          >
            <img
              src="https://png.pngitem.com/pimgs/s/130-1300253_female-user-icon-png-download-user-image-color.png"
              alt=""
            />
            <div className="userChatInfo">
              <span>{item.name}</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Chats;
