"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="min-h-screen bg-slate-800 text-slate-100 dark:bg-slate-100 dark:text-slate-800 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl mb-4">Signed in as {session.user.email}</h1>
        <pre className="mb-4 text-slate-100 dark:text-slate-700">
          {JSON.stringify(session, null, 2)}
        </pre>
        <button
          className="text-slate-100 dark:text-slate-100 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100 dark:bg-slate-100 dark:text-slate-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Not signed in</h1>
      <button
        className="text-slate-100 dark:text-slate-100 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
