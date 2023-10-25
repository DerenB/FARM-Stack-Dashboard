from pydantic import BaseModel

class CalendarItem(BaseModel):
    id: int
    subject: str
    category: str
    starttime: str
    endtime: str