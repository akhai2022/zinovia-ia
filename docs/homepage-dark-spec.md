# Zinovia.ai Dark-Mode Homepage Specification

_Last updated: 2025-11-12_

## 1. Goals & Success Criteria
- Position Zinovia.ai as the fastest, most credible enterprise AI partner (< 24h deployment, 2.5× ROI).
- Improve conversion on “Schedule a Consultation” and “Start Free Trial”.
- Showcase breadth (solutions, industries, platform depth) without overwhelming users.
- Deliver a premium dark-mode experience with optional light theme parity.
- Ensure accessibility (WCAG 2.2 AA) and performance targets (Largest Contentful Paint < 2.5s, CLS < 0.1).

## 2. User Segments & Key Journeys
- **Business decision makers**: Validate credibility, understand outcomes, request consultation.
- **IT leadership / technical evaluators**: Review platform capabilities, security/compliance, integration depth.
- **Champions / practitioners**: Explore specific solutions, pricing, and resources (ROI tools, webinars).

Primary paths: Hero CTA → consultation form; Solutions card → detailed page; Pricing overview → contact; Resource tiles → gated content.

## 3. Page Structure (Top → Bottom)
1. **Hero** (full viewport)
2. **Credibility stats strip**
3. **Core solutions overview**
4. **Industry carousel**
5. **Platform capabilities tabs**
6. **Case study slider**
7. **Pricing snapshot**
8. **Resources grid**
9. **Security & compliance ribbon**
10. **Closing CTA band**
11. **Footer**

Scroll reveals micro-interactions, avoiding parallax overuse.

## 4. Content Copy (Draft)

### Hero
- **Headline**: “Deploy enterprise AI in under 24 hours.”
- **Subhead**: “Zinovia.ai delivers 2.5× ROI with 500+ successful deployments and SOC 2 / HIPAA compliant infrastructure.”
- **Primary CTA**: “Schedule a Consultation”
- **Secondary CTA**: “Start 14-Day Trial”
- **Trust labels**: `98% client satisfaction`, `500+ projects`, `99.9% uptime SLA`

### Solutions Cards
- **AI Chatbots & Virtual Assistants**
  - bullet: “Omnichannel, 50+ languages”
  - bullet: “Sentiment & intent aware”
  - bullet: “Live handoff with full context”
  - CTA: “Explore Chatbots”
- **Document Intelligence Platform**
  - bullet: “OCR accuracy 99.5%”
  - bullet: “Structured & unstructured ingestion”
  - bullet: “Compliance automation”
  - CTA: “Explore Document AI”
- **Autonomous AI Agents**
  - bullet: “Orchestrate 500+ integrations”
  - bullet: “Predictive insights in real time”
  - bullet: “Self-healing workflows”
  - CTA: “Explore Agents”

### Industry Carousel Cards
- Finance: “Reduce fraud losses by 45%”
- Healthcare: “Automate HIPAA-compliant workflows”
- Retail & E-commerce: “Boost conversions 35% with personalization”
- Manufacturing: “Cut downtime 45% via predictive maintenance”
- Legal & Professional: “Review contracts 10× faster”
- Education: “Personalize learning journeys at scale”

Each includes “See success stories”.

### Platform Tabs (copy condensed for each tab state)
- **Models & Intelligence**: “GPT-4, Claude 3, Gemini Pro, proprietary RAG. Fine-tuning, multi-modal, continuous learning.”
- **Security & Compliance**: “SOC 2 Type II, ISO 27001, HIPAA, GDPR, CCPA. Enterprise SSO, MFA, audit trails.”
- **Integrations**: “500+ connectors, REST/GraphQL APIs, webhooks, legacy system adapters.”
- **Deployment & Scale**: “Cloud, hybrid, on-premise, edge. Auto-scaling to millions of requests, < 100 ms response.”

### Case Studies
- TechRetail Inc.: “68% support cost reduction, 4.8 CSAT, ROI in 3 months.”
- FinanceFirst: “Document processing from days to minutes, 80% cost reduction.”
- HealthCare Partners: “HIPAA compliance, 35% higher patient satisfaction.”

### Pricing Snapshot
- **Starter — $2,499/mo**: “1 solution, 10k interactions, email support, 14-day trial.”
- **Professional — $7,999/mo**: “3 solutions, unlimited interactions, advanced analytics, priority SLA, integrations.”
- **Enterprise — Custom**: “Unlimited solutions, white-label, 24/7 support, on-prem options, dedicated team.”

### Resource Tiles
- AI Readiness Assessment (interactive tool)
- ROI Calculator (gated)
- Webinar Series (monthly)
- Industry Reports (download)

### Compliance Ribbon
Badges: SOC 2 Type II, HIPAA, GDPR, ISO 27001, PCI DSS, CCPA.

### Closing CTA
Copy: “Transform AI operations in weeks, not months.”  
Primary CTA: “Talk to an Expert”  
Secondary CTA: “Download ROI Guide”

### Footer
- Mission blurb: “Global enterprise AI partner delivering measurable value in weeks.”
- Link columns: `Solutions`, `Industries`, `Platform`, `Resources`, `Company`.
- Contact info: `hello@zinovia.ai`, `+1 (555) 123-4567`, address placeholder.
- Newsletter input with consent copy.

## 5. Visual Direction

### Color Tokens
```
--surface-primary-dark: #05070F
--surface-elevated-dark: rgba(12, 18, 36, 0.8)
--surface-glass-outline: rgba(112, 227, 255, 0.35)
--accent-primary: #5BF5FF
--accent-secondary: #8E54FF
--accent-warm: #FF8C69
--text-primary-dark: #F5F9FF
--text-secondary-dark: rgba(229, 237, 255, 0.72)
--text-muted-dark: rgba(229, 237, 255, 0.48)
--border-strong-dark: rgba(112, 227, 255, 0.6)
--shadow-glass: 0 20px 40px -25px rgba(91, 245, 255, 0.6)
--gradient-hero: linear-gradient(135deg, #05070F 0%, #111A2E 45%, #1C2740 100%)
```

### Typography
- Headings: `Sora` (600/700). Fallbacks: `Segoe UI`, `sans-serif`.
- Body: `Inter` (400/500). Fallback: `system-ui`, `sans-serif`.
- Scale: `H1 64/72`, `H2 48/56`, `H3 36/44`, `Body 18/28`, `Caption 14/20`.
- Tracking: -1% for large headings, 0 for body.

### Spacing & Layout
- Base spacing unit: 8px.
- Container max width: 1200px centered, 24px horizontal padding mobile.
- Section spacing: 112px desktop, 80px tablet, 64px mobile.
- Cards: 24px padding, 24px gap.

### Imagery & Motion
- Background: gradients + particle animation (low opacity) in hero.
- Illustrations: abstract 3D isometric shapes (glowing nodes, network meshes).
- Micro-interactions: 200–300ms ease-in-out transitions for hover/focus; use framer-motion or CSS keyframes.
- Scroll reveal: fade-in + slide 24px upward with 150ms stagger.
- CTA hover: accent gradient sweep, drop shadow to `shadow-glass`.

### Accessibility
- Contrast ratios: maintain ≥ 4.5:1 for body text, 3:1 for large headings.
- Focus styles: 2px outline using `--accent-primary`.
- All interactive elements keyboard navigable; pause/stop motion options where needed.

## 6. Component Blueprints

### HeroSection
- Props: `headline`, `subhead`, `primaryCta`, `secondaryCta`, `stats[]`.
- Layout: Split 60/40 text vs. supporting visual (animated graphic).
- Visual: Particle canvas behind CTA block; CTAs stacked mobile.

### StatStrip
- Horizontal list of `StatBadge` components.
- Each badge: icon circle + number + label; glass background, neon edge glow.

### SolutionCard
- Content: icon, title, bullets (max 3), CTA button.
- Hover: lift, accent outline, subtle blur background.
- Layout grid: 3 columns desktop, 1 column mobile.

### IndustryCarousel
- Implementation: horizontal scroll with buttons, or embla/flickity slider.
- Each slide: industry icon, headline metric, supporting copy, CTA link.
- Autoplay optional with accessible controls.

### PlatformTabs
- Tab list top; content area with icon, heading, bullet list (3–4 items).
- Active tab highlight: accent glow + underline.

### CaseStudySlider
- Slide card: client logo, challenge/solution/outcome bullet stack, CTA.
- Include navigation dots + arrows; ensure swipe support.

### PricingMatrix
- Toggle for monthly/annual (store state; adjust price text).
- Highlight “Professional” column with accent border and badge.
- Include quick CTA per column.

### ResourceGrid
- 2×2 layout; cards with icon, title, short description, arrow link.
- Add badge to indicate gated download if applicable.

### ComplianceRibbon
- Inline badge list with tooltips optional (for certification descriptions).
- Background slightly lighter surface for contrast.

### ClosingCTA
- Centered text & button stack; background gradient overlay.
- Optionally include background illustration or pattern.

### Footer
- 3 columns desktop, stack mobile.
- Newsletter form with email validation, dark input, accent border on focus.

## 7. Responsive Behavior
- **Desktop (≥ 1200px)**: 3-column sections, hero text left / visual right.
- **Tablet (768–1199px)**: reduce grid to 2 columns, hero visual below text.
- **Mobile (< 768px)**: single-column stack, collapse navigation to hamburger with sticky header.
- Maintain CTA visibility; ensure carousels use drag gestures.

## 8. Dark/Light Theme Strategy
- Use CSS variables at root: `:root` for light, `[data-theme="dark"]` overrides.
- Respect `prefers-color-scheme`; provide UI toggle in header (moon/sun icon).
- Persist preference via localStorage (e.g., `next-themes` in ThemeProvider).
- Ensure imagery and illustrations have dark-compatible versions or use duotone filters.

## 9. Implementation Plan (Step-by-step)
1. **Design tokens**: Define in `app/theme/theme.css` (or Tailwind config) using variables above.
2. **Create shared components**: `HeroSection`, `StatStrip`, `SolutionCard`, etc. in `components/sections/`.
3. **Update layout wrapper**: Ensure ThemeProvider handles dark mode toggle, injects CSS variables.
4. **Implement homepage layout (`app/page.tsx`)**:
   - Replace legacy sections with new structure.
   - Use new components, pass drafted content.
5. **Add supporting assets**: update `public/` with hero artwork, industry icons, certification badges.
6. **QA**: Accessibility (axe, keyboard), responsive testing, performance audit.
7. **Stakeholder review**: Deploy to preview environment (Vercel preview or staging).
8. **Iterate**: Capture feedback, adjust sections incrementally.

## 10. Validation Checklist
- [ ] Dark mode default, light mode toggle works.
- [ ] Hero copy resonates with stakeholders.
- [ ] CTAs tracked via analytics.
- [ ] Sections render cleanly on mobile/tablet/desktop.
- [ ] Animations performant (< 60fps).
- [ ] Accessibility audit passes (contrast, focus, semantics).
- [ ] No build artifacts committed (verify `.next/` ignored).
- [ ] Preview link reviewed before production deploy.

## 11. References & Inspiration
- Runway (runwayml.com) — motion-heavy hero.
- Scale AI — clean enterprise layout.
- UiPath — enterprise automation credibility.
- 2025 UI trends: glassmorphism, bold type, micro-interactions [[webosmotic.com](https://webosmotic.com/blog/ui-ux-design-trends-for-2025/?utm_source=openai)], dark mode adoption [[sprints.ai](https://sprints.ai/ar/blog/UI-UX-Design-Trends-2025?utm_source=openai)], neumorphism accents [[intelegain.com](https://www.intelegain.com/ui-ux-design-trends-of-2025-next-gen-experiences/?utm_source=openai)], micro-interactions [[dev.to](https://dev.to/dct_technology/7-uiux-design-trends-you-cant-ignore-in-2025-251?utm_source=openai)].

---

Next actions: implement design tokens and Hero section to deliver first visible slice for review.


