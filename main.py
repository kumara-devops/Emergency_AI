from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AI Emergency Response Backend is Running"}