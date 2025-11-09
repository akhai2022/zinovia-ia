"""
Newsletter subscription endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from slowapi.util import get_remote_address
from datetime import datetime

from app.database import get_db
from app.models import NewsletterSubscriber, FormSubmission
from app.schemas import NewsletterSubscribe, NewsletterResponse
from app.email_service import send_newsletter_welcome

router = APIRouter()


@router.post("/newsletter/subscribe", response_model=NewsletterResponse)
async def subscribe_newsletter(
    request: Request,
    subscription: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """
    Subscribe to newsletter
    """
    try:
        # Check if email already exists
        existing = db.query(NewsletterSubscriber).filter(
            NewsletterSubscriber.email == subscription.email
        ).first()

        if existing:
            if existing.active:
                return NewsletterResponse(
                    success=True,
                    message="You're already subscribed to our newsletter!"
                )
            else:
                # Reactivate subscription
                existing.active = True
                existing.unsubscribed_at = None
                db.commit()
                return NewsletterResponse(
                    success=True,
                    message="Welcome back! You've been resubscribed."
                )

        # Create new subscription
        subscriber = NewsletterSubscriber(
            email=subscription.email,
            active=True
        )

        db.add(subscriber)
        db.commit()
        db.refresh(subscriber)

        # Log submission for analytics
        submission = FormSubmission(
            form_type="newsletter",
            form_data={"email": subscription.email},
            ip_address=get_remote_address(request),
            user_agent=request.headers.get("user-agent")
        )
        db.add(submission)
        db.commit()

        # Send welcome email (async, don't fail if email fails)
        try:
            await send_newsletter_welcome(subscriber.email)
        except Exception as e:
            print(f"Welcome email failed: {e}")

        return NewsletterResponse(
            success=True,
            message="Successfully subscribed to our newsletter!"
        )

    except IntegrityError:
        db.rollback()
        return NewsletterResponse(
            success=True,
            message="You're already subscribed!"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to subscribe: {str(e)}"
        )


@router.post("/newsletter/unsubscribe", response_model=NewsletterResponse)
async def unsubscribe_newsletter(
    subscription: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """
    Unsubscribe from newsletter
    """
    subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == subscription.email
    ).first()

    if subscriber:
        subscriber.active = False
        subscriber.unsubscribed_at = datetime.utcnow()
        db.commit()
        return NewsletterResponse(
            success=True,
            message="Successfully unsubscribed"
        )
    else:
        return NewsletterResponse(
            success=True,
            message="Email not found in our system"
        )
