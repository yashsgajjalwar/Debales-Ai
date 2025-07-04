"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../components/theme-toggle/ThemeToggle";
import { LogOut, LayoutDashboard, MessageSquare } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2 h-64">
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/chat" className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <MessageSquare className="mr-3 h-5 w-5" />
              Support Chat
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  {session?.user?.name?.[0] || "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-white">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user?.email || ""}</p>
                </div>
              </div>

              <button onClick={handleSignOut} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Link
                href="/chat"
                className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40"
              >
                Support Chat
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-800/40"
              >
                <LogOut className="h-4 w-4 mr-2 inline-block" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
