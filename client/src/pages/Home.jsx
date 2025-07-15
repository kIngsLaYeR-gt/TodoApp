import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";
import { FiTrash2, FiPlus, FiCheck } from "react-icons/fi";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const deleteTodoHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/todo/deleteAll",
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  const addTodoHandler = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    
    setIsAdding(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo", {
          withCredentials: true,
        });
        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D2D2A] to-[#1A1A18]">
      <Navbar />
      <HeroSection />
      
      {/* Todo Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <div className="bg-[#38423B]/50 backdrop-blur-sm rounded-[20px] p-6 shadow-lg border border-[#3F5E5A]/30">
          <h2 className="text-2xl font-semibold text-white mb-6">Create New Task</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="What needs to be done?"
                className="w-full bg-[#3F5E5A]/30 border-[#3F5E5A] text-white rounded-[5px] placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details..."
                className="w-full bg-[#3F5E5A]/30 border-[#3F5E5A] text-white rounded-[5px] placeholder-gray-400 focus:ring-2 focus:ring-teal-400"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={deleteTodoHandler}
              variant="destructive"
              className="gap-2 bg-red-500/90 hover:bg-red-600 rounded-[10px] transition-all"
            >
              <FiTrash2 className="h-4 w-4" />
              Clear All
            </Button>
            
            <Button
              onClick={addTodoHandler}
              disabled={isAdding}
              className="gap-2 bg-teal-500 hover:bg-teal-600 transition-all rounded-[10px]"
            >
              {isAdding ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <FiPlus className="h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Todo List Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        {todos.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6">Your Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-[#3F5E5A]/70 border-[#3F5E5A] hover:bg-[#3F5E5A]/90 transition-all h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white flex items-center gap-2">
                          <FiCheck className="text-teal-300" />
                          {todo.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-200 mt-2">
                        {todo.description || <span className="italic text-gray-400">No description</span>}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-[#3F5E5A]/30 rounded-[30px] flex items-center justify-center mb-4">
              <FiCheck className="h-12 w-12 text-teal-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">No tasks yet</h3>
            <p className="text-gray-500 mt-2">Add your first task to get started</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;