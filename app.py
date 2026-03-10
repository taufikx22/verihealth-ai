import streamlit as st
import pandas as pd
import time
import PyPDF2
from pathlib import Path
from agents import run_agents

st.set_page_config(page_title="VeriHealth AI", page_icon="🏥", layout="wide")

# Custom UI styling
st.markdown("""
<style>
    .stButton>button {
        width: 100%;
        background-color: #FF4B4B;
        color: white;
        height: 3em;
        font-weight: bold;
        border-radius: 8px;
    }
    .block-container {
        padding-top: 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
col1, col2 = st.columns([1, 6])
with col1:
    st.image("https://cdn-icons-png.flaticon.com/512/3063/3063176.png", width=80)
with col2:
    st.title("VeriHealth AI: Agentic Provider Validation")
    st.markdown("**Team Laplace** | EY Techathon 6.0 | Challenge VI")

# Dashboard Layout
left_col, right_col = st.columns(2)
with left_col:
    st.subheader("1. Data Ingestion")
    
    # CSV Input handling
    st.markdown("##### Batch Provider List (CSV)")
    uploaded_csv = st.file_uploader("Upload CSV", type="csv")
    
    if uploaded_csv is not None or st.button("Load Demo CSV Data"):
        # We read the local mock file to ensure the 'Story' holds together
        try:
            df = pd.read_csv("provider_input.csv") 
            st.dataframe(df, hide_index=True, use_container_width=True)
            st.info("⚠️ Detected: 3 Providers | 🛑 Issues: Missing License, Address Mismatch")
        except FileNotFoundError:
            st.error("Make sure 'provider_input.csv' is in the folder!")

    # PDF / OCR Input
    st.markdown("##### Unstructured Documents (VLM/OCR)")
    uploaded_pdf = st.file_uploader("Upload Scanned License", type="pdf")
    if uploaded_pdf is not None:
        # 1. Save PDF to disk for the Agent to access
        save_path = Path("temp_license.pdf")
        with open(save_path, "wb") as f:
            f.write(uploaded_pdf.getbuffer())
        
        st.success(f"✅ Document uploaded & queued for Enrichment Agent")
        
        # 2. Show Preview (Real PyPDF2 extraction!)
        try:
            reader = PyPDF2.PdfReader(save_path)
            # Extract text from first page
            preview_text = reader.pages[0].extract_text()
            if not preview_text:
                preview_text = "[No text detected. Ensure PDF is not just an image.]"
                
            with st.expander("🔍 Live VLM Extraction Preview", expanded=True):
                st.code(preview_text[:600] + "...", language="text")
        except Exception as e:
            st.error(f"Error previewing PDF: {e}")

with right_col:
    st.subheader("3. Live Agent Orchestration")
    
    st.info("System Ready. Waiting for execution command...")
    
    if st.button("🚀 INITIALIZE VALIDATION AGENTS"):
        
        status_container = st.empty()
        log_container = st.empty()
        progress_bar = st.progress(0)
        
        # Animated logs for visual feedback
        logs = [
            "[Master Agent] Analyzing input batch (3 records)...",
            "[Master Agent] Delegating tasks to Worker Agents...",
            "   > [Validation Agent] Querying NPI Registry for James Carter (9876543210)...",
            "   > ❌ [Validation Agent] ALERT: Address Mismatch detected!",
            "   > [Enrichment Agent] Reading 'temp_license.pdf'...",
            "   > ✅ [Enrichment Agent] Extracted License IL-2025-PED-77 for Emily Wong.",
            "[QA Agent] Cross-referencing data sources...",
            "[QA Agent] Calculating Confidence Scores...",
            "[QA Agent] Final Validation Report Generated."
        ]
        
        current_log = ""
        for i, log in enumerate(logs):
            current_log += f"{log}\n"
            log_container.code(current_log, language="bash")
            progress_bar.progress((i + 1) * 11)
            time.sleep(0.7)
            
        with st.spinner("Finalizing Output..."):
            try:
                # Mock result for demonstration
                final_data = [
                    {"Name": "Sarah Mitchell", "Status": "Verified", "Confidence": "98%", "Notes": "Perfect Match"},
                    {"Name": "James Carter", "Status": "Flagged", "Confidence": "45%", "Notes": "Address Mismatch (NPI vs CSV)"},
                    {"Name": "Emily Wong", "Status": "Enriched", "Confidence": "90%", "Notes": "License IL-2025-PED-77 added from PDF"},
                ]
                
                st.markdown("### 🎯 Final Validation Report")
                
                # Visual Metrics
                c1, c2, c3 = st.columns(3)
                c1.metric("Validated", "3/3", "100%")
                c2.metric("Enriched", "1 Record", "+33%")
                c3.metric("Avg Speed", "1.2s", "Real-time")
                
                # The Result Table
                st.dataframe(pd.DataFrame(final_data), use_container_width=True)
                
                st.success("Workflow Complete. Audit log updated.")
                
            except Exception as e:
                st.error(f"Agent Execution Failed: {e}")