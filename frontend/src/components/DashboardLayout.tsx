"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/ingestion", label: "Data Ingestion", icon: "cloud_upload" },
  { href: "/dashboard/workbench", label: "Workbench", icon: "fact_check" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "analytics" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-10 bg-white dark:bg-background-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-white text-2xl">health_metrics</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
              VeriHealth <span className="text-accent font-black">AI</span>
            </h2>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary dark:text-white border-b-2 border-primary dark:border-accent pb-1"
                    : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" id="search-btn">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">search</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative" id="notifications-btn">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
          </button>
          <div
            className="h-10 w-10 rounded-full bg-primary/10 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden"
            title="User profile"
            id="user-avatar"
          >
            <span className="material-symbols-outlined text-primary dark:text-slate-300">person</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}
