from pydantic import BaseModel, ConfigDict

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

    model_config = ConfigDict(from_attributes=True)


class LLMRequest(BaseModel):
    message: str
    user_id: str | None = None   # optional, for multi-user later


class LLMResponse(BaseModel):
    reply: str
