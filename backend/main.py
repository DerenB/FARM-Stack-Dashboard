from fastapi import Depends, FastAPI, HTTPException

# Import Starlette for CORS
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

# Import Routes
from routers import testRoute, todo_route

# Origins for CORS
origins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://127.0.0.1:8000/',
    'http://127.0.0.1:8080/',
]

# Create Middleware
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

# Start App
app = FastAPI(middleware=middleware)

# Include the routes imported
app.include_router(testRoute.router)
app.include_router(todo_route.router)

# Home Root
@app.get("/")
def read_root():
    return {"Connected to the Root Object"}