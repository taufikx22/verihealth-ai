"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ConfidencePill from "@/components/ConfidencePill";
import StatusBadge from "@/components/StatusBadge";
import {
  fetchBatches, fetchBatchDetail, updateProviderAction, getBatchDocumentUrl,
  type BatchSummary, type BatchDetail, type ProviderRecord,
} from "@/lib/api";

export default function WorkbenchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center flex-1" style={{ height: "calc(100vh - 65px)" }}>
        <div className="text-slate-500 flex items-center gap-2">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Loading workbench...
        </div>
      </div>
    }>
      <WorkbenchContent />
    </Suspense>
  );
}

function WorkbenchContent() {
  const searchParams = useSearchParams();
  const batchParam = searchParams.get("batch");

  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [batchDetail, setBatchDetail] = useState<BatchDetail | null>(null);
  const [selectedProviderIdx, setSelectedProviderIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Load batches on mount
  useEffect(() => {
    fetchBatches()
      .then((data) => {
        setBatches(data);
        const initial = batchParam || (data.length > 0 ? data[0].id : "");
        setSelectedBatchId(initial);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [batchParam]);

  // Load batch detail when selected batch changes
  useEffect(() => {
    if (!selectedBatchId) return;
    setLoading(true);
    fetchBatchDetail(selectedBatchId)
      .then((detail) => {
        setBatchDetail(detail);
        setSelectedProviderIdx(0);
      })
      .catch(() => setBatchDetail(null))
      .finally(() => setLoading(false));
  }, [selectedBatchId]);

  const currentProvider: ProviderRecord | null =
    batchDetail && batchDetail.providers.length > 0
      ? batchDetail.providers[selectedProviderIdx]
      : null;

  const handleAction = async (action: "approve" | "flag" | "reject") => {
    if (!currentProvider) return;
    setActionLoading(true);
    setActionSuccess(null);
    try {
      const updated = await updateProviderAction(currentProvider.id, action);
      // Update local state
      if (batchDetail) {
        const newProviders = [...batchDetail.providers];
        newProviders[selectedProviderIdx] = updated;
        setBatchDetail({ ...batchDetail, providers: newProviders });
      }
      setActionSuccess(
        action === "approve" ? "Record approved ✓" :
        action === "flag" ? "Record flagged for follow-up" :
        "Record rejected"
      );
      setTimeout(() => setActionSuccess(null), 3000);
    } catch {
      setActionSuccess("Action failed — backend may be offline");
    } finally {
      setActionLoading(false);
    }
  };

  const getFieldConfidence = (field: string): number => {
    return currentProvider?.field_confidence?.[field] ?? 0;
  };

  return (
    <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
      {/* Left Panel: Provider List + Extracted Data */}
      <aside className="w-[420px] flex flex-col border-r border-slate-200 dark:border-border-dark bg-white dark:bg-panel-dark shrink-0">
        {/* Batch Selector */}
        <div className="p-4 border-b border-slate-200 dark:border-border-dark">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Active Batch</label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
            id="batch-selector"
          >
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id} — {b.total_records} providers ({b.status})
              </option>
            ))}
          </select>
        </div>

        {/* Provider List */}
        <div className="border-b border-slate-200 dark:border-border-dark">
          <div className="p-3 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">people</span>
            Providers ({batchDetail?.providers.length || 0})
          </div>
          <div className="max-h-40 overflow-y-auto custom-scrollbar">
            {batchDetail?.providers.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProviderIdx(idx)}
                className={`w-full text-left px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-border-dark transition-colors ${
                  idx === selectedProviderIdx
                    ? "bg-primary/5 dark:bg-accent/10 border-l-2 border-l-primary dark:border-l-accent"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
                id={`provider-btn-${p.id}`}
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-[10px] text-slate-500">NPI: {p.npi}</p>
                </div>
                <StatusBadge status={p.status} />
              </button>
            ))}
          </div>
        </div>

        {/* Extracted Data Fields */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            AI-Extracted Fields
          </div>

          {currentProvider ? (
            <div className="space-y-4">
              {/* Provider Name */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Provider Name</label>
                  <ConfidencePill score={getFieldConfidence("name")} />
                </div>
                <input
                  type="text"
                  defaultValue={currentProvider.name}
                  className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  id="field-name"
                />
              </div>

              {/* Address */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Business Address</label>
                  <ConfidencePill score={getFieldConfidence("address")} />
                </div>
                <textarea
                  rows={2}
                  defaultValue={currentProvider.address}
                  className={`w-full rounded-lg ${
                    !currentProvider.address_match
                      ? "bg-red-50/50 dark:bg-red-500/10 border-red-500/30"
                      : "bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border-dark"
                  } border p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none`}
                  id="field-address"
                />
                {!currentProvider.address_match && (
                  <p className="mt-1 text-[11px] text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Address mismatch detected with NPI registry.
                  </p>
                )}
              </div>

              {/* NPI Number */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">NPI Number</label>
                  <ConfidencePill score={getFieldConfidence("npi")} />
                </div>
                <input
                  type="text"
                  defaultValue={currentProvider.npi}
                  className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  id="field-npi"
                />
              </div>

              {/* License Number */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Medical License Number</label>
                  <ConfidencePill score={getFieldConfidence("license_number")} />
                </div>
                <input
                  type="text"
                  defaultValue={currentProvider.license_number || "(Not extracted)"}
                  className={`w-full rounded-lg ${
                    getFieldConfidence("license_number") < 50
                      ? "bg-red-50/50 dark:bg-red-500/10 border-red-500/30"
                      : "bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-border-dark"
                  } border p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none`}
                  id="field-license"
                />
                {getFieldConfidence("license_number") < 50 && getFieldConfidence("license_number") > 0 && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    Low confidence extraction — please verify manually.
                  </p>
                )}
              </div>

              {/* Specialty */}
              {currentProvider.specialty && (
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 block">Specialty</label>
                  <input
                    type="text"
                    defaultValue={currentProvider.specialty}
                    className="w-full rounded-lg bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                    id="field-specialty"
                  />
                </div>
              )}

              {/* Flags */}
              {currentProvider.flags.length > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-3 rounded-lg">
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">flag</span>
                    Flags ({currentProvider.flags.length})
                  </p>
                  <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
                    {currentProvider.flags.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">Select a provider to view extracted data.</p>
          )}
        </div>
      </aside>

      {/* Right Panel: Document Viewer */}
      <section className="flex-1 bg-slate-200 dark:bg-background-dark relative flex flex-col">
        {/* Document toolbar */}
        <div className="h-12 bg-white dark:bg-panel-dark border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-slate-400 text-lg">description</span>
            <span className="text-sm font-semibold dark:text-slate-300">
              {batchDetail?.pdf_filename || "No document"}
            </span>
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

        {/* Document Content */}
        <div className="flex-1 overflow-auto p-8 flex justify-center custom-scrollbar">
          {/* Rendered license document (mock visualization) */}
          {currentProvider ? (
            <div className="w-full max-w-2xl bg-white shadow-2xl min-h-[800px] p-12 relative border border-slate-300 text-slate-700">
              <div className="absolute top-8 right-12 opacity-20">
                <span className="material-symbols-outlined !text-9xl">workspace_premium</span>
              </div>
              <div className="text-center space-y-4 mb-12">
                <h3 className="text-2xl font-serif font-bold text-slate-800">STATE BOARD OF MEDICINE</h3>
                <div className="h-px w-32 bg-slate-300 mx-auto"></div>
                <p className="text-sm uppercase tracking-[0.2em] font-medium text-slate-600">
                  Physician and Surgeon License
                </p>
              </div>
              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Licensee Name</p>
                  <p className="text-xl font-semibold text-slate-900">{currentProvider.name.toUpperCase()}</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">License Number</p>
                    <p className="text-lg font-mono font-bold text-slate-800">
                      {currentProvider.license_number || "—"}
                    </p>
                    {getFieldConfidence("license_number") < 50 && getFieldConfidence("license_number") > 0 && (
                      <div className="mt-2 inline-block border-2 border-dashed border-red-500 p-1">
                        <p className="text-[8px] text-red-500 font-bold uppercase">
                          Field extraction discrepancy
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <p className="text-lg font-semibold text-green-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      {currentProvider.license_status || "ACTIVE"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">NPI Number</p>
                    <p className="text-base font-mono font-medium">{currentProvider.npi}</p>
                  </div>
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Expiration Date</p>
                    <p className="text-base font-medium">
                      {currentProvider.license_expiration || "—"}
                    </p>
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Address of Record</p>
                  <p className="text-base font-medium">{currentProvider.address}</p>
                  {!currentProvider.address_match && (
                    <div className="mt-2 inline-flex items-center gap-1 border-2 border-dashed border-orange-500 p-1.5 rounded">
                      <span className="material-symbols-outlined text-orange-500 text-sm">warning</span>
                      <p className="text-[9px] text-orange-500 font-bold uppercase">Address mismatch with NPI registry</p>
                    </div>
                  )}
                </div>
                <div className="pt-8">
                  <p className="text-xs text-slate-500 italic text-center">
                    This document certifies that the above-named practitioner has fulfilled all requirements for medical licensure in this state.
                  </p>
                </div>
                <div className="flex justify-between items-end pt-16">
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
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Select a batch and provider to view their document.
            </div>
          )}
        </div>
      </section>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-panel-dark border-t border-slate-200 dark:border-border-dark px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          {currentProvider && (
            <>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">badge</span>
                {currentProvider.name}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">score</span>
                Confidence: {currentProvider.confidence_score}%
              </span>
              <span className="flex items-center gap-1">
                <StatusBadge status={currentProvider.status} />
              </span>
            </>
          )}
          {actionSuccess && (
            <span className="text-green-500 font-bold animate-pulse">{actionSuccess}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Navigation */}
          {batchDetail && batchDetail.providers.length > 1 && (
            <div className="flex items-center gap-2 mr-4 border-r border-slate-200 dark:border-slate-700 pr-4">
              <button
                onClick={() => setSelectedProviderIdx(Math.max(0, selectedProviderIdx - 1))}
                disabled={selectedProviderIdx === 0}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="text-xs font-bold text-slate-500">
                {selectedProviderIdx + 1} / {batchDetail.providers.length}
              </span>
              <button
                onClick={() => setSelectedProviderIdx(Math.min(batchDetail.providers.length - 1, selectedProviderIdx + 1))}
                disabled={selectedProviderIdx === batchDetail.providers.length - 1}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}

          <button
            onClick={() => handleAction("reject")}
            disabled={actionLoading}
            className="px-5 py-2.5 rounded-lg border border-red-500 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-colors disabled:opacity-50"
            id="btn-reject"
          >
            Reject Record
          </button>
          <button
            onClick={() => handleAction("flag")}
            disabled={actionLoading}
            className="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-border-dark text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            id="btn-flag"
          >
            <span className="material-symbols-outlined text-lg">flag</span>
            Flag for Follow-up
          </button>
          <button
            onClick={() => handleAction("approve")}
            disabled={actionLoading}
            className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            id="btn-approve"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Approve Record
          </button>
        </div>
      </div>
    </div>
  );
}
