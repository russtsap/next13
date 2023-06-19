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
      <header className="flex justify-between items-center mb-4 dark:text-slate-100">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className={`border border-slate-300 text-slate-300 dark:text-slate-100 px-2 py-1 rounded hover:bg-slate-700 dark:hover:bg-slate-700 focus-within:bg-slate-700 outline-none`}
          href="/new"
        >
          New
        </Link>
      </header>
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
