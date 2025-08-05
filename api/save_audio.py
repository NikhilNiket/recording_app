from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET_NAME = "audio-recordings"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.post("/api/save_audio")
async def save_audio(
    name: str = Form(...),
    email: str = Form(...),
    sample1: UploadFile = Form(...),
    sample2: UploadFile = Form(...)
):
    # Save to Supabase Storage
    folder = f"{name}_{email}"
    sample1_path = f"{folder}/sample1.webm"
    sample2_path = f"{folder}/sample2.webm"

    # Read file bytes
    sample1_bytes = await sample1.read()
    sample2_bytes = await sample2.read()

    # Upload to Supabase
    supabase.storage.from_(BUCKET_NAME).upload(sample1_path, sample1_bytes, file_options={"content-type": "audio/webm"})
    supabase.storage.from_(BUCKET_NAME).upload(sample2_path, sample2_bytes, file_options={"content-type": "audio/webm"})

    return JSONResponse({"status": "success"})