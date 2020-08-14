import { Response, Request } from 'express';
import { ITodo } from '../../types/todo';
import Todo from '../../models/todo';

export async function getTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
}

export async function addTodo(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res.status(201).json({
      message: "Todo added",
      todo: newTodo,
      todos: allTodos
    });

  } catch (exception) {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    // res.json(req.body);
    res.status(500).json({
      status: 500,
      exception: exception,
      payload: body,
    });
    throw exception;
  }
}

export async function updateTodo(req: Request, res: Response): Promise<void> {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body);
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo updated",
      todo: updatedTodo,
      todos: allTodos,
    })
  } catch (exception) {
    throw (exception);
  }
}

export async function deleteTodo(req: Request, res: Response): Promise<void> {
  try {
    const { params: { id } } = req;
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);

    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (exception) {
    throw (exception);
  }
}