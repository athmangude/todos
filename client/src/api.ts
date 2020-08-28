import axios, { AxiosResponse } from 'axios';
import Axios from 'axios';

const baseUrl: string = 'http://localhost:4000';

export async function addTodo(formData: ITodo): Promise<AxiosResponse<ApiDataType>> {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    }

    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(`${baseUrl}/todos`, todo);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTodos(): Promise<AxiosResponse<ApiDataType>> {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(`${baseUrl}/todos`);
    return todos;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTodo(todo: ITodo): Promise<AxiosResponse<ApiDataType>> {
  // only update the status of the todo
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }

    const updatedTodo: AxiosResponse<ApiDataType> = await Axios.put(`${baseUrl}/todos/${todo._id}`, todoUpdate);
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTodo(_id: string): Promise<AxiosResponse<ApiDataType>> {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await Axios.delete(`${baseUrl}/todos/${_id}`);
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
}