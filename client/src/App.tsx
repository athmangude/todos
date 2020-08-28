import React, { useEffect, useState } from 'react';

import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  function fetchTodos() {
    getTodos().then(({ data: { todos } }: ITodo | any) => {
      setTodos(todos);
    }).catch((error: Error) => {
      console.log(error);
    });
  }

  function onSaveTodo(e: React.FormEvent, formData: ITodo): void {
    e.preventDefault();
    addTodo(formData).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Todo not saved");
      }

      setTodos(data.todos);
    }).catch(error => {
      console.log(error);
    })
  }

  function onUpdateTodo(todo: ITodo): void {
    updateTodo(todo).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Todo not updated');
      }

      setTodos(data.todos);
    }).catch((error) => {
      console.log(error);
    });
  }

  function onDeleteTodo(_id: string): void {
    deleteTodo(_id).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Todo not deleted');
      }

      setTodos(data.todos);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={onSaveTodo} />
      {
        todos.map((todo: ITodo) => (
          <TodoItem
            key={todo._id}
            updateTodo={onUpdateTodo}
            deleteTodo={onDeleteTodo}
            todo={todo}
          />
        ))
      }
    </main>
  )
}

export default App;
