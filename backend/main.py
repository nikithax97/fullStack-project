from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, Task
from models import TaskCreate, TaskUpdate, TaskOut, LLMRequest, LLMResponse
from llm_service import get_llm_response 

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/tasks", response_model=TaskOut)
def create_task(task: TaskCreate):
    db = next(get_db())
    db_task = Task(title=task.title, completed=task.completed)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks", response_model=list[TaskOut])
def get_tasks():
    db = next(get_db())
    return db.query(Task).all()

@app.put("/tasks/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task: TaskUpdate):
    db = next(get_db())
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.completed = task.completed
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    db = next(get_db())
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}

@app.post("/llm/chat", response_model=LLMResponse)
def chat_with_llm(payload: LLMRequest):
    """
    Accepts user input, calls LLM, returns AI response.
    (Right now we won't save to DB, just respond.)
    """
    try:
        reply = get_llm_response(payload.message)
    except RuntimeError as e:
        # e.g. missing OPENAI_API_KEY
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        # TEMP: show full LLM error so we can debug
        raise HTTPException(status_code=500, detail=f"LLM error: {e}")

    return LLMResponse(reply=reply)

