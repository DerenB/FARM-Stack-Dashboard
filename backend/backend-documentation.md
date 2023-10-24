
# Setup

- Create `main.py`
- Create a virtual environment
  - `python -m venv venv`
- Start environment
  - `source venv/bin/activate`
- Install packages
  - fastapi
  - motor
  - pydantic
  - python-dotenv
  - uvicorn

# Routes

- Routes can be set up in separate files 
- Documentation:
  - [FastAPI Website](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
  - [Stack Overflow Question](https://stackoverflow.com/questions/70874423/fastapi-importerror-attempted-relative-import-with-no-known-parent-package)
- Sample file structure:
```
|--- app
|   |--- main.py
|   |--- routers
|   |   |--- calendar
|   |   |   |--- calendar-routes.py
|   |   |   |--- calendar-db-routes.py
|   |   |--- todos
|   |   |   |--- todo-routes.py
|   |   |   |--- todo-db-routes.py
```

### Setup Route file

- Import APIRouter
- Create Router
- Add routes to router
- Example:
```
from fastapi import APIRouter

router = APIRouter()

@router.get("/test", tags=["testo"])
def test_path():
    return {"This is the test path."}
```

### Import Routes to main.py

- Import files
  - `from routers import testRoute`
  - Or: `from .routers import testRoute`
- Include the routes imported
  - `app.include_router(testRoute.router)`