import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    <>
      <div className="h-[6vh] rounded-xl bg-[#38423B] mt-2 flex items-center justify-between">
          <h1 className="ml-3">{"MY MERN STACK"}</h1>
          <div className="flex gap-3 mr-8">
            <Button
              onClick={homeHandler}
              className="bg-[#20FC8F] text-black border-none button-animation rounded-full"
            >
              Home
            </Button>
            <Button
              onClick={logoutHandler}
              className="bg-[#20FC8F] text-black border-none button-animation rounded-full"
            >
              Logout
            </Button>
            <Button
              onClick={SignUpHandler}
              className="bg-[#20FC8F] text-black  border-none button-animation rounded-full"
            >
              Sign Up
            </Button>
            <Button
              onClick={loginHandler}
              className="bg-[#20FC8F] text-black border-none button-animation rounded-full"
            >
              Login
            </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
