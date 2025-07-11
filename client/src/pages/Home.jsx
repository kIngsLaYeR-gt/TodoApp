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
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const deleteTodoHandler = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/todo/deleteAll",
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
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
    <div className="bg-[#2D2D2A] rounded-b-xl rounded-t-xl">
      <HeroSection></HeroSection>
      <Navbar />
      <div className="flex mt-2 gap-5 h-[30vh] w-full items-center justify-center">
        <div className="h-3/4 flex items-end justify-start flex-col gap-7">
          <h1 className="mt-1 text-2xl">Title:</h1>
          <h1 className=" text-2xl">Description:</h1>
        </div>
        <div className="h-3/4 mt-[10px] flex items-start justify-start flex-col gap-7">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add new todo ..."
            className="w-[300px] ml-[10px] bg-gray-600 text-white rounded-xl"
          ></Input>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a Description"
            className="w-[300px] max-h-fit ml-[10px] bg-gray-600 text-white rounded-xl"
          ></Textarea>
        </div>
        <div className="flex items-center mt-[30px] h-full justify-center ml-11 gap-4">
          <Button
            onClick={addTodoHandler}
            className="bg-[orange] hover:bg-black hover:text-white rounded-full border-none"
          >
            Add Todo
          </Button>
          <Button
            className="bg-[orange] hover:bg-red-400 hover:text-white rounded-full border-none"
            onClick={deleteTodoHandler}
          >
            Delete All Todo
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1 h-[60vh]">
        {todos.map((todo) => (
          <Card key={todo._id} className="bg-[#3F5E5A] h-[20vh] ml-4">
            <CardHeader>
              <CardTitle className="text-2xl">{todo.title}</CardTitle>
              <CardDescription><i>{todo.description}</i></CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Home;
