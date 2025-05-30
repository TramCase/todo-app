'use client';

import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../../db/schema';
import { getTodos, addTodo as addTodoAction, toggleTodo as toggleTodoAction, deleteTodo as deleteTodoAction } from '../actions/todos';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    try {
      await addTodoAction(todo);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await toggleTodoAction(id);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoAction(id);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className="flex-grow p-2 border rounded-l focus:outline-none"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      
      <div className="bg-white rounded shadow">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading todos...</div>
        ) : todos.length === 0 ? (
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
