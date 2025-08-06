export interface Project {
  id: string
  slug: string
  title: string
  emoji: string
  subtitle: string
  overview: string[]
  keyFeatures: {
    title: string
    items: string[]
  }[]
  technicalStack: {
    title: string
    items: string[]
  }[]
  architecture?: string
  challengesSolved: {
    title: string
    description: string
  }[]
  projectLinks: {
    demo?: string
    github?: string
    live?: string
    status: string
  }
  metrics?: {
    title: string
    content: string
  }
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "pacgpt",
    title: "PACGPT",
    emoji: "💡",
    subtitle: "AI-Powered Conversational Assistant",
    overview: [
      "PacGPT is an advanced AI chatbot that leverages cutting-edge language models including Llama 3 and Anthropic's Claude. The application provides users with an intelligent conversational experience enhanced by memory capabilities, voice interaction, and image processing.",
      'Built with a focus on user experience and performance, PacGPT offers both casual conversation modes and specialized "quick question" functionality for rapid information retrieval.',
    ],
    keyFeatures: [
      {
        title: "🧠 AI MODELS:",
        items: [
          "Llama 3 integration",
          "Anthropic Claude support",
          "Model switching capabilities",
          "Optimized prompt engineering",
        ],
      },
      {
        title: "💾 MEMORY SYSTEM:",
        items: [
          "Conversation history persistence",
          "Context-aware responses",
          "User preference learning",
          "Session management",
        ],
      },
      {
        title: "🎤 VOICE FEATURES:",
        items: [
          "Speech-to-text input",
          "Text-to-speech output",
          "Voice command recognition",
          "Audio quality optimization",
        ],
      },
      {
        title: "🖼️ IMAGE PROCESSING:",
        items: [
          "Image upload and analysis",
          "Visual content understanding",
          "Multi-modal conversations",
          "Image-based queries",
        ],
      },
    ],
    technicalStack: [
      {
        title: "FRONTEND:",
        items: [
          "Next.js 14 (App Router)",
          "TypeScript for type safety",
          "Tailwind CSS for styling",
          "Zustand for state management",
          "React hooks for UI logic",
        ],
      },
      {
        title: "BACKEND & DATA:",
        items: [
          "PostgreSQL database",
          "RESTful API endpoints",
          "Docker containerization",
          "Environment-based configuration",
          "Secure API key management",
        ],
      },
    ],
    architecture: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   USER CLIENT   │    │   NEXT.JS APP   │    │   AI SERVICES   │
│                 │    │                 │    │                 │
│ • Voice Input   │◄──►│ • API Routes    │◄──►│ • Llama 3       │
│ • Text Input    │    │ • State Mgmt    │    │ • Anthropic     │
│ • Image Upload  │    │ • UI Components │    │ • Voice APIs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   POSTGRESQL    │
                       │                 │
                       │ • Conversations │
                       │ • User Settings │
                       │ • Chat History  │
                       └─────────────────┘`,
    challengesSolved: [
      {
        title: "REAL-TIME COMMUNICATION:",
        description:
          "Implemented efficient WebSocket connections for seamless real-time chat experience with minimal latency and optimal resource usage.",
      },
      {
        title: "STATE MANAGEMENT:",
        description:
          "Utilized Zustand for lightweight, performant state management across complex conversation flows and user preferences.",
      },
      {
        title: "MULTI-MODAL PROCESSING:",
        description:
          "Integrated multiple AI services to handle text, voice, and image inputs within a unified conversational interface.",
      },
    ],
    projectLinks: {
      demo: "pacgpt.demo.com",
      github: "github.com/bartekdev/pacgpt",
      status: "ACTIVE DEVELOPMENT",
    },
  },
  {
    id: "2",
    slug: "spark",
    title: "SPARK",
    emoji: "✨",
    subtitle: "AI-Powered SaaS Idea Generator",
    overview: [
      "Spark is an innovative SaaS platform that leverages artificial intelligence to help entrepreneurs and business professionals discover, validate, and develop new business ideas. The platform combines market analysis, trend detection, and creative AI to generate actionable business opportunities.",
      "Built with a focus on user experience and monetization, Spark integrates payment processing and subscription management to provide a complete SaaS solution.",
    ],
    keyFeatures: [
      {
        title: "🤖 AI GENERATION:",
        items: [
          "Intelligent idea generation",
          "Market trend analysis",
          "Competitive landscape mapping",
          "Business model suggestions",
        ],
      },
      {
        title: "💰 MONETIZATION:",
        items: [
          "Stripe payment integration",
          "Subscription management",
          "Tiered pricing models",
          "Usage-based billing",
        ],
      },
      {
        title: "📊 VALIDATION TOOLS:",
        items: ["Market size estimation", "Feasibility scoring", "Risk assessment", "Implementation roadmaps"],
      },
      {
        title: "👤 USER EXPERIENCE:",
        items: ["Personalized dashboards", "Idea bookmarking", "Progress tracking", "Export capabilities"],
      },
    ],
    technicalStack: [
      {
        title: "FRONTEND:",
        items: [
          "Next.js 14 with App Router",
          "TypeScript for type safety",
          "Tailwind CSS for styling",
          "Zustand for state management",
          "React Hook Form for forms",
        ],
      },
      {
        title: "BACKEND & SERVICES:",
        items: [
          "Supabase (Database + Auth)",
          "PostgreSQL database",
          "Stripe payment processing",
          "AI API integrations",
          "RESTful API design",
        ],
      },
    ],
    challengesSolved: [
      {
        title: "SUPABASE INTEGRATION:",
        description:
          "Leveraged Supabase for rapid development with built-in authentication, real-time database, and edge functions for serverless computing.",
      },
      {
        title: "STRIPE IMPLEMENTATION:",
        description:
          "Integrated comprehensive payment processing with subscription management, webhook handling, and secure payment flows.",
      },
      {
        title: "AI ORCHESTRATION:",
        description:
          "Designed intelligent prompt engineering and API orchestration to generate high-quality, actionable business ideas.",
      },
    ],
    projectLinks: {
      demo: "spark.saas.com",
      github: "github.com/bartekdev/spark",
      status: "PRODUCTION READY",
    },
  },
  {
    id: "3",
    slug: "go-analytics",
    title: "GO-ANALYTICS",
    emoji: "🚀",
    subtitle: "High-Performance Analytics Engine",
    overview: [
      "Go-Analytics is a high-performance web analytics tool built with Go, designed to handle massive amounts of data with minimal latency. The system provides real-time insights, custom dashboards, and comprehensive reporting capabilities.",
      "Engineered for scalability and speed, this analytics platform can process millions of events per second while maintaining sub-millisecond response times for queries.",
    ],
    keyFeatures: [
      {
        title: "⚡ PERFORMANCE:",
        items: [
          "Sub-millisecond query response",
          "Concurrent request handling",
          "Memory-efficient processing",
          "Optimized database queries",
        ],
      },
      {
        title: "📊 ANALYTICS:",
        items: ["Real-time event tracking", "Custom metrics definition", "Funnel analysis", "Cohort analysis"],
      },
      {
        title: "🔧 API DESIGN:",
        items: ["RESTful API endpoints", "GraphQL support", "Rate limiting", "API key authentication"],
      },
      {
        title: "📈 REPORTING:",
        items: ["Custom dashboard builder", "Automated reports", "Data export capabilities", "Visualization tools"],
      },
    ],
    technicalStack: [
      {
        title: "BACKEND:",
        items: [
          "Go 1.21+ runtime",
          "Gin Gonic web framework",
          "Goroutines for concurrency",
          "Context-based request handling",
          "Middleware pipeline",
        ],
      },
      {
        title: "DATABASE & STORAGE:",
        items: [
          "PostgreSQL with optimizations",
          "Connection pooling",
          "Prepared statements",
          "Database migrations",
          "Indexing strategies",
        ],
      },
    ],
    metrics: {
      title: "PERFORMANCE.METRICS",
      content: `BENCHMARK RESULTS:
┌─────────────────────┬─────────────┬─────────────┬─────────────┐
│ OPERATION           │ REQUESTS/SEC│ AVG LATENCY │ P99 LATENCY │
├─────────────────────┼─────────────┼─────────────┼─────────────┤
│ Event Ingestion     │ 1,000,000   │ 0.1ms       │ 0.5ms       │
│ Query Execution     │ 50,000      │ 0.8ms       │ 2.1ms       │
│ Dashboard Load      │ 10,000      │ 5.2ms       │ 12.8ms      │
│ Report Generation   │ 1,000       │ 45ms        │ 120ms       │
└─────────────────────┴─────────────┴─────────────┴─────────────┘

RESOURCE USAGE:
• Memory: 512MB baseline, 2GB under load
• CPU: 15% average, 60% peak
• Disk I/O: 1000 IOPS average
• Network: 100MB/s throughput`,
    },
    challengesSolved: [
      {
        title: "HIGH CONCURRENCY:",
        description:
          "Implemented efficient goroutine pools and channel-based communication to handle thousands of concurrent requests without performance degradation.",
      },
      {
        title: "MEMORY OPTIMIZATION:",
        description:
          "Utilized Go's garbage collector effectively and implemented object pooling to minimize memory allocations and reduce GC pressure.",
      },
      {
        title: "DATABASE PERFORMANCE:",
        description:
          "Optimized PostgreSQL queries with proper indexing, connection pooling, and prepared statements to achieve sub-millisecond response times.",
      },
    ],
    projectLinks: {
      demo: "go-analytics.demo.com",
      github: "github.com/bartekdev/go-analytics",
      status: "PRODUCTION READY",
    },
  },
  {
    id: "4",
    slug: "mosiedle",
    title: "MOSIEDLE",
    emoji: "📣",
    subtitle: "Award-Winning Community Management System",
    overview: [
      "mOsiedle is a comprehensive community management system designed specifically for residential complexes, neighborhoods, and housing communities. The platform facilitates communication, resource sharing, and administrative tasks for modern living communities.",
      "This award-winning project demonstrates excellence in user experience design, technical implementation, and real-world problem solving for community management challenges.",
    ],
    keyFeatures: [
      {
        title: "🏠 COMMUNITY MANAGEMENT:",
        items: ["Resident directory", "Announcement system", "Event organization", "Facility booking"],
      },
      {
        title: "💬 COMMUNICATION:",
        items: ["Community forums", "Direct messaging", "Group discussions", "Emergency notifications"],
      },
      {
        title: "🔧 MAINTENANCE:",
        items: ["Issue reporting system", "Maintenance requests", "Service provider directory", "Progress tracking"],
      },
      {
        title: "📊 ADMINISTRATION:",
        items: ["Financial management", "Document sharing", "Voting systems", "Analytics dashboard"],
      },
    ],
    technicalStack: [
      {
        title: "FRONTEND:",
        items: [
          "TypeScript for type safety",
          "Tailwind CSS for styling",
          "Framer Motion for animations",
          "Responsive design principles",
          "Progressive Web App features",
        ],
      },
      {
        title: "BACKEND & INFRASTRUCTURE:",
        items: [
          "PHP backend architecture",
          "MySQL database",
          "Docker containerization",
          "Git version control",
          "RESTful API design",
        ],
      },
    ],
    challengesSolved: [
      {
        title: "ACCESSIBILITY FIRST:",
        description:
          "Designed with WCAG 2.1 compliance, ensuring the platform is usable by residents of all ages and abilities, including screen reader support and keyboard navigation.",
      },
      {
        title: "INTUITIVE NAVIGATION:",
        description:
          "Implemented clear information architecture with logical grouping of features, making it easy for non-technical users to find and use community tools.",
      },
      {
        title: "MOBILE-FIRST APPROACH:",
        description:
          "Prioritized mobile experience with touch-friendly interfaces and optimized performance for various devices and network conditions.",
      },
    ],
    projectLinks: {
      live: "mosiedle.com",
      github: "github.com/bartekdev/mosiedle",
      status: "PRODUCTION | AWARD WINNER",
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projectsData
}

