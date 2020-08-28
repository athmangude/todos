import React, { useState } from 'react';

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  function onChange(e: React.FormEvent<HTMLInputElement>): void {
    setFormData({
      ...formData, [e.currentTarget.name]: e.currentTarget.value
    });
  }

  return (
    <form name="todo-form" className="form" onSubmit={e => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={onChange} type="text" name="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" onChange={onChange} name="description" />
        </div>
      </div>
      <button type="submit" disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
}

export default AddTodo;