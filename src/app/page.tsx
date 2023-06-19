import { TodoItem } from "@/components/Todositem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function deleteTodo(id: string) {
  "use server";

  await prisma.todo.delete({ where: { id } });
}

async function updateTodo(id: string, title: string) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { title } });
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <h1 className="text-2xl">Todos</h1>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
}
