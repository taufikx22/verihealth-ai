"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import StatusBadge from "@/components/StatusBadge";
import ConfidencePill from "@/components/ConfidencePill";
import { processBatch, type ProcessingResult, fetchBatchDetail, type BatchDetail } from "@/lib/api";

const agentLogs = [
  { agent: "Orchestrator", msg: "Initializing multi-agent pipeline...", icon: "hub" },
  { agent: "Orchestrator", msg: "Parsing uploaded CSV roster...", icon: "hub" },
  { agent: "Validation Agent", msg: "Querying CMS NPI Registry for provider verification...", icon: "policy" },
  { agent: "Validation Agent", msg: "Cross-referencing addresses with geolocation services...", icon: "location_on" },
  { agent: "Enrichment Agent", msg: "Analyzing uploaded PDF with Vision Language Model...", icon: "document_scanner" },
  { agent: "Enrichment Agent", msg: "Extracting license numbers and expiration dates...", icon: "auto_fix_high" },
  { agent: "QA Agent", msg: "Reconciling data sources and calculating confidence scores...", icon: "fact_check" },
  { agent: "QA Agent", msg: "Generating final validation report...", icon: "assessment" },
];

export default function IngestionPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLogIdx, setCurrentLogIdx] = useState(-1);
  const [result, setResult] = useState<BatchDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [csvDragOver, setCsvDragOver] = useState(false);
  const [pdfDragOver, setPdfDragOver] = useState(false);

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setCsvFile(e.target.files[0]);
  };
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setPdfFile(e.target.files[0]);
  };

  const handleDrop = useCallback((type: "csv" | "pdf") => (e: React.DragEvent) => {
    e.preventDefault();
    type === "csv" ? setCsvDragOver(false) : setPdfDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) type === "csv" ? setCsvFile(file) : setPdfFile(file);
  }, []);

  const handleProcess = async () => {
    if (!csvFile || !pdfFile) {
      setError("Please upload both a CSV roster and a PDF document.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setCurrentLogIdx(0);

    // Animate agent logs
    for (let i = 0; i < agentLogs.length; i++) {
      setCurrentLogIdx(i);
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    }

    try {
      const processResult = await processBatch(csvFile, pdfFile);
      // Fetch the full batch detail to show results
      const detail = await fetchBatchDetail(processResult.batch_id);
      setResult(detail);
    } catch {
      setError("Failed to connect to VeriHealth AI engine. Is the backend running on port 8000?");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCsvFile(null);
    setPdfFile(null);
    setResult(null);
    setError(null);
    setCurrentLogIdx(-1);
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded">HIPAA Compliant</span>
          <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold uppercase rounded">Encryption Active</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Secure Ingestion Portal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
          Upload your provider rosters and medical documentation. Our AI engines will automatically verify data integrity and extract missing credentials.
        </p>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <span className="material-symbols-outlined text-green-500 text-3xl">task_alt</span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Processing Complete — Batch {result.id}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {result.total_records} providers processed • Avg confidence {result.avg_confidence}%
                </p>
              </div>
            </div>
            <button onClick={resetForm} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Process Another Batch
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl text-center">
              <p className="text-2xl font-black text-green-500">{result.verified_count}</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Verified</p>
            </div>
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center">
              <p className="text-2xl font-black text-blue-500">{result.enriched_count}</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Enriched</p>
            </div>
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl text-center">
              <p className="text-2xl font-black text-orange-500">{result.flagged_count}</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Flagged</p>
            </div>
            <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl text-center">
              <p className="text-2xl font-black text-purple-500">{result.avg_confidence}%</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Avg Confidence</p>
            </div>
          </div>

          {/* Provider Results Table */}
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-border-dark">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Provider Validation Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-6 py-3">Provider Name</th>
                    <th className="px-6 py-3">NPI</th>
                    <th className="px-6 py-3">License</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Confidence</th>
                    <th className="px-6 py-3">Flags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {result.providers.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">{p.npi}</td>
                      <td className="px-6 py-4 font-mono">{p.license_number || "—"}</td>
                      <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                      <td className="px-6 py-4"><ConfidencePill score={p.confidence_score} showLabel={false} /></td>
                      <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{p.flags.length > 0 ? p.flags[0] : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">dashboard</span>
              Go to Dashboard
            </Link>
            <Link href={`/dashboard/workbench?batch=${result.id}`} className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">fact_check</span>
              Review in Workbench
            </Link>
          </div>
        </div>
      )}

      {/* Upload Form */}
      {!result && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CSV Upload */}
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
              <div
                onDragOver={(e) => { e.preventDefault(); setCsvDragOver(true); }}
                onDragLeave={() => setCsvDragOver(false)}
                onDrop={handleDrop("csv")}
                className={`relative group bg-white dark:bg-slate-custom/30 rounded-2xl border-2 border-dashed ${
                  csvFile
                    ? "border-green-500 bg-green-500/5"
                    : csvDragOver
                      ? "border-accent bg-accent/10 scale-[1.02]"
                      : "border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-accent/5"
                } p-10 flex flex-col items-center justify-center transition-all cursor-pointer`}
                id="csv-dropzone"
              >
                <div className={`${csvFile ? "bg-green-500/10 text-green-500" : "bg-accent/10 text-accent"} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-4xl">{csvFile ? "check_circle" : "cloud_upload"}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {csvFile ? "Roster Selected" : "Drop provider roster here"}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                  {csvFile ? csvFile.name : "Drag and drop or browse to upload your structured clinical data"}
                </p>
                <button className="bg-primary dark:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                  {csvFile ? "Change File" : "Browse Files"}
                </button>
                <input type="file" accept=".csv,.xlsx" onChange={handleCsvUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* PDF Upload */}
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
              <div
                onDragOver={(e) => { e.preventDefault(); setPdfDragOver(true); }}
                onDragLeave={() => setPdfDragOver(false)}
                onDrop={handleDrop("pdf")}
                className={`relative group bg-white dark:bg-slate-custom/30 rounded-2xl border-2 border-dashed ${
                  pdfFile
                    ? "border-green-500 bg-green-500/5"
                    : pdfDragOver
                      ? "border-primary bg-primary/10 scale-[1.02]"
                      : "border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5"
                } p-10 flex flex-col items-center justify-center transition-all cursor-pointer`}
                id="pdf-dropzone"
              >
                <div className={`${pdfFile ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary dark:text-slate-300"} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-4xl">{pdfFile ? "check_circle" : "folder_zip"}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {pdfFile ? "Document Selected" : "Upload clinical notes"}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                  {pdfFile ? pdfFile.name : "Drop your medical records, labs, or scanned documents"}
                </p>
                <button className="bg-primary dark:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                  {pdfFile ? "Change File" : "Browse Files"}
                </button>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handlePdfUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Agent Log Animation */}
          {isProcessing && currentLogIdx >= 0 && (
            <div className="mt-8 bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700 p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <span className="size-3 rounded-full bg-red-500"></span>
                <span className="size-3 rounded-full bg-yellow-500"></span>
                <span className="size-3 rounded-full bg-green-500"></span>
                <span className="ml-4 text-slate-400 text-xs font-sans font-bold">VeriHealth AI Agent Pipeline</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {agentLogs.slice(0, currentLogIdx + 1).map((log, i) => (
                  <div key={i} className={`flex items-start gap-3 ${i === currentLogIdx ? "text-green-400" : "text-slate-500"} transition-colors`}>
                    <span className="material-symbols-outlined text-base mt-0.5">{log.icon}</span>
                    <span>
                      <span className={`font-bold ${
                        log.agent === "Orchestrator" ? "text-purple-400" :
                        log.agent === "Validation Agent" ? "text-blue-400" :
                        log.agent === "Enrichment Agent" ? "text-cyan-400" : "text-green-400"
                      }`}>[{log.agent}]</span>{" "}
                      {log.msg}
                      {i === currentLogIdx && <span className="animate-pulse ml-1">▊</span>}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentLogIdx + 1) / agentLogs.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Step {currentLogIdx + 1} of {agentLogs.length} — {agentLogs[currentLogIdx].agent}
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3 font-medium">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          {/* Process Button */}
          {!isProcessing && (
            <div className="mt-12 flex flex-col items-center">
              <button
                onClick={handleProcess}
                disabled={!csvFile || !pdfFile}
                className={`px-10 py-4 rounded-xl font-black text-lg shadow-xl transition-all flex items-center gap-3 ${
                  !csvFile || !pdfFile
                    ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-white/70"
                    : "bg-primary hover:bg-slate-800 dark:bg-accent dark:hover:bg-blue-600 text-white shadow-primary/20 dark:shadow-accent/10 transform hover:-translate-y-1"
                }`}
                id="btn-process"
              >
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                Initialize AI Verification Pipeline
              </button>
              <p className="mt-4 text-xs text-slate-500 font-medium">
                By clicking process, you confirm that you have the authority to share this medical data.
              </p>
            </div>
          )}

          {/* Info Cards */}
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
        </>
      )}
    </main>
  );
}
