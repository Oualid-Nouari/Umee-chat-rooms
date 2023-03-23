import { uuidv4 } from "@firebase/util";
import UserProfile from '../imgs/user.png'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { LoginInfosContext } from "../Contexts/LoginInfosContext";
import { auth, db } from "../firebase-config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Chat = () => {
  const { room } = useContext(LoginInfosContext);
  const { setRoom } = useContext(LoginInfosContext)
  const [newMessage, setNewMessage] = useState({
    messageText: "",
    messageId: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  const messageRef = collection(db, "messages");
  const [isRoomCopied, setIsRoomCopied] = useState(false);
  useEffect(() => {
    const messageQuery = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setAllMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let currDate = new Date();
    let hoursMin = currDate.getHours() + ":" + currDate.getMinutes();
    if (newMessage.messageText !== "") {
      await addDoc(messageRef, {
        text: newMessage.messageText,
        time: hoursMin,
        createdAt: serverTimestamp(),
        messageId: newMessage.messageId,
        user: auth.currentUser.displayName,
        profilePic: auth.currentUser.photoURL,
        room,
      });
      setNewMessage({ ...newMessage, messageText: "" });
    }
  };
  useEffect(() => {
    let ele = document.querySelector(".messages");
    ele.scrollTop = ele.scrollHeight;
  }, [allMessages]);
  const copieRoomCode = () => {
    navigator.clipboard.writeText(room);
    setIsRoomCopied(true);
    setTimeout(() => {
      setIsRoomCopied(false);
    }, 2000);
  };
  return (
    <div className="chat">
      <header className="chat-header">
        <i onClick={() => setRoom("")} class="fa-solid fa-circle-left"></i>
        <h2>Chat Room</h2>
        <button
          style={{ backgroundColor: isRoomCopied ? "rgb(0, 185, 86)" : "orangered" }}
          onClick={copieRoomCode}
        >
          <i
            class={
              isRoomCopied ? "fa-solid fa-check-double" : "fa-solid fa-copy"
            }
            style={{ fontSize: "16px" }}
          ></i>
          {isRoomCopied ? 'Copied' : 'Room Code'}
        </button>
      </header>
      <div className="messages">
        {allMessages.map((message) => {
          return (
            <div
              className={
                message.user === cookies.get("username")
                  ? "message myMessage"
                  : "message notMyMessage"
              }
            >
              <img
                src={UserProfile}
                alt=""
                width="35px"
                height="35px"
                style={{ borderRadius: "50%" }}
              />
              <span className="message-text">
                <small style={{ fontSize: "10px" }}>{message.user}</small>
                <p style={{ fontSize: "15px" }}>{message.text}</p>
              </span>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type A Message..."
          onChange={(e) =>
            setNewMessage({
              ...newMessage,
              messageText: e.target.value,
              messageId: uuidv4(),
            })
          }
          value={newMessage.messageText}
        />
        <button type="submit">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
