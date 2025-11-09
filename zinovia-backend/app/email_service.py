"""
Email service for sending notifications
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from app.models import Contact


async def send_contact_notification(contact: Contact):
    """
    Send email notification when contact form is submitted
    """
    # Check if email is enabled
    if os.getenv("EMAIL_ENABLED", "false").lower() != "true":
        print("Email notifications disabled")
        return

    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    admin_email = os.getenv("ADMIN_EMAIL", smtp_user)

    if not smtp_user or not smtp_password:
        print("Email credentials not configured")
        return

    # Create message
    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = admin_email
    msg["Subject"] = f"New Contact Form Submission from {contact.name}"

    body = f"""
    New contact form submission received:
    
    Name: {contact.name}
    Email: {contact.email}
    Company: {contact.company}
    
    Message:
    {contact.message}
    
    ---
    Submitted at: {contact.created_at}
    """
    msg.attach(MIMEText(body, "plain"))

    # Send email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        print(f"Contact notification sent to {admin_email}")
    except Exception as e:
        print(f"Failed to send contact notification: {e}")


async def send_newsletter_welcome(email: str):
    """
    Send welcome email to new newsletter subscribers
    """
    # Check if email is enabled
    if os.getenv("EMAIL_ENABLED", "false").lower() != "true":
        print("Email notifications disabled")
        return

    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    if not smtp_user or not smtp_password:
        print("Email credentials not configured")
        return

    # Create message
    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = email
    msg["Subject"] = "Welcome to Zinovia Newsletter!"

    body = """
    Thank you for subscribing to the Zinovia newsletter!
    
    You'll receive updates about:
    - Latest AI solutions and innovations
    - Industry insights and best practices
    - Product updates and new features
    - Exclusive offers and resources
    
    We're excited to have you on board!
    
    Best regards,
    The Zinovia Team
    """
    msg.attach(MIMEText(body, "plain"))

    # Send email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        print(f"Welcome email sent to {email}")
    except Exception as e:
        print(f"Failed to send welcome email: {e}")

