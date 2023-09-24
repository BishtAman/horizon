import  Input  from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";


export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <main className="chat flex-col">
      <section className="chatInfo">
      <span>{data.user?.displayName}</span>
        <section className="chatIcons">
          <img src= "https://img.icons8.com/external-thin-kawalan-studio/24/external-add-friend-users-thin-kawalan-studio.png" alt="img" />
          <img src= "https://img.icons8.com/ios-glyphs/30/more.png" alt="img" />
        </section>
      </section>
      <Messages/>
      <Input/>
    </main>
  )
}
