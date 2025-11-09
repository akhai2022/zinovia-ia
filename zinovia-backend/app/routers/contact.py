"""
Contact form endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from slowapi.util import get_remote_address

from app.database import get_db
from app.models import Contact, FormSubmission
from app.schemas import ContactCreate, ContactResponse
from app.email_service import send_contact_notification

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(
    request: Request,
    contact_data: ContactCreate,
    db: Session = Depends(get_db)
):
    """
    Submit contact form
    """
    try:
        # Create contact record
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            company=contact_data.company,
            message=contact_data.message,
            status="new"
        )
        
        db.add(contact)
        db.commit()
        db.refresh(contact)

        # Log submission for analytics
        submission = FormSubmission(
            form_type="contact",
            form_data=contact_data.dict(),
            ip_address=get_remote_address(request),
            user_agent=request.headers.get("user-agent")
        )
        db.add(submission)
        db.commit()

        # Send email notification (async, don't fail if email fails)
        try:
            await send_contact_notification(contact)
        except Exception as e:
            print(f"Email notification failed: {e}")

        return ContactResponse(
            success=True,
            message="Thank you for your message! We'll get back to you soon.",
            contact_id=contact.id
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit contact form: {str(e)}"
        )
