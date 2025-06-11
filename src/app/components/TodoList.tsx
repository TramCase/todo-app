"use client";

import React from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  return (
    <div className="w-full max-w-md mx-auto">
      <p>Todo Form Placeholder</p>
      <div className="bg-white rounded shadow">
        <p>Todo List Placeholder</p>
      </div>
    </div>
  );
}
