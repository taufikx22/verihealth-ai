"""
Pydantic models for the VeriHealth AI API.
Defines the data structures for batches, providers, and dashboard statistics.
"""

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from datetime import datetime


class ProviderStatus(str, Enum):
    PENDING = "Pending"
    VERIFIED = "Verified"
    FLAGGED = "Flagged"
    ENRICHED = "Enriched"
    REJECTED = "Rejected"


class ActionType(str, Enum):
    APPROVE = "approve"
    FLAG = "flag"
    REJECT = "reject"


class ProviderRecord(BaseModel):
    id: str
    batch_id: str
    name: str
    npi: str
    address: str
    email: Optional[str] = None
    license_number: Optional[str] = None
    license_expiration: Optional[str] = None
    license_status: Optional[str] = None
    specialty: Optional[str] = None
    status: ProviderStatus = ProviderStatus.PENDING
    confidence_score: float = 0.0
    address_match: bool = True
    npi_verified: bool = False
    flags: list[str] = Field(default_factory=list)
    notes: str = ""
    reviewed_by: Optional[str] = None
    reviewed_at: Optional[str] = None

    # Individual field confidence scores for the workbench
    field_confidence: dict[str, float] = Field(default_factory=dict)


class BatchStatus(str, Enum):
    PROCESSING = "Processing"
    COMPLETED = "Completed"
    FAILED = "Failed"


class BatchSummary(BaseModel):
    id: str
    status: BatchStatus
    total_records: int
    verified_count: int = 0
    flagged_count: int = 0
    enriched_count: int = 0
    rejected_count: int = 0
    avg_confidence: float = 0.0
    created_at: str
    completed_at: Optional[str] = None
    uploaded_by: str = "System API"
    csv_filename: Optional[str] = None
    pdf_filename: Optional[str] = None


class BatchDetail(BatchSummary):
    providers: list[ProviderRecord] = Field(default_factory=list)


class ProviderAction(BaseModel):
    action: ActionType
    notes: Optional[str] = None
    reviewed_by: str = "Admin"


class DashboardStats(BaseModel):
    total_processed_30d: int = 0
    auto_verification_rate: float = 0.0
    manual_review_pending: int = 0
    avg_processing_time: str = "< 2m"
    total_batches: int = 0
    total_providers: int = 0


class ProcessingResult(BaseModel):
    batch_id: str
    status: str
    message: str
