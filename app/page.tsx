import { ModeToggle } from "./components/theme-toggle/ThemeToggle";
import Link from "next/link";
import { ArrowRightCircle, LayoutDashboard, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Powerful Analytics <span className="text-indigo-600 dark:text-indigo-500">Dashboard</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Monitor your metrics in real-time and get actionable insights with our analytics dashboard
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Go to Dashboard <ArrowRightCircle className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LayoutDashboard className="h-10 w-10 text-indigo-600 dark:text-indigo-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Interactive Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Real-time analytics with customizable charts and metrics. Monitor user activity and performance at a glance.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Support Chat</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Get immediate assistance from our support team. Our intelligent chat system will help answer your questions.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  href="/chat"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Start Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Analytics Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
