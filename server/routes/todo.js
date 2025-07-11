import express from "express";
import { createTodo, getAllTodo, deleteAllTodos, updateTodo } from "../controllers/todo.js";
import isAuthenticated from "../middleware/isAuthentiated.js";
const router = express.Router();

router.route("/todo").post(isAuthenticated, createTodo);
router.route("/todo").get(isAuthenticated, getAllTodo);
router.route("/todo/:todoId").put(isAuthenticated, updateTodo);

router.route("/todo/deleteAll").get(isAuthenticated, deleteAllTodos);

export default router;
