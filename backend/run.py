import uvicorn
import sys

if __name__ == "__main__":
    print("=" * 60)
    print(" [KDU AI Group Formation System - Python FastAPI Backend]")
    print("=" * 60)
    print("Starting server on http://127.0.0.1:8000 ...")
    print("Interactive Swagger Documentation: http://127.0.0.1:8000/docs")
    print("=" * 60)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
