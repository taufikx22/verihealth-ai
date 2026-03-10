import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-20 bg-white dark:bg-background-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-white text-2xl">health_metrics</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">VeriHealth <span className="text-accent font-black">AI</span></h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/dashboard" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors border-b-2 border-primary dark:border-accent pb-1">Dashboard</Link>
          <Link href="/dashboard/ingestion" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Data Ingestion</Link>
          <Link href="/dashboard/analytics" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Analytics</Link>
          <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Security</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">search</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-primary/10 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden" title="User profile avatar">
            <span className="material-symbols-outlined text-primary dark:text-slate-300">person</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              System Operational
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, Admin.</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">You have 24 records awaiting manual review today.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/ingestion" className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
              Upload New Data
            </Link>
            <Link href="/dashboard/workbench" className="bg-primary hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              Review Queue
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <span className="material-symbols-outlined text-xl">dataset</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">12,408</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Processed (30d)</p>
          </div>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 0.5%
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">94.2%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Auto-Verification Rate</p>
          </div>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg">
                <span className="material-symbols-outlined text-xl">gavel</span>
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">24</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Requires Manual Review</p>
          </div>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 5%
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">&lt; 2m</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Avg Processing Time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Processing Batches</h3>
                <button className="text-primary dark:text-accent text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-background-dark">
                       <svg className="w-8 h-8 text-primary -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                          <path className="text-accent-success" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                       </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Batch #VP-9021</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Uploaded by Systems API • 10 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">450 / 800 Docs</span>
                      <span className="text-[10px] text-slate-500 uppercase">Extracting</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-100 dark:border-blue-800">In Progress</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center size-10 rounded-full bg-green-50 dark:bg-green-900/10">
                       <span className="material-symbols-outlined text-green-500">check_circle</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Batch #VP-9020</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Uploaded by Dr. Sarah Chen • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">120 Records</span>
                      <span className="text-[10px] text-slate-500 uppercase">100% matched</span>
                    </div>
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg border border-green-100 dark:border-green-800">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Action Needed</h3>
              <ul className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                <li className="relative flex items-start gap-4">
                  <div className="absolute left-0 top-1.5 size-2 rounded-full bg-red-500 ring-4 ring-white dark:ring-card-dark z-10"></div>
                  <div className="pl-6 w-full text-slate-700 dark:text-slate-300">
                    <p className="text-xs text-slate-400 mb-1">Today, 09:42 AM</p>
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-3 rounded-lg flex flex-col gap-2">
                       <p className="text-sm font-bold text-slate-900 dark:text-white">NPI Mismatch Detected</p>
                       <p className="text-xs">Dr. James Carter&apos;s license (CA-889900) does not match NPI registry address.</p>
                       <Link href="/dashboard/workbench" className="text-red-500 text-xs font-bold mt-1 max-w-max hover:underline">Review Record →</Link>
                    </div>
                  </div>
                </li>
                <li className="relative flex items-start gap-4">
                  <div className="absolute left-0 top-1.5 size-2 rounded-full bg-orange-400 ring-4 ring-white dark:ring-card-dark z-10"></div>
                  <div className="pl-6 w-full text-slate-700 dark:text-slate-300">
                    <p className="text-xs text-slate-400 mb-1">Yesterday, 16:30 PM</p>
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-3 rounded-lg flex flex-col gap-2">
                       <p className="text-sm font-bold text-slate-900 dark:text-white">Missing OCR Data</p>
                       <p className="text-xs">Low confidence (45%) on License Expiration date for Doc #8821.</p>
                       <Link href="/dashboard/workbench" className="text-orange-500 text-xs font-bold mt-1 max-w-max hover:underline">Verify Manually →</Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
