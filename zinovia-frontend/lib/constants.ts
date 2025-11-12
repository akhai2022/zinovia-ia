export const siteConfig = {
  name: "Zinovia",
  description:
    "Transform Your Business with Intelligent AI Solutions. We build custom AI agents, chatbots, and automation systems that work 24/7 to streamline your operations and delight your customers.",
  url: "https://zinovia.com",
  ogImage: "/og-image.jpg",
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Platform", href: "/platform" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const heroContent = {
  tagline: "Enterprise AI, Delivered Fast",
  headline: "Deploy enterprise AI in under 24 hours.",
  subheading:
    "Zinovia.ai delivers 2.5× ROI with 500+ successful deployments and SOC 2 / HIPAA compliant infrastructure.",
  primaryAction: {
    label: "Schedule a Consultation",
    href: "/contact?intent=consultation",
  },
  secondaryAction: {
    label: "Start 14-Day Trial",
    href: "/pricing",
  },
  stats: [
    { label: "Go-live", value: "< 24h", description: "From strategy to production" },
    { label: "ROI", value: "2.5×", description: "Average return in year one" },
    { label: "Success", value: "500+", description: "Enterprise deployments" },
  ],
};

export const services = [
  {
    id: 1,
    title: "Custom AI Chatbots",
    description: "Conversations that convert, 24/7",
    icon: "message-circle",
    features: [
      "Natural language processing",
      "Multi-channel support",
      "Custom training on your data",
      "Analytics & insights",
    ],
  },
  {
    id: 2,
    title: "Document Intelligence",
    description: "Extract insights from documents in seconds",
    icon: "file-text",
    features: [
      "Automated data extraction",
      "OCR & document parsing",
      "Smart categorization",
      "Integration ready",
    ],
  },
  {
    id: 3,
    title: "AI Agent Systems",
    description: "Autonomous agents that handle complex workflows",
    icon: "bot",
    features: [
      "Workflow automation",
      "Decision-making capabilities",
      "Multi-step task execution",
      "API integrations",
    ],
  },
] as const;

export const stats = [
  {
    id: 1,
    value: 98,
    suffix: "%",
    label: "Customer Satisfaction",
    description: "Clients rate us excellent",
  },
  {
    id: 2,
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful implementations",
  },
  {
    id: 3,
    value: 73,
    suffix: "%",
    label: "Average Cost Reduction",
    description: "In operational expenses",
  },
  {
    id: 4,
    value: 2.5,
    suffix: "x",
    label: "ROI in First Year",
    description: "Return on investment",
  },
] as const;

export const howItWorks = [
  {
    id: 1,
    title: "Discovery Call",
    description: "We learn about your challenges and goals",
    icon: "phone",
  },
  {
    id: 2,
    title: "Custom Strategy",
    description: "We design a tailored AI solution",
    icon: "lightbulb",
  },
  {
    id: 3,
    title: "Development",
    description: "Our team builds and tests your system",
    icon: "code",
  },
  {
    id: 4,
    title: "Launch & Optimize",
    description: "We deploy and continuously improve",
    icon: "rocket",
  },
] as const;

export const testimonials = [
  {
    id: 1,
    quote:
      "Zinovia transformed our customer support with their AI chatbot. Response times dropped by 80% and customer satisfaction increased significantly.",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
    company: "TechCorp",
  },
  {
    id: 2,
    quote:
      "The document intelligence system from Zinovia processes thousands of documents daily, saving us countless hours of manual work.",
    author: "Michael Chen",
    role: "Operations Director, DataFlow",
    company: "DataFlow",
  },
  {
    id: 3,
    quote:
      "Working with Zinovia was seamless. Their AI agents handle our complex workflows perfectly, and we've seen a 2.5x ROI in just 8 months.",
    author: "Emily Rodriguez",
    role: "CTO, InnovateLabs",
    company: "InnovateLabs",
  },
] as const;

export const caseStudies = [
  {
    id: 1,
    title: "E-commerce Support Transformation",
    industry: "Retail",
    description:
      "Reduced support tickets by 70% with intelligent chatbot implementation",
    results: ["70% reduction in support tickets", "24/7 availability", "95% satisfaction rate"],
  },
  {
    id: 2,
    title: "Financial Document Processing",
    industry: "Finance",
    description:
      "Automated invoice processing for a Fortune 500 company",
    results: ["50K+ documents/month processed", "99.5% accuracy", "60% cost savings"],
  },
  {
    id: 3,
    title: "Healthcare Workflow Automation",
    industry: "Healthcare",
    description:
      "AI agents managing patient intake and scheduling",
    results: ["40% faster processing", "Zero errors", "Improved patient experience"],
  },
  {
    id: 4,
    title: "Manufacturing Quality Control",
    industry: "Manufacturing",
    description:
      "AI-powered quality inspection system",
    results: ["30% defect reduction", "Real-time alerts", "Cost optimization"],
  },
] as const;

export const companyInfo = {
  name: "Zinovia",
  tagline: "Intelligent AI Solutions for Modern Businesses",
  email: "hello@zinovia.com",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Drive, San Francisco, CA 94102",
  social: {
    twitter: "https://twitter.com/zinovia",
    linkedin: "https://linkedin.com/company/zinovia",
    github: "https://github.com/zinovia",
  },
};

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$2,500",
    priceAnnual: "$2,000",
    period: "per month",
    description: "Perfect for small teams getting started with AI",
    features: [
      "Up to 10,000 messages/month",
      "5 document processing workflows",
      "Email support",
      "Basic analytics dashboard",
      "API access",
      "Custom chatbot (1)",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$7,500",
    priceAnnual: "$6,000",
    period: "per month",
    description: "For growing businesses with advanced needs",
    features: [
      "Up to 100,000 messages/month",
      "Unlimited document processing",
      "Priority support",
      "Advanced analytics",
      "API access + webhooks",
      "Custom chatbots (5)",
      "AI agent workflows",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    priceAnnual: "Custom",
    period: "pricing",
    description: "For organizations with scale and security needs",
    features: [
      "Unlimited messages",
      "Unlimited processing",
      "Dedicated support manager",
      "Custom analytics",
      "Full API suite",
      "Unlimited chatbots & agents",
      "White-label options",
      "On-premise deployment",
      "SSO & advanced security",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

export const platformFeatures = {
  chatbots: [
    {
      title: "Multi-language Support",
      description: "Native support for 50+ languages with automatic detection",
      icon: "globe",
    },
    {
      title: "Voice Integration",
      description: "Voice-to-text and text-to-speech for seamless conversations",
      icon: "mic",
    },
    {
      title: "Sentiment Analysis",
      description: "Real-time emotional intelligence and sentiment tracking",
      icon: "heart",
    },
    {
      title: "Omnichannel Routing",
      description: "Connect to WhatsApp, Telegram, SMS, email, and more",
      icon: "network",
    },
    {
      title: "A/B Testing",
      description: "Optimize conversations with built-in testing tools",
      icon: "flask",
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights into conversations, conversions, and satisfaction",
      icon: "bar-chart",
    },
  ],
  documentIntelligence: [
    {
      title: "Handwriting Recognition",
      description: "AI-powered handwriting analysis with 95%+ accuracy",
      icon: "pen-tool",
    },
    {
      title: "Table Extraction",
      description: "Intelligent table detection and structure preservation",
      icon: "table",
    },
    {
      title: "Multi-language OCR",
      description: "Extract text from documents in 100+ languages",
      icon: "file-text",
    },
    {
      title: "Version Tracking",
      description: "Track document changes and maintain audit trails",
      icon: "git-branch",
    },
    {
      title: "Compliance Scanning",
      description: "Automated GDPR, HIPAA, and SOC2 compliance checks",
      icon: "shield",
    },
    {
      title: "Batch Processing",
      description: "Process millions of documents with parallel processing",
      icon: "layers",
    },
  ],
  agents: [
    {
      title: "Self-healing Workflows",
      description: "Automatic error detection and recovery in complex workflows",
      icon: "refresh-cw",
    },
    {
      title: "Multi-agent Orchestration",
      description: "Coordinate multiple agents working on related tasks",
      icon: "network",
    },
    {
      title: "Predictive Alerts",
      description: "Get notified before issues occur with ML-powered predictions",
      icon: "bell",
    },
    {
      title: "Knowledge Graph Support",
      description: "Build and query semantic knowledge graphs",
      icon: "mesh",
    },
    {
      title: "API Auto-discovery",
      description: "Automatically discover and integrate with available APIs",
      icon: "plug",
    },
    {
      title: "Custom Learning",
      description: "Continuously improve with feedback and retraining",
      icon: "brain",
    },
  ],
} as const;

export const industrySolutions = {
  healthcare: {
    title: "Healthcare AI Solutions",
    description:
      "HIPAA-compliant AI solutions for medical practices, hospitals, and healthcare providers",
    hero: {
      headline: "Transform Healthcare with Intelligent AI",
      subheading:
        "Patient data management, clinical decision support, and compliance automation built for healthcare",
    },
    features: [
      "HIPAA-compliant patient data management",
      "Medical record analysis and triage",
      "Drug interaction checking",
      "Appointment scheduling automation",
      "Insurance claim processing",
      "Clinical decision support systems",
    ],
    benefits: [
      "40% faster patient processing",
      "Zero compliance violations",
      "Improved patient satisfaction",
      "Reduced administrative burden",
    ],
  },
  finance: {
    title: "Financial Services AI",
    description:
      "Secure, compliant AI solutions for banks, insurance, and fintech companies",
    hero: {
      headline: "Secure Financial AI Platform",
      subheading:
        "Fraud detection, risk assessment, and regulatory compliance for financial institutions",
    },
    features: [
      "Fraud detection and prevention",
      "Credit scoring automation",
      "KYC/AML compliance checks",
      "Market analysis tools",
      "Customer onboarding automation",
      "Loan processing workflows",
    ],
    benefits: [
      "99.9% fraud detection accuracy",
      "60% faster loan processing",
      "Zero regulatory violations",
      "Improved customer experience",
    ],
  },
  ecommerce: {
    title: "E-commerce AI Solutions",
    description:
      "AI-powered tools to boost sales, optimize inventory, and delight customers",
    hero: {
      headline: "AI That Grows Your E-commerce",
      subheading:
        "Product recommendations, inventory optimization, and customer automation",
    },
    features: [
      "AI product recommendations",
      "Inventory optimization",
      "Dynamic pricing strategies",
      "Smart customer chatbots",
      "Returns automation",
      "Supply chain optimization",
    ],
    benefits: [
      "30% increase in conversions",
      "25% inventory cost reduction",
      "80% faster response times",
      "Improved customer retention",
    ],
  },
  manufacturing: {
    title: "Manufacturing AI Platform",
    description:
      "Predictive maintenance, quality control, and production optimization",
    hero: {
      headline: "Smart Manufacturing with AI",
      subheading:
        "Predictive maintenance, quality control, and production line optimization",
    },
    features: [
      "Predictive maintenance alerts",
      "AI-powered quality control",
      "Production line optimization",
      "Supply chain visibility",
      "Safety compliance monitoring",
      "Energy consumption optimization",
    ],
    benefits: [
      "30% reduction in downtime",
      "40% fewer defects",
      "20% energy savings",
      "Improved safety scores",
    ],
  },
  legal: {
    title: "Legal & Professional Services AI",
    description:
      "Contract analysis, legal research, and compliance automation for law firms",
    hero: {
      headline: "AI for Legal Excellence",
      subheading:
        "Contract analysis, legal research, and compliance for modern law firms",
    },
    features: [
      "Contract analysis and review",
      "Legal research automation",
      "Document drafting assistance",
      "Compliance monitoring",
      "Time tracking automation",
      "Client communication management",
    ],
    benefits: [
      "70% faster document review",
      "50% time savings on research",
      "Improved billable hours",
      "Enhanced client satisfaction",
    ],
  },
} as const;

