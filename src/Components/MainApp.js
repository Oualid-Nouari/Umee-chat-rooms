import React, { useContext, useRef } from "react";
import Chat from "./Chat";
import { LoginInfosContext } from "../Contexts/LoginInfosContext";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const MainApp = () => {
  const { room } = useContext(LoginInfosContext);
  const { setRoom } = useContext(LoginInfosContext);
  const roomNameinput = useRef(null);
  const enterRoom = () => {
    setRoom(roomNameinput.current.value);
  };
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("username");
    cookies.remove("auth-token");
    setRoom("");
    window.location.reload();
  };
  return (
    <div className="container">
      {!room ? (
        <div className="roomInput">
          <h2>Enter Room Code</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Room Code..."
              ref={roomNameinput}
              required
              type="password"
            />
            <button onClick={enterRoom}>
              <i class="fa-solid fa-right-to-bracket"></i>Enter Room
            </button>
          </form>
          <button onClick={signUserOut} className="sign-out">
            Sign Out
          </button>
        </div>
      ) : (
        <Chat />
      )}
    </div>
  );
};

export default MainApp;
