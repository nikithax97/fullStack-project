from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    completed: bool = False

class TaskUpdate(BaseModel):
    title: str
    completed: bool

class TaskOut(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True
