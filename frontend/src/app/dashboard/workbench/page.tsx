import Link from "next/link";
import Image from "next/image";

export default function WorkbenchPage() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-border-dark px-6 py-3 bg-white dark:bg-panel-dark z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary dark:text-white">
            <div className="size-6 text-accent-success">
              <span className="material-symbols-outlined !text-3xl">health_metrics</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">VeriHealth AI</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">Dashboard</Link>
            <Link href="/dashboard/workbench" className="text-primary dark:text-white text-sm font-semibold border-b-2 border-primary py-4 -mb-4">Resolution Workbench</Link>
            <Link href="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">History</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input className="w-64 rounded-lg bg-slate-100 dark:bg-border-dark border-none pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary" placeholder="Search records..." />
          </div>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold border border-slate-200 dark:border-border-dark" title="User profile avatar">
            JD
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Left Panel: Extracted Data */}
        <aside className="w-1/3 flex flex-col border-r border-slate-200 dark:border-border-dark bg-white dark:bg-panel-dark">
          <div className="p-6 border-b border-slate-200 dark:border-border-dark">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              <span className="material-symbols-outlined text-sm">folder_open</span>
              Batch ID: VH-992 / Record #8821
            </div>
            <h1 className="text-2xl font-bold dark:text-white mb-1">Extracted Data</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review and verify the AI-extracted fields against the source document.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <div className="space-y-4">
              {/* Field: Provider Name */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Provider Name</label>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> 98% CONFIDENCE
                  </span>
                </div>
                <div className="relative">
                  <input type="text" defaultValue="Johnathan Doe, MD" className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-sm">edit</span>
                </div>
              </div>

              {/* Field: Business Address */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Business Address</label>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">warning</span> 75% CONFIDENCE
                  </span>
                </div>
                <div className="relative">
                  <textarea rows={2} defaultValue="123 Medical Plaza, Suite 400, San Francisco, CA 94103" className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-sm">edit</span>
                </div>
              </div>

              {/* Field: NPI Number */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">NPI Number</label>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> 99% CONFIDENCE
                  </span>
                </div>
                <div className="relative">
                  <input type="text" defaultValue="1092837465" className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-sm">edit</span>
                </div>
              </div>

              {/* Field: License Number */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Medical License Number</label>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">error</span> 45% CONFIDENCE
                  </span>
                </div>
                <div className="relative">
                  <input type="text" defaultValue="LIC-4492-X (Ocr uncertain)" className="w-full rounded-lg bg-red-50/50 dark:bg-red-500/10 border border-red-500/30 p-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-red-500 text-sm">feedback</span>
                </div>
                <p className="mt-1.5 text-[11px] text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span> Handwriting detected, please verify manually.
                </p>
              </div>

              {/* Field: Expiration Date */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Expiration Date</label>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> 92% CONFIDENCE
                  </span>
                </div>
                <div className="relative">
                  <input type="text" defaultValue="12/31/2026" className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-sm">calendar_today</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Panel: Document Viewer */}
        <section className="flex-1 bg-slate-200 dark:bg-background-dark relative flex flex-col">
          <div className="h-12 bg-white dark:bg-panel-dark border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold dark:text-slate-300">Document: medical_license_doe.pdf</span>
              <div className="flex items-center gap-1 border-l border-slate-300 dark:border-border-dark pl-4">
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-border-dark rounded transition-colors">
                  <span className="material-symbols-outlined text-xl">zoom_in</span>
                </button>
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-border-dark rounded transition-colors">
                  <span className="material-symbols-outlined text-xl">zoom_out</span>
                </button>
                <span className="text-xs font-medium px-2">100%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-border-dark rounded transition-colors">
                <span className="material-symbols-outlined text-xl">rotate_right</span>
              </button>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-border-dark rounded transition-colors">
                <span className="material-symbols-outlined text-xl">download</span>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-8 flex justify-center custom-scrollbar">
            {/* Mocked PDF Document Preview */}
            <div className="w-full max-w-2xl bg-white shadow-2xl min-h-[1000px] p-12 relative border border-slate-300 text-slate-700" title="Medical license document preview with seal and official text">
              <div className="absolute top-8 right-12 opacity-20">
                <span className="material-symbols-outlined !text-9xl">workspace_premium</span>
              </div>
              <div className="text-center space-y-4 mb-12">
                <h3 className="text-2xl font-serif font-bold text-slate-800">STATE BOARD OF MEDICINE</h3>
                <div className="h-px w-32 bg-slate-300 mx-auto"></div>
                <p className="text-sm uppercase tracking-[0.2em] font-medium text-slate-600">Physician and Surgeon License</p>
              </div>
              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Licensee Name</p>
                  <p className="text-xl font-semibold text-slate-900">JOHNATHAN DOE, MD</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">License Number</p>
                    <p className="text-lg font-mono font-bold text-slate-800">C-88942-X</p>
                    <div className="mt-2 inline-block border-2 border-dashed border-red-500 p-1">
                      <p className="text-[8px] text-red-500 font-bold uppercase">Field extraction discrepancy</p>
                    </div>
                  </div>
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <p className="text-lg font-semibold text-green-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span> ACTIVE
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Issue Date</p>
                    <p className="text-base font-medium">January 15, 2012</p>
                  </div>
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Expiration Date</p>
                    <p className="text-base font-medium">December 31, 2026</p>
                  </div>
                </div>
                <div className="pt-12">
                  <p className="text-xs text-slate-500 italic text-center">
                    This document certifies that the above-named practitioner has fulfilled all requirements for medical licensure in this state.
                  </p>
                </div>
                <div className="flex justify-between items-end pt-20">
                  <div className="text-center">
                    <div className="h-px w-48 bg-slate-300 mb-2"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Executive Director Signature</p>
                  </div>
                  <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center opacity-30">
                    <span className="material-symbols-outlined !text-4xl text-slate-400">verified_user</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Controls */}
      <footer className="bg-white dark:bg-panel-dark border-t border-slate-200 dark:border-border-dark px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">history</span> Last saved 2 minutes ago</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">person</span> Assigned to: Reviewer Alex</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-red-500 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-colors">
            Reject Record
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-border-dark text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">flag</span>
            Flag for Follow-up
          </button>
          <button className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Approve Record
          </button>
        </div>
      </footer>
    </div>
  );
}
