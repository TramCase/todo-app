'use client';

import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
      createdAt: new Date()
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border rounded-l focus:outline-none bg-gray-50 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <div className="bg-white rounded shadow">
        {todos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No todos yet. Add one above!</div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
