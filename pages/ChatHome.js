import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { ChatContext } from "../context/ChatContext";

function ChatHome() {
  const { connectWallet } = useContext(ChatContext);
  const [fontSize, setFontSize] = useState(16); // Default font size in pixels

  useEffect(() => {
    connectWallet();
  }, []);


  useEffect(() => {
    // Set the initial font size on the <html> element
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);


  const handleFontSizeChange = (event) => {
    const newFontSize = event.target.value;
    setFontSize(newFontSize);
    document.documentElement.style.fontSize = `${newFontSize}px`; // Apply font size globally
  };
  return (
    <>
    <div className="home">
      <div className="container">


        {/* <Sidebar /> */}
        <Chat />
      </div>
      
    </div>
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    color: "#FFF",
    background:"#0f172a",
    paddingBottom:"10px"
  }}
>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <input
      type="range"
      min="10" // Minimum font size
      max="24" // Maximum font size
      value={fontSize}
      onChange={handleFontSizeChange}
      
    />
    <div>fontSize</div> {/* Text is placed directly under the slider */}
    <span>{fontSize}px</span>
  </div>
</div>
    </>
  );
}

export default ChatHome;
