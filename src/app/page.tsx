"use server";

import React from 'react';
import TodoList from './components/TodoList';

export default async function Home() {
  return (
    <div className="min-h-screen bg-blue-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Todo App</h1>
        <TodoList />
      </div>
    </div>
  );
}
