"""Create contact-related tables

Revision ID: d24f8c0597d5
Revises: 
Create Date: 2025-11-09 12:00:00.000000
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "d24f8c0597d5"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "contacts",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=50), nullable=False, server_default="new"),
        sa.Column(
            "source", sa.String(length=50), nullable=False, server_default="contact_form"
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=True,
            server_default=sa.text("CURRENT_TIMESTAMP"),
            server_onupdate=sa.text("CURRENT_TIMESTAMP"),
        ),
    )
    op.create_index(
        op.f("ix_contacts_email"),
        "contacts",
        ["email"],
        unique=False,
    )

    op.create_table(
        "newsletter_subscribers",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column(
            "subscribed_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("unsubscribed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "source", sa.String(length=50), nullable=False, server_default="website"
        ),
    )
    op.create_index(
        op.f("ix_newsletter_subscribers_email"),
        "newsletter_subscribers",
        ["email"],
        unique=True,
    )

    op.create_table(
        "form_submissions",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("form_type", sa.String(length=50), nullable=False),
        sa.Column("form_data", sa.JSON(), nullable=True),
        sa.Column("ip_address", sa.String(length=45), nullable=True),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
    )
    op.create_index(
        op.f("ix_form_submissions_form_type"),
        "form_submissions",
        ["form_type"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_form_submissions_form_type"), table_name="form_submissions")
    op.drop_table("form_submissions")

    op.drop_index(
        op.f("ix_newsletter_subscribers_email"), table_name="newsletter_subscribers"
    )
    op.drop_table("newsletter_subscribers")

    op.drop_index(op.f("ix_contacts_email"), table_name="contacts")
    op.drop_table("contacts")

