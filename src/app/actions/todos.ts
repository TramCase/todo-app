'use server';

import { db } from '../../db';
import { todos, Todo, NewTodo } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  return await db.select().from(todos).orderBy(todos.createdAt);
}

export async function addTodo(todo: NewTodo) {
  await db.insert(todos).values(todo);
  revalidatePath('/');
}

export async function toggleTodo(id: string) {
  const todo = await db.select().from(todos).where(eq(todos.id, id)).get();
  if (todo) {
    await db.update(todos)
      .set({ completed: !todo.completed })
      .where(eq(todos.id, id));
    revalidatePath('/');
  }
}

export async function deleteTodo(id: string) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath('/');
}
