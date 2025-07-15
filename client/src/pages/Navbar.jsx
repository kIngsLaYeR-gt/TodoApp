import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };
  const loginHandler = () => {
    navigate("/login");
  };
  const SignUpHandler = () => {
    navigate("/register");
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="h-[8vh] min-h-[60px] w-full bg-[#38423B]/90 backdrop-blur-md border-b border-[#3F5E5A]/30 flex items-center justify-between px-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center cursor-pointer"
          onClick={homeHandler}
        >
          <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
          <h1 className="text-xl font-semibold text-white">
            <span className="text-teal-300">TODO</span> APP
          </h1>
        </motion.div>
        
        <div className="flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={homeHandler}
              variant="ghost"
              className="text-gray-200 hover:bg-[#3F5E5A]/50 hover:text-white px-4 py-2 rounded-[10px] transition-all"
            >
              Home
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={logoutHandler}
              variant="ghost"
              className="text-gray-200 hover:bg-[#3F5E5A]/50 hover:text-white px-4 py-2 rounded-[10px] transition-all"
            >
              Logout
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={SignUpHandler}
              className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-[10px] transition-all"
            >
              Sign Up
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={loginHandler}
              variant="outline"
              className="border-teal-400 text-teal-100 hover:bg-[#3F5E5A]/50 hover:border-teal-300 px-4 py-2 rounded-[10px] transition-all"
            >
              Login
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;