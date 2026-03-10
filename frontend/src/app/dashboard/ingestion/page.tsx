"use client";

import Link from "next/link";
import { useState } from "react";

export default function IngestionPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!csvFile || !pdfFile) {
      setError("Please upload both a CSV roster and a PDF document.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("csv_file", csvFile);
    formData.append("pdf_file", pdfFile);

    try {
      // Connect to the FastAPI backend running on localhost:8000
      const response = await fetch("http://localhost:8000/api/process_batch", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "success") {
        setResult(data.data);
      } else {
        setError(data.message || "An error occurred during processing.");
      }
    } catch (err: any) {
      setError("Failed to connect to VeriHealth AI engine. Is the backend running?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-20 bg-white dark:bg-background-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-white text-2xl">health_metrics</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">VeriHealth <span className="text-accent font-black">AI</span></h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/dashboard" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Dashboard</Link>
          <Link href="/dashboard/ingestion" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors border-b-2 border-primary dark:border-accent pb-1">Data Ingestion</Link>
          <Link href="/dashboard/analytics" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Analytics</Link>
          <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-primary dark:hover:text-accent transition-colors">Security</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
          </button>
          <div className="h-10 w-10 rounded-full bg-primary/10 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-primary dark:text-slate-300">person</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded">HIPAA Compliant</span>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold uppercase rounded">Encryption Active</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Secure Ingestion Portal</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
            Upload your patient rosters and medical documentation. Our AI engines will automatically redact PII/PHI and verify data integrity before processing.
          </p>
        </div>

        {/* Main Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Roster Upload Card */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined">table_chart</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Provider Rosters</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">CSV, XLSX supported</p>
              </div>
            </div>
            
            <div className={`relative group bg-white dark:bg-slate-custom/30 rounded-2xl border-2 border-dashed ${csvFile ? 'border-green-500 bg-green-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-accent/5'} p-10 flex flex-col items-center justify-center transition-all cursor-pointer`}>
              <div className={`${csvFile ? 'bg-green-500/10 text-green-500' : 'bg-accent/10 text-accent'} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-4xl">{csvFile ? 'check_circle' : 'cloud_upload'}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {csvFile ? 'Roster Selected' : 'Drop provider roster here'}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                {csvFile ? csvFile.name : 'Drag and drop or browse to upload your structured clinical data'}
              </p>
              <button className="bg-primary dark:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                {csvFile ? 'Change File' : 'Browse Files'}
              </button>
              <input type="file" accept=".csv, .xlsx" onChange={handleCsvUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {/* Documents Upload Card */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-xl bg-accent text-white flex items-center justify-center">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Supporting Documents</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG supported</p>
              </div>
            </div>
            
            <div className={`relative group bg-white dark:bg-slate-custom/30 rounded-2xl border-2 border-dashed ${pdfFile ? 'border-green-500 bg-green-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5'} p-10 flex flex-col items-center justify-center transition-all cursor-pointer`}>
              <div className={`${pdfFile ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary dark:text-slate-300'} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-4xl">{pdfFile ? 'check_circle' : 'folder_zip'}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {pdfFile ? 'Document Selected' : 'Upload clinical notes'}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                {pdfFile ? pdfFile.name : 'Drop your medical records, labs, or scanned documents'}
              </p>
              <button className="bg-primary dark:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                {pdfFile ? 'Change File' : 'Browse Files'}
              </button>
              <input type="file" onChange={handlePdfUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3 font-medium">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {/* Results State */}
        {result && (
          <div className="mt-8 p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
             <div className="flex items-center gap-2 mb-4 text-green-500 font-bold">
               <span className="material-symbols-outlined">check_circle</span>
               Processing Complete
             </div>
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-auto max-h-96">
               <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                 {JSON.stringify(result, null, 2)}
               </pre>
             </div>
             <div className="flex gap-4 mt-6">
               <Link href="/dashboard" className="px-6 py-2.5 rounded-lg bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors">
                 Go to Dashboard
               </Link>
               <Link href="/dashboard/workbench" className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 Review in Workbench
               </Link>
             </div>
          </div>
        )}

        {/* Process Action */}
        {!result && (
          <div className="mt-12 flex flex-col items-center">
            <button 
              onClick={handleProcess}
              disabled={isUploading}
              className={`px-10 py-4 rounded-xl font-black text-lg shadow-xl transition-all flex items-center gap-3 ${
                isUploading 
                ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed shadow-none text-white/70' 
                : 'bg-primary hover:bg-slate-800 dark:bg-accent dark:hover:bg-blue-600 text-white shadow-primary/20 dark:shadow-accent/10 transform hover:-translate-y-1'
              }`}
            >
              {isUploading && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
              {isUploading ? 'Verifying with AI Engine...' : 'Reconcile Uploaded Files'}
            </button>
            <p className="mt-4 text-xs text-slate-500 font-medium">By clicking process, you confirm that you have the authority to share this medical data.</p>
          </div>
        )}

        {/* Bottom Stats / Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-custom/10 border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary dark:text-accent mb-4">security</span>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">AES-256 Encryption</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">All data is encrypted in transit and at rest using banking-grade security protocols.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-custom/10 border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary dark:text-accent mb-4">auto_fix_high</span>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Auto-PII Masking</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Our AI automatically detects and redacts personal identifiers before storage.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-custom/10 border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary dark:text-accent mb-4">speed</span>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">High-Speed Processing</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Parallel processing engines handle thousands of documents in minutes.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-custom/20 border-t border-slate-200 dark:border-slate-800 py-10 px-6 lg:px-20 mt-12 auto-mt">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-2xl">health_metrics</span>
            <span className="text-slate-500 text-sm font-medium">© 2024 VeriHealth AI. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary dark:hover:text-accent uppercase tracking-widest">Privacy Policy</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary dark:hover:text-accent uppercase tracking-widest">Compliance</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary dark:hover:text-accent uppercase tracking-widest">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
