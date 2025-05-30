'use client';

import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 not-last:border-b border-blue-950">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 mr-2"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-blue-950 dark:text-blue-500'}`}>
          {todo.title}
        </span>
      </div>
      <form onSubmit={() => onDelete(todo.id)}>
        <button type="submit" className="text-red-500 hover:text-red-700">Delete</button>
      </form>
    </div>
  );
}
