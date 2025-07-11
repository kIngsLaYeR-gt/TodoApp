import { Todo } from "../models/todo.js";
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "All fiels are required",
      });
    }
    const todo = await Todo.create({
      title,
      description,
    });
    return res.status(201).json({
      success: true,
      message: "Todo Successfully Added",
      todo
    });
  } catch (error) {
    console.error("Error in todo controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      message:"new",
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({}); // deletes all todos
    return res.status(200).json({
      success: true,
      message: "All todos deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting todos:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { title } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            todoId,
            { title },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Title successfully updated",
            updatedTodo: todo
        });

    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};