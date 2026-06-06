"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { fetchStats, fetchBatches, type DashboardStats, type BatchSummary } from "@/lib/api";

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, batchesData] = await Promise.all([
          fetchStats(),
          fetchBatches(),
        ]);
        setStats(statsData);
        setBatches(batchesData);
      } catch {
        setError("Could not connect to VeriHealth AI backend. Is the server running on port 8000?");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Find flagged providers across batches for the action timeline
  const flaggedItems = batches
    .flatMap((b) => {
      // We'll show batch-level flags
      const items = [];
      if (b.flagged_count > 0) {
        items.push({
          batchId: b.id,
          type: "flag" as const,
          title: `${b.flagged_count} record(s) flagged in ${b.id}`,
          description: `Batch uploaded by ${b.uploaded_by} — requires manual review`,
          time: new Date(b.created_at).toLocaleString(),
        });
      }
      return items;
    })
    .slice(0, 5);

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
            {error ? "Backend Offline" : "System Operational"}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, Admin.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
            {stats
              ? `You have ${stats.manual_review_pending} records awaiting manual review today.`
              : "Loading dashboard data..."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/ingestion"
            className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2"
            id="btn-upload-data"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
            Upload New Data
          </Link>
          <Link
            href="/dashboard/workbench"
            className="bg-primary hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            id="btn-review-queue"
          >
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
            Review Queue
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-600 dark:text-orange-400 flex items-center gap-3 text-sm font-medium">
          <span className="material-symbols-outlined">warning</span>
          {error} — Showing cached demo data below.
        </div>
      )}

      {/* Metrics Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl animate-pulse h-32"></div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon="dataset"
            iconBg="bg-blue-50 dark:bg-blue-900/20"
            iconColor="text-blue-600 dark:text-blue-400"
            value={stats.total_processed_30d.toLocaleString()}
            label="Total Processed (30d)"
            trend={{ value: "12%", direction: "up" }}
          />
          <MetricCard
            icon="verified"
            iconBg="bg-green-50 dark:bg-green-900/20"
            iconColor="text-green-600 dark:text-green-400"
            value={`${stats.auto_verification_rate}%`}
            label="Auto-Verification Rate"
            trend={{ value: "0.5%", direction: "up" }}
          />
          <MetricCard
            icon="gavel"
            iconBg="bg-orange-50 dark:bg-orange-900/20"
            iconColor="text-orange-600 dark:text-orange-400"
            value={stats.manual_review_pending}
            label="Requires Manual Review"
          />
          <MetricCard
            icon="timer"
            iconBg="bg-purple-50 dark:bg-purple-900/20"
            iconColor="text-purple-600 dark:text-purple-400"
            value={stats.avg_processing_time}
            label="Avg Processing Time"
            trend={{ value: "5%", direction: "down", positive: true }}
          />
        </div>
      ) : null}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Batches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Processing Batches</h3>
              <Link href="/dashboard/analytics" className="text-primary dark:text-accent text-sm font-bold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {batches.length === 0 && !loading && (
                <p className="text-sm text-slate-500 py-4 text-center">No batches processed yet. Upload data to get started.</p>
              )}
              {batches.slice(0, 5).map((batch) => (
                <Link
                  key={batch.id}
                  href={`/dashboard/workbench?batch=${batch.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4"
                  id={`batch-row-${batch.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-background-dark">
                      {batch.status === "Completed" ? (
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                      ) : batch.status === "Processing" ? (
                        <span className="material-symbols-outlined text-blue-500 animate-spin">progress_activity</span>
                      ) : (
                        <span className="material-symbols-outlined text-red-500">error</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Batch {batch.id}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Uploaded by {batch.uploaded_by} • {new Date(batch.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:w-1/3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {batch.total_records} Records
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">
                        Avg {batch.avg_confidence}% conf.
                      </span>
                    </div>
                    <StatusBadge status={batch.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Action Timeline */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Action Needed</h3>
            {flaggedItems.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No flagged items. All clear! ✨</p>
            )}
            <ul className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
              {flaggedItems.map((item, i) => (
                <li key={i} className="relative flex items-start gap-4">
                  <div className="absolute left-0 top-1.5 size-2 rounded-full bg-orange-400 ring-4 ring-white dark:ring-card-dark z-10"></div>
                  <div className="pl-6 w-full text-slate-700 dark:text-slate-300">
                    <p className="text-xs text-slate-400 mb-1">{item.time}</p>
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-3 rounded-lg flex flex-col gap-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-xs">{item.description}</p>
                      <Link
                        href={`/dashboard/workbench?batch=${item.batchId}`}
                        className="text-orange-500 text-xs font-bold mt-1 max-w-max hover:underline"
                      >
                        Review Records →
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
