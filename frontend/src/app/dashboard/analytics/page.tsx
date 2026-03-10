import Link from "next/link";
import Image from "next/image";

export default function AnalyticsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-primary/20 bg-background-light dark:bg-background-dark px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-xl">health_metrics</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">VeriHealth AI</h2>
        </div>

        <div className="flex flex-1 justify-center max-w-xl px-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-slate-200 dark:bg-primary/30 text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary" placeholder="Search analytics..." />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-primary/40 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-slate-300 dark:bg-primary/20 mx-1"></div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold">Dr. Sarah Chen</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center overflow-hidden" title="Professional avatar of a healthcare administrator">
              <span className="material-symbols-outlined text-primary dark:text-slate-300">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark p-4 hidden lg:flex flex-col gap-2">
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link href="/dashboard/ingestion" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
              <span className="text-sm font-medium">Ingestion</span>
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              <span className="text-sm font-medium">Analytics</span>
            </Link>
            <Link href="/dashboard/workbench" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="text-sm font-medium">Workbench</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span className="text-sm font-medium">Logs</span>
            </Link>
          </nav>
          <div className="mt-auto pt-4 border-t border-primary/10">
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:px-10 md:py-8 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>Ingestion Pipeline</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span className="text-primary font-semibold">Analytics Dashboard</span>
                </nav>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Post-Ingestion Insights</h1>
                <p className="text-slate-500 text-sm max-w-lg">Comprehensive processing metrics and data distribution across clinical providers.</p>
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard/ingestion" className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back to Ingestion
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export Report
                </button>
              </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Records</p>
                  <span className="flex items-center text-green-500 text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> 12.5%
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">1,248,392</p>
                <p className="text-[10px] text-slate-400 mt-1">Processed in last 24h</p>
              </div>
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Accuracy Rate</p>
                  <span className="flex items-center text-green-500 text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> 0.2%
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">99.42%</p>
                <p className="text-[10px] text-slate-400 mt-1">Exceeding SLA target of 98.5%</p>
              </div>
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Latency</p>
                  <span className="flex items-center text-orange-500 text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">trending_down</span> 4.1%
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">142ms</p>
                <p className="text-[10px] text-slate-400 mt-1">Avg. end-to-end processing</p>
              </div>
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Data Health</p>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-[10px] font-bold">OPTIMAL</span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">99.98%</p>
                <p className="text-[10px] text-slate-400 mt-1">Uptime and integrity index</p>
              </div>
            </div>

            {/* Visualization Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Line Chart: Processing Accuracy Trends */}
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-6 rounded-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Processing Accuracy Trends</h3>
                    <p className="text-xs text-slate-500">Daily verification success rate over the last 14 days</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-blue-500"></span>
                      <span className="text-[10px] font-medium text-slate-400">Accuracy %</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-h-[240px] relative mt-4">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-slate-200 dark:text-primary/20" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-slate-200 dark:text-primary/20" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-slate-200 dark:text-primary/20" />
                    <line x1="0" y1="160" x2="400" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-slate-200 dark:text-primary/20" />
                    
                    <path d="M0,140 Q40,110 80,120 T160,60 T240,90 T320,40 T400,50 L400,200 L0,200 Z" fill="url(#lineGrad)" />
                    <path d="M0,140 Q40,110 80,120 T160,60 T240,90 T320,40 T400,50" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    
                    <circle cx="80" cy="120" r="4" strokeWidth="2" className="fill-white dark:fill-background-dark stroke-blue-500" />
                    <circle cx="160" cy="60" r="4" strokeWidth="2" className="fill-white dark:fill-background-dark stroke-blue-500" />
                    <circle cx="240" cy="90" r="4" strokeWidth="2" className="fill-white dark:fill-background-dark stroke-blue-500" />
                    <circle cx="320" cy="40" r="4" strokeWidth="2" className="fill-white dark:fill-background-dark stroke-blue-500" />
                  </svg>
                  <div className="flex justify-between mt-4">
                    <span className="text-[10px] text-slate-400">Sep 01</span>
                    <span className="text-[10px] text-slate-400">Sep 04</span>
                    <span className="text-[10px] text-slate-400">Sep 07</span>
                    <span className="text-[10px] text-slate-400">Sep 10</span>
                    <span className="text-[10px] text-slate-400">Sep 14</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart: Provider Type Distribution */}
              <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-6 rounded-xl flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">Provider Type Distribution</h3>
                  <p className="text-xs text-slate-500">Classification of ingested health record sources</p>
                </div>
                <div className="flex flex-1 items-center justify-center gap-8">
                  <div className="relative size-40">
                    <svg viewBox="0 0 36 36" className="size-full rotate-[-90deg]">
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" className="stroke-slate-200 dark:stroke-primary/20"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray="45, 100" strokeDashoffset="0" className="stroke-primary"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray="25, 100" strokeDashoffset="-45" className="stroke-blue-400"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray="20, 100" strokeDashoffset="-70" className="stroke-green-500"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray="10, 100" strokeDashoffset="-90" className="stroke-orange-500"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black">1.2M</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Total</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm bg-primary"></span>
                      <span className="text-xs font-medium w-24">Hospitals</span>
                      <span className="text-xs font-bold text-slate-400">45%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm bg-blue-400"></span>
                      <span className="text-xs font-medium w-24">Specialized Care</span>
                      <span className="text-xs font-bold text-slate-400">25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm bg-green-500"></span>
                      <span className="text-xs font-medium w-24">Clinics</span>
                      <span className="text-xs font-bold text-slate-400">20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm bg-orange-500"></span>
                      <span className="text-xs font-medium w-24">Pharmacies</span>
                      <span className="text-xs font-bold text-slate-400">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Log Summary */}
            <div className="mt-8 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-primary/20">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Recent Processing Batches</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-primary/30 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="px-6 py-3">Batch ID</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Total Records</th>
                      <th className="px-6 py-3">Completion Time</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                    <tr>
                      <td className="px-6 py-4 font-mono">#BH-2940-A</td>
                      <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-green-500 font-bold"><span className="size-1.5 rounded-full bg-green-500"></span> Successful</span></td>
                      <td className="px-6 py-4">42,103</td>
                      <td className="px-6 py-4">12s</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:underline font-bold">View Logs</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-mono">#BH-2939-B</td>
                      <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-green-500 font-bold"><span className="size-1.5 rounded-full bg-green-500"></span> Successful</span></td>
                      <td className="px-6 py-4">128,490</td>
                      <td className="px-6 py-4">45s</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:underline font-bold">View Logs</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
