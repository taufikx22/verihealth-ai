"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { fetchStats, fetchBatches, type DashboardStats, type BatchSummary } from "@/lib/api";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, b] = await Promise.all([fetchStats(), fetchBatches()]);
        setStats(s);
        setBatches(b);
      } catch {
        // Use empty defaults
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Calculate chart data from batches
  const totalProviders = stats?.total_providers || 0;
  const verifiedCount = batches.reduce((acc, b) => acc + b.verified_count, 0);
  const flaggedCount = batches.reduce((acc, b) => acc + b.flagged_count, 0);
  const enrichedCount = batches.reduce((acc, b) => acc + b.enriched_count, 0);
  const rejectedCount = batches.reduce((acc, b) => acc + b.rejected_count, 0);

  // Calculate donut percentages
  const total = verifiedCount + flaggedCount + enrichedCount + rejectedCount || 1;
  const verifiedPct = Math.round((verifiedCount / total) * 100);
  const flaggedPct = Math.round((flaggedCount / total) * 100);
  const enrichedPct = Math.round((enrichedCount / total) * 100);
  const rejectedPct = 100 - verifiedPct - flaggedPct - enrichedPct;

  return (
    <div className="flex flex-1">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark p-4 hidden lg:flex flex-col gap-2 shrink-0">
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
                <span>Dashboard</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-semibold">Analytics</span>
              </nav>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Post-Ingestion Insights
              </h1>
              <p className="text-slate-500 text-sm max-w-lg">
                Comprehensive processing metrics and data distribution across clinical providers.
              </p>
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-5 rounded-xl animate-pulse h-28"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard
                icon="dataset"
                iconBg="bg-blue-50 dark:bg-blue-900/20"
                iconColor="text-blue-600 dark:text-blue-400"
                value={totalProviders.toLocaleString()}
                label="Total Records"
                trend={{ value: "12.5%", direction: "up" }}
              />
              <MetricCard
                icon="verified"
                iconBg="bg-green-50 dark:bg-green-900/20"
                iconColor="text-green-600 dark:text-green-400"
                value={`${stats?.auto_verification_rate || 0}%`}
                label="Accuracy Rate"
                trend={{ value: "0.2%", direction: "up" }}
              />
              <MetricCard
                icon="timer"
                iconBg="bg-purple-50 dark:bg-purple-900/20"
                iconColor="text-purple-600 dark:text-purple-400"
                value={stats?.avg_processing_time || "—"}
                label="Avg Latency"
                trend={{ value: "4.1%", direction: "down", positive: true }}
              />
              <MetricCard
                icon="health_metrics"
                iconBg="bg-green-50 dark:bg-green-900/20"
                iconColor="text-green-600 dark:text-green-400"
                value="99.98%"
                label="Data Health"
                badge={{ text: "OPTIMAL", color: "bg-green-500/20 text-green-500" }}
              />
            </div>
          )}

          {/* Visualization Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Processing Trends Chart */}
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
                  <span className="text-[10px] text-slate-400">Week 1</span>
                  <span className="text-[10px] text-slate-400">Week 2</span>
                  <span className="text-[10px] text-slate-400">Week 3</span>
                  <span className="text-[10px] text-slate-400">Week 4</span>
                  <span className="text-[10px] text-slate-400">Now</span>
                </div>
              </div>
            </div>

            {/* Donut Chart: Provider Status Distribution */}
            <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 p-6 rounded-xl flex flex-col">
              <div className="mb-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">Provider Status Distribution</h3>
                <p className="text-xs text-slate-500">Breakdown of verification outcomes</p>
              </div>
              <div className="flex flex-1 items-center justify-center gap-8">
                <div className="relative size-40">
                  <svg viewBox="0 0 36 36" className="size-full rotate-[-90deg]">
                    <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" className="stroke-slate-200 dark:stroke-primary/20"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray={`${verifiedPct}, 100`} strokeDashoffset="0" className="stroke-green-500"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray={`${enrichedPct}, 100`} strokeDashoffset={`-${verifiedPct}`} className="stroke-blue-400"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray={`${flaggedPct}, 100`} strokeDashoffset={`-${verifiedPct + enrichedPct}`} className="stroke-orange-500"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3.5" strokeDasharray={`${rejectedPct}, 100`} strokeDashoffset={`-${verifiedPct + enrichedPct + flaggedPct}`} className="stroke-red-500"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black">{totalProviders}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-sm bg-green-500"></span>
                    <span className="text-xs font-medium w-24">Verified</span>
                    <span className="text-xs font-bold text-slate-400">{verifiedCount} ({verifiedPct}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-sm bg-blue-400"></span>
                    <span className="text-xs font-medium w-24">Enriched</span>
                    <span className="text-xs font-bold text-slate-400">{enrichedCount} ({enrichedPct}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-sm bg-orange-500"></span>
                    <span className="text-xs font-medium w-24">Flagged</span>
                    <span className="text-xs font-bold text-slate-400">{flaggedCount} ({flaggedPct}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-sm bg-red-500"></span>
                    <span className="text-xs font-medium w-24">Rejected</span>
                    <span className="text-xs font-bold text-slate-400">{rejectedCount} ({rejectedPct}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Batches Table */}
          <div className="mt-8 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-primary/20 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Recent Processing Batches</h3>
              <span className="text-xs text-slate-500">{batches.length} batches total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-primary/30 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-6 py-3">Batch ID</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Total Records</th>
                    <th className="px-6 py-3">Avg Confidence</th>
                    <th className="px-6 py-3">Uploaded By</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                  {batches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold">#{batch.id}</td>
                      <td className="px-6 py-4"><StatusBadge status={batch.status} /></td>
                      <td className="px-6 py-4">{batch.total_records}</td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${batch.avg_confidence >= 80 ? "text-green-500" : batch.avg_confidence >= 50 ? "text-orange-500" : "text-red-500"}`}>
                          {batch.avg_confidence}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{batch.uploaded_by}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/workbench?batch=${batch.id}`} className="text-primary hover:underline font-bold">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {batches.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No batches processed yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
