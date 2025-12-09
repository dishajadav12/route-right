'use client'

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="text-lg font-semibold">Route Right</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium transition text-gray-700 hover:bg-white hover:text-indigo-600">Home</Link>
          <Link href="/generate-plan" className="px-4 py-2 rounded-lg text-sm font-medium transition text-gray-700 hover:bg-white hover:text-indigo-600">Generate Plan</Link>
          
          {status === "authenticated" && (
            <>
              <Link href="/your-plans" className="px-4 py-2 rounded-lg text-sm font-medium transition text-gray-700 hover:bg-white hover:text-indigo-600">Your Plans</Link>
              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm text-gray-600">Hi, {session.user?.name || session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
          
          {status === "unauthenticated" && (
            <Link href="/auth/signin" className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

