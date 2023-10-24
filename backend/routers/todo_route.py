from fastapi import APIRouter, HTTPException
from models.todo_model import ToDo

# Create Router
router = APIRouter()

# Import Database Functions
from db_functions.todo_db_functions import (
    create_todo,
    read_one_todo,
    read_all_todos,
    update_todo,
    remove_todo
)

# Create ToDo
@router.post("/todo", tags=["todo"], response_model=ToDo)
async def post_todo(todo:ToDo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

# Read 1 ToDo

# Read All ToDos
@router.get("/todo", tags=["todo"])
async def get_todo():
    response = await read_all_todos()
    return response

# Update ToDo

# Delete ToDo