import "../styles/globals.css";
import "../styles/style.scss";
import { ChatProvider } from "../context/ChatContext";
import { SocketProvider } from "../providers/socket-provider";

function MyApp({ Component, pageProps }) {


  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
 
export default MyApp;
