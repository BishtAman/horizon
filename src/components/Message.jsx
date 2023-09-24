import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <main ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <section className="messageInfo">
        <img
          className="imgUser"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="">just now</span>
      </section>
      <section className="messageContent">
        <p className="bg-white p-3  rounded-[20px] rounded-ss-[0px]">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </section>
    </main>
  );
}


