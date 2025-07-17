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
  const [loading, setLoading] = useState(false);

  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    if (!user.email || !user.password) {
      return toast.error("Please fill all fields");
    }
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/login", user, {
        headers: { "Content-type": "application/json" },
        withCredentials: true
      });
      
      if (res.data.success) {
        toast.success(`Welcome back!`);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-gray-700/50 backdrop-blur-sm border border-gray-600 shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Login to manage your todos</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <Input
                className="w-full bg-gray-800 border-gray-600 text-white hover:border-green-500 focus:border-green-500 focus:ring-green-500"
                value={user.email}
                name="email"
                onChange={changehandler}
                type="email"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <Input
                className="w-full bg-gray-800 border-gray-600 text-white hover:border-green-500 focus:border-green-500"
                value={user.password}
                name="password"
                onChange={changehandler}
                type="password"
                placeholder="••••••••"
              />
            </div>
            
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              onClick={loginHandler}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")} 
              className="text-green-500 hover:text-green-400 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;