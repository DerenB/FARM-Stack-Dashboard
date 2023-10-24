from pydantic import BaseModel

class CalendarItem(BaseModel):
    id: int
    subject: str
    location: str
    starttime: str
    endtime: str
    categorycolor: str