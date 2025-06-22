"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-indigo-200 dark:ring-indigo-700/50">
          <AlertTriangle className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild>
          <Link href="/doctor">Go back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
