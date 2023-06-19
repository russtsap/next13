"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
};

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
  updateTodo,
}: TodoItemProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleDelete = async () => {
    await deleteTodo(id);
    router.refresh();
  };

  const handleUpdate = async () => {
    await updateTodo(id, newTitle);
    setEditing(false);
    router.refresh();
  };

  return (
    <li className="flex gap-2 items-center dark:text-slate-100">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-gray-500"
      >
        {title}
      </label>
      {session?.user?.name === "russtsap" && (
        <>
          <button
            className="text-gray-500 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 outline-none"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="text-red-500 border border-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-700 focus:bg-red-200 dark:focus:bg-red-700 outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
      {editing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-800 p-4 rounded shadow-lg">
            <h2 className="text-lg text-slate-100 font-semibold mb-2">
              Edit Todo
            </h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border bg-slate-800 border-gray-300 p-2 rounded w-full mb-2 text-slate-100"
            />
            <button
              className="text-gray-500 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 outline-none"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="text-gray-500 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 outline-none ml-2"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
