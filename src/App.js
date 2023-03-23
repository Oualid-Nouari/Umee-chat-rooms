import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Logo from "./Components/Logo";
import { LoginInfosContext } from "./Contexts/LoginInfosContext";
import Cookies from "universal-cookie";
import MainApp from "./Components/MainApp";
const cookies = new Cookies();

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isConnected, setIsConnected] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("")
  setTimeout(() => {
    setShowLoginForm(true);
  }, 2000);
  return (
    <LoginInfosContext.Provider value={{ setIsConnected, setRoom, room }}>
      {isConnected ? (
        <MainApp />
      ) : (
        <div className="App">{showLoginForm ? <Login /> : <Logo />}</div>
      )}
    </LoginInfosContext.Provider>
  );
}

export default App;
