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
@router.get("/todo{title}", tags=["todo"], response_model=ToDo)
async def get_todo_by_title(title):
    response = await read_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no ToDo with this title: {title}")

# Read All ToDos
@router.get("/todo", tags=["todo"])
async def get_todo():
    response = await read_all_todos()
    return response

# Update ToDo
@router.put("/todo/{title}", tags=["todo"], response_model=ToDo)
async def put_todo(title:str, desc:str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {title}")

# Delete ToDo
@router.delete("/todo/{title}", tags=["todo"])
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted ToDo"
    raise HTTPException(404, f"There is no Todo item with this title {title}")