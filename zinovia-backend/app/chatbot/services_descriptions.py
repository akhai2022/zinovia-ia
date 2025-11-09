from typing import Dict, List

SERVICES: Dict[str, str] = {
    "Web Development & Frontend Apps": "Design and build responsive, accessible web applications with modern stacks tailored to your brand.",
    "Cloud Infrastructure & DevOps": "Architect, deploy, and operate secure cloud platforms on GCP with automation and observability baked in.",
    "AI Chatbots & Automation": "Deliver conversational assistants and workflow automation that integrate with your tools and data.",
    "Data Analytics & Insights": "Unlock insights with data pipelines, dashboards, and ML models tuned to your KPIs.",
}


def format_services_listing() -> str:
    lines: List[str] = []
    for name, description in SERVICES.items():
        lines.append(f"- {name}: {description}")
    return "\n".join(lines)

