export const personalInfo = {
  name: "Sudipta Ghorami",
  roles: ["Full Stack Developer", "AI Engineer", "Open to Remote Internships"],
  bio: "Second-year engineering student with hands-on production experience across multiple companies and two hackathon podium finishes. I build full-stack AI products end-to-end — from system design to deployment. Comfortable with TypeScript, React, Next.js, FastAPI, Docker, and LLM pipelines in fast-paced startup environments.",
  phone: "+91 8293863268",
  email: "ghoramisudipta32@gmail.com",
  github: "https://github.com/sudipta57",
  linkedin: "https://www.linkedin.com/in/sudipta-ghorami-261a81292/",
  photo: "/sudipta2.jpeg",
  resume:
    "https://drive.google.com/file/d/11VPhgeqGcUehOF3nM1w_vP7OXo4qk_TC/view?usp=sharing",
};

export type Experience = {
  role: string;
  company: string;
  result?: { value: string; label: string };
  url: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "SDE Intern",
    company: "ThinkRoot",
    url: "",
    location: "Remote",
    period: "May 2026 – Present",
    bullets: [
      "Building AI-native product features end-to-end and contributing to core application development at an early-stage startup",
      "Shipped improvements across the stack with a focus on reliability, performance, and product velocity",
    ],
  },
  {
    role: "Hacker in Residence",
    company: "Heva AI",
    result: { value: "−40%", label: "response latency" },
    url: "https://www.heva.ai/",
    location: "Remote",
    period: "Nov 2025 – Jan 2026",
    bullets: [
      "Owned end-to-end development of an AI product and reduced average response latency by 40% through async pipeline redesign and model-serving optimisation",
      "Evaluated and shipped 3 AI architecture iterations in 4 months; established a CI/CD pipeline with GitHub Actions that cut deployment time from hours to under 10 minutes",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "JobGenix",
    result: { value: "2,000+", label: "active users served" },
    url: "https://www.jobgenix.co.in/",
    location: "Remote",
    period: "Jul 2025 – Nov 2025",
    bullets: [
      "Maintained job listings, user dashboards, and admin panels serving 2,000+ active users while resolving 15+ production bugs",
      "Migrated key components to TypeScript, reducing runtime errors by about 30% and improving code review velocity across the team",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Secwebxperts Pvt. Ltd.",
    result: { value: "+18", label: "Lighthouse performance" },
    url: "https://secwebxperts.com/",
    location: "Remote",
    period: "Sep 2024 – Mar 2025",
    bullets: [
      "Built 8+ responsive React components with Tailwind CSS and integrated RESTful APIs serving 500+ daily users",
      "Improved Lighthouse performance score by 18 points through focused UI and performance work",
    ],
  },
];

export const projects = [
  {
    name: "NeighbourNet",
    description:
      "Offline disaster-response Android app that turns phones into a Bluetooth/Wi-Fi Direct mesh, adds on-device Bengali and English AI triage, and syncs with a coordinator dashboard.",
    tech: ["React Native", "TypeScript", "Kotlin", "FastAPI", "Supabase"],
    github: "",
    live: "",
  },
  {
    name: "SentinelQA",
    description:
      "Autonomous AI QA agent that crawls a live URL, generates contextual test cases, runs them in a browser with Playwright, classifies failures, and returns a structured bug report.",
    tech: ["Gemini API", "Playwright", "TypeScript", "Automation"],
    github: "",
    live: "",
  },
  {
    name: "Context AI",
    description:
      "AI-powered context management tool built in TypeScript and deployed with Docker; includes tests around the core context-resolution logic.",
    tech: ["TypeScript", "React", "Node.js", "Docker", "Jest"],
    github: "",
    live: "https://contextdhch.vercel.app/",
  },
  {
    name: "Cash Swap",
    description:
      "Peer-to-peer currency exchange web app in React and TypeScript with a GraphQL API and E2E coverage.",
    tech: ["React", "TypeScript", "GraphQL", "Vercel"],
    github: "",
    live: "https://cashswap.vercel.app/",
  },
];

export const skills = {
  Languages: ["TypeScript", "JavaScript (ES6+)", "Python"],
  Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "GraphQL"],
  Backend: ["Node.js", "Express.js", "FastAPI"],
  "AI / ML": [
    "LLM App Dev",
    "RAG",
    "NLP",
    "ONNX Runtime",
    "On-device Inference",
  ],
  Mobile: ["React Native", "Kotlin", "Google Nearby Connections"],
  Databases: ["PostgreSQL", "MongoDB", "SQL"],
  "DevOps / Cloud": [
    "Docker",
    "GitHub Actions",
    "AWS",
    "GCP basics",
    "Vercel",
    "Self-Hosting",
  ],
  Testing: ["Jest", "Playwright"],
};

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech) — Computer Science",
    period: "2025 – 2029",
    note: "Second Year Engineering Student",
  },
];

export type Achievement = {
  title: string;
  /** Placement, shown as a measured result. Omit for non-competitive entries. */
  result?: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    title: "Hacktropica 2026 x MLH",
    result: "1st runners-up",
    detail:
      "NeighbourNet, an offline disaster mesh system combining React Native, Kotlin, on-device AI, and a real-time coordinator dashboard for Bengal flood zones.",
  },
  {
    title: "Synchronicity S2.0, Jadavpur University",
    result: "1st runners-up",
    detail: "PacketForge, a DPDK-based kernel-bypass DDoS scrubber.",
  },
  {
    title: "Binary V2 Hackathon, KGC Kalyani",
    detail: "Built a link-analysis MCQ and practice plan tool.",
  },
  {
    title: "Open source and community",
    detail:
      "Active contributor to open-source projects on GitHub and the student developer and hackathon community across India.",
  },
];
