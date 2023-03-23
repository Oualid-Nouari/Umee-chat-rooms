import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { LoginInfosContext } from "../Contexts/LoginInfosContext";
import Img from "../imgs/UmeeLogo.png";
const cookies = new Cookies();

const Login = () => {
  const { setIsConnected } = useContext(LoginInfosContext);
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsConnected(true);
      cookies.set("username", result.user.displayName);
      cookies.set('userPic', result.user.photoURL)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login-page">
      <div className="login-r-side">
        <img className="login-img" src={Img} alt="" />
        <p style={{textAlign: 'center', padding: '0 20px', fontSize: '20px'}}>With <b>Umee</b> get your friends room code, or create one, and enjoy chating with them</p>
      </div>
      <div className="loginForm">
        <p>Login With Google :</p>
        <button onClick={signInWithGoogle}>Log In</button>
      </div>
      <div className="meee">Created by Oualid Nouari</div>
    </div>
  );
};

export default Login;
