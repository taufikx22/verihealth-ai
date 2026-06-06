"""
In-memory data store for VeriHealth AI.
Pre-seeded with realistic demo data so the dashboard is never empty.
"""

import uuid
from datetime import datetime, timedelta
from models import (
    BatchSummary, BatchDetail, BatchStatus,
    ProviderRecord, ProviderStatus, ProviderAction, ActionType,
    DashboardStats
)

# ── In-memory stores ────────────────────────────────────────────
_batches: dict[str, BatchDetail] = {}
_uploaded_pdfs: dict[str, str] = {}  # batch_id -> file path on disk


def _generate_batch_id() -> str:
    short = uuid.uuid4().hex[:6].upper()
    return f"VP-{short}"


def _generate_provider_id() -> str:
    return uuid.uuid4().hex[:8]


# ── CRUD helpers ────────────────────────────────────────────────

def get_all_batches() -> list[BatchSummary]:
    """Return summary view of all batches, newest first."""
    summaries = []
    for b in _batches.values():
        summaries.append(BatchSummary(**b.model_dump(exclude={"providers"})))
    summaries.sort(key=lambda x: x.created_at, reverse=True)
    return summaries


def get_batch(batch_id: str) -> BatchDetail | None:
    return _batches.get(batch_id)


def get_batch_providers(batch_id: str) -> list[ProviderRecord] | None:
    batch = _batches.get(batch_id)
    if batch is None:
        return None
    return batch.providers


def create_batch(
    providers: list[ProviderRecord],
    csv_filename: str = "",
    pdf_filename: str = "",
    uploaded_by: str = "System API",
    pdf_path: str | None = None,
) -> BatchDetail:
    batch_id = _generate_batch_id()
    now = datetime.now().isoformat()

    # Assign batch_id to each provider
    for p in providers:
        p.batch_id = batch_id
        if not p.id:
            p.id = _generate_provider_id()

    verified = sum(1 for p in providers if p.status == ProviderStatus.VERIFIED)
    flagged = sum(1 for p in providers if p.status == ProviderStatus.FLAGGED)
    enriched = sum(1 for p in providers if p.status == ProviderStatus.ENRICHED)
    rejected = sum(1 for p in providers if p.status == ProviderStatus.REJECTED)
    avg_conf = (sum(p.confidence_score for p in providers) / len(providers)) if providers else 0

    batch = BatchDetail(
        id=batch_id,
        status=BatchStatus.COMPLETED,
        total_records=len(providers),
        verified_count=verified,
        flagged_count=flagged,
        enriched_count=enriched,
        rejected_count=rejected,
        avg_confidence=round(avg_conf, 1),
        created_at=now,
        completed_at=now,
        uploaded_by=uploaded_by,
        csv_filename=csv_filename,
        pdf_filename=pdf_filename,
        providers=providers,
    )

    _batches[batch_id] = batch

    if pdf_path:
        _uploaded_pdfs[batch_id] = pdf_path

    return batch


def update_provider_action(provider_id: str, action: ProviderAction) -> ProviderRecord | None:
    """Apply an action (approve/flag/reject) to a provider across all batches."""
    for batch in _batches.values():
        for i, p in enumerate(batch.providers):
            if p.id == provider_id:
                now = datetime.now().isoformat()
                if action.action == ActionType.APPROVE:
                    p.status = ProviderStatus.VERIFIED
                    p.confidence_score = max(p.confidence_score, 95.0)
                elif action.action == ActionType.FLAG:
                    p.status = ProviderStatus.FLAGGED
                elif action.action == ActionType.REJECT:
                    p.status = ProviderStatus.REJECTED

                p.notes = action.notes or ""
                p.reviewed_by = action.reviewed_by
                p.reviewed_at = now
                batch.providers[i] = p

                # Recalculate batch stats
                batch.verified_count = sum(1 for pr in batch.providers if pr.status == ProviderStatus.VERIFIED)
                batch.flagged_count = sum(1 for pr in batch.providers if pr.status == ProviderStatus.FLAGGED)
                batch.enriched_count = sum(1 for pr in batch.providers if pr.status == ProviderStatus.ENRICHED)
                batch.rejected_count = sum(1 for pr in batch.providers if pr.status == ProviderStatus.REJECTED)
                batch.avg_confidence = round(
                    sum(pr.confidence_score for pr in batch.providers) / len(batch.providers), 1
                )
                return p
    return None


def get_pdf_path(batch_id: str) -> str | None:
    return _uploaded_pdfs.get(batch_id)


def get_dashboard_stats() -> DashboardStats:
    all_providers = []
    for b in _batches.values():
        all_providers.extend(b.providers)

    total = len(all_providers)
    verified = sum(1 for p in all_providers if p.status == ProviderStatus.VERIFIED)
    flagged = sum(1 for p in all_providers if p.status in (ProviderStatus.FLAGGED, ProviderStatus.PENDING))
    rate = (verified / total * 100) if total > 0 else 0

    return DashboardStats(
        total_processed_30d=total,
        auto_verification_rate=round(rate, 1),
        manual_review_pending=flagged,
        avg_processing_time="< 2m",
        total_batches=len(_batches),
        total_providers=total,
    )


# ── Seed demo data ──────────────────────────────────────────────

def _seed_demo_data():
    """Pre-populate the store with realistic demo batches."""

    now = datetime.now()

    # ── Batch 1: Completed (1 hour ago) ─────────────────────────
    batch1_id = "VP-9020"
    batch1_providers = [
        ProviderRecord(
            id="prov-001",
            batch_id=batch1_id,
            name="Sarah Mitchell, MD",
            npi="1234567890",
            address="789 Wellness Blvd, Suite 200, Boston, MA 02101",
            email="smitchell@bostonmedical.org",
            license_number="MA-2024-INT-42",
            license_expiration="06/30/2027",
            license_status="Active",
            specialty="Internal Medicine",
            status=ProviderStatus.VERIFIED,
            confidence_score=98.0,
            address_match=True,
            npi_verified=True,
            flags=[],
            notes="Perfect match across all sources.",
            field_confidence={
                "name": 99.0, "address": 96.0, "npi": 99.5,
                "license_number": 97.0, "license_expiration": 95.0
            },
        ),
        ProviderRecord(
            id="prov-002",
            batch_id=batch1_id,
            name="James Carter, DO",
            npi="9876543210",
            address="456 Oak Lane, Los Angeles, CA 90012",
            email="jcarter@lahealth.com",
            license_number="CA-889900",
            license_expiration="12/31/2026",
            license_status="Active",
            specialty="Family Medicine",
            status=ProviderStatus.FLAGGED,
            confidence_score=45.0,
            address_match=False,
            npi_verified=True,
            flags=["Address mismatch: NPI registry shows '123 Palm Dr, LA CA 90001'"],
            notes="NPI registry address does not match submitted CSV address.",
            field_confidence={
                "name": 98.0, "address": 32.0, "npi": 99.0,
                "license_number": 88.0, "license_expiration": 91.0
            },
        ),
        ProviderRecord(
            id="prov-003",
            batch_id=batch1_id,
            name="Emily Wong, MD",
            npi="5551234567",
            address="456 Kids Ave, Chicago, IL 60601",
            email="ewong@chicagopeds.com",
            license_number="IL-2025-PED-77",
            license_expiration="01/15/2026",
            license_status="Active",
            specialty="Pediatrics",
            status=ProviderStatus.ENRICHED,
            confidence_score=90.0,
            address_match=True,
            npi_verified=True,
            flags=[],
            notes="License number extracted from uploaded PDF document.",
            field_confidence={
                "name": 97.0, "address": 94.0, "npi": 99.0,
                "license_number": 85.0, "license_expiration": 88.0
            },
        ),
    ]

    _batches[batch1_id] = BatchDetail(
        id=batch1_id,
        status=BatchStatus.COMPLETED,
        total_records=3,
        verified_count=1,
        flagged_count=1,
        enriched_count=1,
        avg_confidence=77.7,
        created_at=(now - timedelta(hours=1)).isoformat(),
        completed_at=(now - timedelta(minutes=55)).isoformat(),
        uploaded_by="Dr. Sarah Chen",
        csv_filename="q2_provider_roster.csv",
        pdf_filename="scanned_licenses_batch.pdf",
        providers=batch1_providers,
    )

    # ── Batch 2: Completed (yesterday) ──────────────────────────
    batch2_id = "VP-9019"
    batch2_providers = [
        ProviderRecord(
            id="prov-004",
            batch_id=batch2_id,
            name="Robert Kim, MD",
            npi="1112223334",
            address="100 University Ave, Palo Alto, CA 94301",
            email="rkim@stanfordhealth.edu",
            license_number="CA-2024-CARD-19",
            license_expiration="08/15/2027",
            license_status="Active",
            specialty="Cardiology",
            status=ProviderStatus.VERIFIED,
            confidence_score=99.0,
            address_match=True,
            npi_verified=True,
            flags=[],
            notes="Full verification complete.",
            field_confidence={
                "name": 99.5, "address": 98.0, "npi": 99.8,
                "license_number": 99.0, "license_expiration": 97.0
            },
        ),
        ProviderRecord(
            id="prov-005",
            batch_id=batch2_id,
            name="Lisa Patel, MD",
            npi="4445556667",
            address="250 Medical Center Dr, Houston, TX 77030",
            email="lpatel@txmedical.org",
            license_number="TX-2023-DERM-55",
            license_expiration="03/01/2026",
            license_status="Active",
            specialty="Dermatology",
            status=ProviderStatus.VERIFIED,
            confidence_score=96.0,
            address_match=True,
            npi_verified=True,
            flags=[],
            notes="Verified successfully.",
            field_confidence={
                "name": 98.0, "address": 95.0, "npi": 99.0,
                "license_number": 93.0, "license_expiration": 94.0
            },
        ),
    ]

    _batches[batch2_id] = BatchDetail(
        id=batch2_id,
        status=BatchStatus.COMPLETED,
        total_records=2,
        verified_count=2,
        flagged_count=0,
        enriched_count=0,
        avg_confidence=97.5,
        created_at=(now - timedelta(days=1)).isoformat(),
        completed_at=(now - timedelta(days=1, hours=-1)).isoformat(),
        uploaded_by="Systems API",
        csv_filename="monthly_roster_may.csv",
        pdf_filename="licenses_may.pdf",
        providers=batch2_providers,
    )

    # ── Batch 3: Completed (3 days ago) ─────────────────────────
    batch3_id = "VP-9018"
    batch3_providers = [
        ProviderRecord(
            id="prov-006",
            batch_id=batch3_id,
            name="Maria Gonzalez, NP",
            npi="7778889990",
            address="300 Riverside Dr, Miami, FL 33101",
            email="mgonzalez@miamihealth.com",
            license_number="FL-2024-NP-101",
            license_expiration="11/30/2026",
            license_status="Active",
            specialty="Nurse Practitioner",
            status=ProviderStatus.VERIFIED,
            confidence_score=94.0,
            address_match=True,
            npi_verified=True,
            flags=[],
            notes="Verified.",
            field_confidence={
                "name": 97.0, "address": 93.0, "npi": 98.0,
                "license_number": 91.0, "license_expiration": 90.0
            },
        ),
        ProviderRecord(
            id="prov-007",
            batch_id=batch3_id,
            name="David Chen, MD",
            npi="3332221110",
            address="55 Harbor View, Seattle, WA 98101",
            email="dchen@nwmedicine.org",
            license_number="",
            license_expiration="",
            license_status="Unknown",
            specialty="Neurology",
            status=ProviderStatus.FLAGGED,
            confidence_score=38.0,
            address_match=True,
            npi_verified=True,
            flags=["Missing license number", "Could not extract license from uploaded document"],
            notes="PDF scan quality too low for extraction. Manual review required.",
            field_confidence={
                "name": 96.0, "address": 91.0, "npi": 99.0,
                "license_number": 12.0, "license_expiration": 15.0
            },
        ),
    ]

    _batches[batch3_id] = BatchDetail(
        id=batch3_id,
        status=BatchStatus.COMPLETED,
        total_records=2,
        verified_count=1,
        flagged_count=1,
        enriched_count=0,
        avg_confidence=66.0,
        created_at=(now - timedelta(days=3)).isoformat(),
        completed_at=(now - timedelta(days=3, hours=-1)).isoformat(),
        uploaded_by="Credentialing Team",
        csv_filename="new_providers_june.csv",
        pdf_filename="license_scans.pdf",
        providers=batch3_providers,
    )


# Auto-seed on import
_seed_demo_data()
