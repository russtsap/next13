"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}
      >
        <nav className="mb-4 flex justify-between border-b-2 border-slate-600">
          <Link
            href="/"
            className="px-4 py-2 text-slate-100 hover:text-slate-200"
          >
            Home
          </Link>
          <Link
            href="/admin-dashboard"
            className="px-4 py-2 text-slate-100 hover:text-slate-200"
          >
            Admin dashboard
          </Link>
          <Link
            href="/profile-page"
            className="px-4 py-2 text-slate-100 hover:text-slate-200"
          >
            Profile page
          </Link>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
