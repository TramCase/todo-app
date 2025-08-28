"use client";

import React, { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [taskName, setTaskName] = useState(''); 
  const [todoList, setTodoList] = useState<Todo[]>([])

  const saveTaskName = (e: React.FormEvent) => {
    console.log(taskName);
    e.preventDefault();

    const addTodo: Todo = {
      id: crypto.randomUUID(),
      title: taskName,
      completed: false
    };
    setTodoList([...todoList, addTodo])
    setTaskName("");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <p>Todo Form Placeholder</p>
      <form onSubmit={saveTaskName} id="taskForm">
        <input name="task" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
        <button>add</button>
      </form>
      <div className="bg-white rounded shadow">
        <p>Todo List Placeholder</p>
          <ul>
            {todoList.map( (item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
      </div>
    </div>
  );
}
