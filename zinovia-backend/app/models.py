"""
Database models
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from app.database import Base


class Contact(Base):
    """Contact form submissions"""
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(255))
    message = Column(Text)
    status = Column(String(50), default="new")  # new, contacted, qualified, converted
    source = Column(String(50), default="contact_form")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class NewsletterSubscriber(Base):
    """Newsletter subscribers"""
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    active = Column(Boolean, default=True)
    unsubscribed_at = Column(DateTime(timezone=True), nullable=True)
    source = Column(String(50), default="website")


class FormSubmission(Base):
    """Form submissions for analytics"""
    __tablename__ = "form_submissions"

    id = Column(Integer, primary_key=True, index=True)
    form_type = Column(String(50), nullable=False)  # contact, newsletter, demo_request
    form_data = Column(JSON)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

