import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const SignupHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/register",
        user,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const nav = async () => {
          await navigate("/login");
          toast("Now login with your account");
        };
        nav();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="h-[90vh] flex items-start justify-center">
        <div className="h-[50vh] w-[30vw] rounded-xl bg-gray-600 top-50 flex items-center justify-center mt-11 flex-col gap-3">
          <h1 className="text-white mb-[40px] text-2xl font-medium">Sign Up</h1>
          <Input
            className="w-3/4 p-5 bg-#1f2b3c rounded-full hover:border-green-700 spin-animation"
            value={user.fullName}
            name="fullName"
            onChange={changehandler}
            type="text"
            placeholder="Enter your full name"
          ></Input>
          <Input
            className="w-3/4 p-5 bg-#1f2b3c rounded-full hover:border-green-700 spin-animation"
            value={user.email}
            name="email"
            onChange={changehandler}
            type="text"
            placeholder="Create your email"
          ></Input>
          <Input
            className="w-3/4 p-5 bg-#1f2b3c rounded-full hover:border-green-700 spin-animation"
            value={user.password}
            name="password"
            onChange={changehandler}
            type="password"
            placeholder="Create your password"
          ></Input>
          <Button
            className="mt-5 w-3/4 bg-green-600 border-none rounded-full hover:bg-green-400 spin-animation"
            onClick={SignupHandler}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};
export default Signup;
