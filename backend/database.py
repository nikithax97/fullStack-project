from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)



# NEW: table to store AI conversations (optional)
# class ConversationMessage(Base):
#     __tablename__ = "conversation_messages"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(String, index=True)              # e.g. "user-1"
#     role = Column(String, nullable=False)             # "user" or "assistant"
#     content = Column(Text, nullable=False)            # message text
#     created_at = Column(DateTime, server_default=func.now())


Base.metadata.create_all(bind=engine)
