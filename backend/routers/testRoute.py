from fastapi import APIRouter

router = APIRouter()

@router.get("/test", tags=["testo"])
def test_path():
    return {"This is the test path."}