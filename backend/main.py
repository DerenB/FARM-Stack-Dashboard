from fastapi import Depends, FastAPI, HTTPException

# Import Starlette for CORS
from starlette.middleware.cors import CORSMiddleware

# Import Routes
from routers import testRoute, todo_route, calendar_route

# Start App
app = FastAPI()

# Create Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://localhost:5173", "http://127.0.0.1:8000/", "https://farm-stack-dashboard.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes imported
app.include_router(testRoute.router)
app.include_router(todo_route.router)
app.include_router(calendar_route.router)

# Home Root
@app.get("/")
def read_root():
    return {"Connected to the Root Object"}