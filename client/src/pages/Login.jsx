import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/login", user, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials:true
      });
      if (res.data.success) {
        if(!toast.loading){
          toast.success(res.data.message);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <Navbar/>
      <div className="h-[90vh] flex items-start justify-center">
        <div className="h-[45vh] w-[30vw] rounded-xl bg-gray-600 top-50 flex items-center mt-11 justify-center flex-col gap-3">
          <h1 className="text-white mb-[40px] text-5xl font-medium animated-text">LOGIN</h1>
          <Input
            className="w-3/4 p-5 bg-#1f2b3c rounded-full hover:border-green-700 spin-animation"
            value={user.email}
            name="email"
            onChange={changehandler}
            type="text"
            placeholder="Enter your email"
          ></Input>
          <Input
            className="w-3/4 p-5 bg-#1f2b3c rounded-full hover:border-green-700 spin-animation"
            value={user.password}
            name="password"
            onChange={changehandler}
            type="password"
            placeholder="Enter your password"
          ></Input>
          <Button
            className="mt-5 w-3/4 bg-green-600 border-none rounded-full hover:bg-green-400 spin-animation"
            onClick={loginHandler}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
export default Login;
