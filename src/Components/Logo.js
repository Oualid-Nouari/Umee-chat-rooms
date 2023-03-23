import React from "react";
import { motion } from "framer-motion";
import Logoo from "../imgs/UmeeLogo.png";
const Logo = () => {
  return (
    <div>
      <motion.img className="initialLogo" src={Logoo} alt="" />
      <div className="meee">Created by Oualid Nouari</div>
    </div>
  );
};

export default Logo;
