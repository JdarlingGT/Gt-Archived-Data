from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to GT Explorer API"}

@app.post("/generate-dashboard")
async def generate_dashboard():
    try:
        result = subprocess.run(["python", "generate_dashboard.py"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        return {"error": str(e)}

@app.get("/status")
async def status_check():
    return {"status": "API is running"}