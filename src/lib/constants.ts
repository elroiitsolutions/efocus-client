// eFocus Site Configuration & Content
export const siteConfig = {
  name: "eFocus",
  description:
    "eFocus is the all-in-one SaaS platform that helps teams streamline workflows, automate repetitive tasks, and focus on what truly drives growth.",
  url: "https://efocus.io",
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const features = [
  {
    icon: "analytics",
    title: "Smart Analytics",
    description:
      "Get real-time insights with AI-powered dashboards that help you make data-driven decisions faster.",
  },
  {
    icon: "automation",
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks with visual workflow builders. Save 10+ hours per week per team member.",
  },
  {
    icon: "collaboration",
    title: "Team Collaboration",
    description:
      "Real-time collaboration tools with @mentions, comments, and shared workspaces for seamless teamwork.",
  },
  {
    icon: "security",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and role-based access controls.",
  },
  {
    icon: "api",
    title: "Powerful API",
    description:
      "RESTful & GraphQL APIs with 99.99% uptime SLA. Build custom integrations in minutes.",
  },
  {
    icon: "integrations",
    title: "200+ Integrations",
    description:
      "Connect with your favorite tools — Slack, GitHub, Jira, Salesforce, and hundreds more.",
  },
];

export const bentoItems = [
  {
    title: "AI-Powered Dashboard",
    description: "Visualize your metrics with intelligent auto-generated reports and forecasts.",
    size: "large",
    gradient: "from-violet-500/20 to-cyan-500/20",
  },
  {
    title: "Smart Automation Engine",
    description: "Build complex workflows with our drag-and-drop visual editor.",
    size: "large",
    gradient: "from-pink-500/20 to-violet-500/20",
  },
  {
    title: "Real-time Sync",
    description: "Changes sync instantly across all devices and team members.",
    size: "small",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "99.99% Uptime",
    description: "Enterprise-grade reliability with global CDN distribution.",
    size: "small",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Advanced Security",
    description: "SOC 2 certified with E2E encryption and audit logs.",
    size: "small",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Mobile Ready",
    description: "Full-featured native apps for iOS and Android.",
    size: "small",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
];

export const integrations = [
  { name: "Slack", color: "#4A154B" },
  { name: "GitHub", color: "#333333" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Notion", color: "#000000" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Jira", color: "#0052CC" },
  { name: "Google", color: "#4285F4" },
  { name: "AWS", color: "#FF9900" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Twilio", color: "#F22F46" },
];

export const howItWorks = [
  {
    step: 1,
    title: "Sign Up in Seconds",
    description:
      "Create your free account with just an email. No credit card required. Get started instantly.",
  },
  {
    step: 2,
    title: "Configure Your Workflow",
    description:
      "Use our visual builder to design your perfect workflow. Choose from 50+ templates or build from scratch.",
  },
  {
    step: 3,
    title: "Launch & Scale",
    description:
      "Deploy your automated workflows and watch your productivity soar. Scale effortlessly as you grow.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "Perfect for individuals and small projects.",
    features: [
      "Up to 5 team members",
      "10 automated workflows",
      "Basic analytics dashboard",
      "Email support",
      "1 GB storage",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "For growing teams that need more power.",
    features: [
      "Up to 25 team members",
      "Unlimited workflows",
      "Advanced analytics & AI insights",
      "Priority support",
      "50 GB storage",
      "Custom integrations",
      "SSO & RBAC",
      "Audit logs",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "For organizations needing enterprise features.",
    features: [
      "Unlimited team members",
      "Unlimited everything",
      "Custom AI model training",
      "24/7 dedicated support",
      "Unlimited storage",
      "Custom integrations & APIs",
      "Advanced security & compliance",
      "Custom SLA",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow Inc",
    content:
      "eFocus transformed how our team operates. We've cut our project delivery time by 40% and eliminated countless manual processes.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "ScaleUp AI",
    content:
      "The automation features are a game-changer. What used to take our team hours now happens in minutes with zero errors.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "CTO",
    company: "DataBridge",
    content:
      "We evaluated 15 tools before choosing eFocus. The analytics capabilities and enterprise security features are unmatched.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder",
    company: "NovaTech",
    content:
      "eFocus paid for itself in the first week. The ROI is incredible — our team productivity has more than doubled.",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "Operations Director",
    company: "CloudFirst",
    content:
      "The integrations are seamless. eFocus connects perfectly with our existing stack — Slack, GitHub, Jira — everything just works.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Head of Design",
    company: "PixelCraft",
    content:
      "Beautiful interface, powerful under the hood. Our design team loves the workflow automation capabilities.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    title: "How AI is Revolutionizing Workflow Automation in 2026",
    excerpt:
      "Discover how artificial intelligence is reshaping the way teams work and collaborate in the modern workplace.",
    category: "AI & Automation",
    date: "Sep 18, 2026",
    readTime: "5 min read",
    image: "/images/blog-1.jpg",
  },
  {
    title: "10 Productivity Hacks That Actually Work for Remote Teams",
    excerpt:
      "Proven strategies for boosting team productivity in distributed work environments, backed by real data.",
    category: "Productivity",
    date: "Sep 12, 2026",
    readTime: "7 min read",
    image: "/images/blog-2.jpg",
  },
  {
    title: "The Future of SaaS: Trends to Watch in 2027",
    excerpt:
      "An in-depth look at emerging trends that will define the next generation of software-as-a-service platforms.",
    category: "Industry Trends",
    date: "Sep 5, 2026",
    readTime: "6 min read",
    image: "/images/blog-3.jpg",
  },
];

export const faqItems = [
  {
    question: "What is eFocus and how does it work?",
    answer:
      "eFocus is an all-in-one SaaS platform that helps teams automate workflows, track analytics, and collaborate more effectively. Simply sign up, connect your tools, and start building automated workflows with our visual editor.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial on all plans with full access to all features. No credit card required to get started.",
  },
  {
    question: "Can I integrate eFocus with my existing tools?",
    answer:
      "Absolutely. eFocus integrates with 200+ popular tools including Slack, GitHub, Jira, Salesforce, Google Workspace, and many more. We also offer a powerful API for custom integrations.",
  },
  {
    question: "Is my data secure with eFocus?",
    answer:
      "Security is our top priority. We are SOC 2 Type II certified, use end-to-end encryption, and provide features like SSO, RBAC, and audit logging. Your data is stored in geo-redundant data centers with 99.99% uptime.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer three tiers — Starter, Pro, and Enterprise. You can pay monthly or save up to 20% with annual billing. All plans include a 14-day free trial.",
  },
  {
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you cancel, you'll retain access until the end of your billing period. We offer a 30-day money-back guarantee.",
  },
  {
    question: "Do you offer dedicated support?",
    answer:
      "All plans include email support. Pro plans get priority support with faster response times, and Enterprise plans include 24/7 dedicated support with a named account manager.",
  },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "Changelog", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#blog" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Templates", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export const stats = [
  { value: "10K+", label: "Active Teams" },
  { value: "50M+", label: "Tasks Automated" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "150+", label: "Countries" },
];

export const brands = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Spotify",
  "Airbnb",
  "Uber",
  "Stripe",
];
