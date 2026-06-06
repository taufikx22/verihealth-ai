/**
 * VeriHealth AI — Centralized API Client
 * Typed functions for communicating with the FastAPI backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types

export interface ProviderRecord {
  id: string;
  batch_id: string;
  name: string;
  npi: string;
  address: string;
  email?: string;
  license_number?: string;
  license_expiration?: string;
  license_status?: string;
  specialty?: string;
  status: "Pending" | "Verified" | "Flagged" | "Enriched" | "Rejected";
  confidence_score: number;
  address_match: boolean;
  npi_verified: boolean;
  flags: string[];
  notes: string;
  reviewed_by?: string;
  reviewed_at?: string;
  field_confidence: Record<string, number>;
}

export interface BatchSummary {
  id: string;
  status: "Processing" | "Completed" | "Failed";
  total_records: number;
  verified_count: number;
  flagged_count: number;
  enriched_count: number;
  rejected_count: number;
  avg_confidence: number;
  created_at: string;
  completed_at?: string;
  uploaded_by: string;
  csv_filename?: string;
  pdf_filename?: string;
}

export interface BatchDetail extends BatchSummary {
  providers: ProviderRecord[];
}

export interface DashboardStats {
  total_processed_30d: number;
  auto_verification_rate: number;
  manual_review_pending: number;
  avg_processing_time: string;
  total_batches: number;
  total_providers: number;
}

export interface ProcessingResult {
  batch_id: string;
  status: string;
  message: string;
}

// API Functions

export async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/api/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchBatches(): Promise<BatchSummary[]> {
  const res = await fetch(`${API_BASE}/api/batches`);
  if (!res.ok) throw new Error("Failed to fetch batches");
  return res.json();
}

export async function fetchBatchDetail(batchId: string): Promise<BatchDetail> {
  const res = await fetch(`${API_BASE}/api/batches/${batchId}`);
  if (!res.ok) throw new Error(`Failed to fetch batch ${batchId}`);
  return res.json();
}

export async function fetchBatchProviders(batchId: string): Promise<ProviderRecord[]> {
  const res = await fetch(`${API_BASE}/api/batches/${batchId}/providers`);
  if (!res.ok) throw new Error(`Failed to fetch providers for batch ${batchId}`);
  return res.json();
}

export function getBatchDocumentUrl(batchId: string): string {
  return `${API_BASE}/api/batches/${batchId}/document`;
}

export async function processBatch(csvFile: File, pdfFile: File): Promise<ProcessingResult> {
  const formData = new FormData();
  formData.append("csv_file", csvFile);
  formData.append("pdf_file", pdfFile);

  const res = await fetch(`${API_BASE}/api/process_batch`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Processing failed" }));
    throw new Error(error.detail || "Processing failed");
  }
  return res.json();
}

export async function updateProviderAction(
  providerId: string,
  action: "approve" | "flag" | "reject",
  notes?: string,
  reviewedBy: string = "Admin"
): Promise<ProviderRecord> {
  const res = await fetch(`${API_BASE}/api/providers/${providerId}/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, notes, reviewed_by: reviewedBy }),
  });
  if (!res.ok) throw new Error("Failed to update provider");
  return res.json();
}
