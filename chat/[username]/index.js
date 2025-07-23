import React, { useState, useEffect, useContext } from "react";
import PrivateChat from "../../../components/PrivateChat";
import { useRouter } from "next/router";

function ChatHome() {

  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="home">
      <div className="container">
        <PrivateChat friend={username} />
      </div>
    </div>
  );
}

export default ChatHome;
