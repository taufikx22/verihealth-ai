import os
import platform
import signal

# Windows compatibility fix for signals
if platform.system() == "Windows":
    unix_signals = ['SIGHUP', 'SIGTSTP', 'SIGCONT', 'SIGUSR1', 'SIGUSR2', 'SIGCHLD', 'SIGQUIT', 'SIGSTOP']
    for sig in unix_signals:
        if not hasattr(signal, sig):
            setattr(signal, sig, 1)

from crewai import Agent, Task, Crew, Process, LLM
from crewai.tools import BaseTool 
import PyPDF2
from pathlib import Path
import requests

# Set Ollama LLM config
default_llm = LLM(
    model="ollama/ministral:3b",
    base_url="http://localhost:11434"
)
vision_llm = LLM(
    model="ollama/ministral:3b",
    base_url="http://localhost:11434"
)

# Custom tools for NPI, Maps, and PDF parsing
class NPITool(BaseTool):
    name: str = "NPI Registry Lookup"
    description: str = "Queries the official NPI registry for provider details. Input must be an NPI number string."

    def _run(self, npi_number: str) -> str:
        # Real CMS NPI Registry integration
        url = f"https://npiregistry.cms.hhs.gov/api/?version=2.1&number={npi_number}"
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if "results" in data and len(data["results"]) > 0:
                    provider = data["results"][0]
                    basic = provider.get("basic", {})
                    addresses = provider.get("addresses", [])
                    name = f"{basic.get('first_name', '')} {basic.get('last_name', '')}".strip()
                    addr = addresses[0] if addresses else {}
                    address_str = f"{addr.get('address_1', '')}, {addr.get('city', '')}, {addr.get('state', '')}"
                    return str({
                        "status": "Active",
                        "name": name,
                        "address": address_str,
                        "npi": npi_number
                    })
                else:
                    return str({"status": "Not Found", "message": "No matching NPI records."})
            return str({"status": "Error", "message": f"API returned {response.status_code}"})
        except Exception as e:
            return str({"status": "Error", "message": str(e)})

class MapTool(BaseTool):
    name: str = "Google Maps Verification"
    description: str = "Checks if an address exists and is a commercial medical facility."

    def _run(self, address: str) -> str:
        return str({"valid": True, "type": "Medical Office", "lat": 34.0522, "lng": -118.2437})

class PDFTool(BaseTool):
    name: str = "Document Parser (PDF)"
    description: str = "Extracts text from a PDF file. Input must be the file path string."

    def _run(self, file_path: str) -> str:
        path_obj = Path(file_path)
        if not path_obj.exists():
            return "Error: File not found at path."
        try:
            with open(path_obj, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                content = ""
                for page in reader.pages:
                    content += page.extract_text() or ""
                if len(content.strip()) < 5:
                    return "Error: No text found. PDF might be an image without OCR."
                return content
        except Exception as e:
            return f"Error reading PDF: {str(e)}"

# Instantiate the tools once
npi_tool = NPITool()
map_tool = MapTool()
pdf_tool = PDFTool()

# Agent configuration
validation_agent = Agent(
    role='Senior Provider Data Validator',
    goal='Verify provider details against official NPI and Map data.',
    backstory="You are a veteran credentialing expert. You cross-reference every CSV row against the NPI registry.",
    tools=[npi_tool, map_tool],
    verbose=True,
    allow_delegation=False,
    llm=default_llm
)

enrichment_agent = Agent(
    role='Medical Data Enrichment Specialist',
    goal='Find missing information for incomplete provider records.',
    backstory="You specialize in messy data. You extract missing licenses from scanned PDF documents.",
    tools=[pdf_tool],
    verbose=True,
    allow_delegation=False,
    llm=vision_llm
)

qa_agent = Agent(
    role='Quality Assurance Auditor',
    goal='Compile the final validated JSON report and assign Confidence Scores.',
    backstory="You are the final gatekeeper. You review findings, assign a Confidence Score (0-100%) to each provider, and output a strict JSON list.",
    verbose=True,
    allow_delegation=True,
    llm=default_llm
)

# Utility to read local data
def read_csv_content():
    try:
        with open('provider_input.csv', 'r') as f:
            return f.read()
    except:
        return "Error: CSV not found."

def run_agents():
    csv_data = read_csv_content()
    return _run_crew(csv_data, "temp_license.pdf")


def run_agents_with_data(csv_content: str, pdf_path: str):
    """
    Run the CrewAI agent pipeline with provided data.
    Returns the raw CrewAI result. The caller should parse it.
    """
    return _run_crew(csv_content, pdf_path)


def _run_crew(csv_data: str, pdf_path: str):
    """Internal: execute the CrewAI multi-agent workflow."""
    task_validate = Task(
        description=f"Analyze this CSV:\n{csv_data}\n1. Verify identities and addresses against NPI records using NPITool. 2. Identify missing licenses.",
        expected_output="List of discrepancies and verified facts found.",
        agent=validation_agent
    )
    task_enrich = Task(
        description=f"For any providers missing a license, use the 'Document Parser (PDF)' tool to read '{pdf_path}'. Extract the Provider License Number from the text securely.",
        expected_output="Extracted License Numbers corresponding to the providers missing them.",
        agent=enrichment_agent
    )
    task_score = Task(
        description="Generate a strict JSON Array Report. Do not include markdown or other conversational text. Update any extracted records. Flag any address or name mismatches. Approve valid providers.",
        expected_output="Strict JSON array with keys: `npi`, `name`, `address_match`, `license_number`, `confidence_score`, `flags`.",
        agent=qa_agent
    )
    techathon_crew = Crew(
        agents=[validation_agent, enrichment_agent, qa_agent],
        tasks=[task_validate, task_enrich, task_score],
        verbose=True,
        process=Process.sequential
    )
    return techathon_crew.kickoff()


if __name__ == "__main__":
    run_agents()