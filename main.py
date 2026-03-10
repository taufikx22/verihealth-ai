from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json
from agents import run_agents

app = FastAPI(title="VeriHealth AI Backend")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process_batch")
async def process_batch(
    csv_file: UploadFile = File(...),
    pdf_file: UploadFile = File(...)
):
    try:
        # Save files locally so agents.py can use them
        with open("provider_input.csv", "wb") as buffer:
            shutil.copyfileobj(csv_file.file, buffer)
            
        with open("temp_license.pdf", "wb") as buffer:
            shutil.copyfileobj(pdf_file.file, buffer)
            
        # Execute CrewAI Multi-Agent Workflow
        raw_result = run_agents()
        
        # Try to parse the raw CrewOutput string as JSON
        try:
            result_json = json.loads(str(raw_result))
        except json.JSONDecodeError:
            # Fallback if the agent didn't output perfect JSON
            result_json = {"raw_output": str(raw_result)}
            
        return {"status": "success", "data": result_json}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
