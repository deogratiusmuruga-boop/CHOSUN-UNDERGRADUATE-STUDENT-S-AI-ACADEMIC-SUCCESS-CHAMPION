from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(255), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    owner = relationship("User")


# MEMBER 2 - Academic Resources (notes, past papers, study guides)
class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # "note" | "pastpaper" | "study_guide"
    course = Column(String(100), nullable=True)
    year = Column(String(10), nullable=True)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(255), nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    uploader = relationship("User")


# MEMBER 1 - AI & Chatbot
class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text, nullable=False)
    reply = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User")


# MEMBER 3 - Scholarships & Projects
class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    field = Column(String(100), nullable=True)
    deadline = Column(String(50), nullable=True)
    link = Column(String(255), nullable=True)
    added_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    link = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    file_path = Column(String(255), nullable=True)
    added_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)