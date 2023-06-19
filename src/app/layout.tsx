import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Link from "next/link";
import ThemeSwitcher from "@/layouts/ThemeStitcher";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-slate-800 light:bg-slate-100 dark:text-slate-100 light:text-slate-800 container mx-auto p-4`}
      >
        <nav className="mb-4 flex justify-between border-b-2 border-slate-600">
          <Link
            href="/"
            className="px-4 py-2 text-slate-700 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/admin-dashboard"
            className="px-4 py-2 text-slate-700 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-200 transition-colors duration-300"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/profile-page"
            className="px-4 py-2 text-slate-700 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-200 transition-colors duration-300"
          >
            Profile Page
          </Link>
          <Link
            className="px-4 py-2 text-slate-700 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-200 transition-colors duration-300"
            href="/new"
          >
            New
          </Link>
        </nav>
        <SessionProvider>
          <Providers>
            <ThemeSwitcher />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
