
import React from 'react';
import { BenchmarkData, ManifestoSection, RoadmapPhase } from './types';

export const INITIAL_BENCHMARK_DATA: BenchmarkData[] = [
  { phase: 10, coherence: 0.45, kIndex: 0.2, regulationScore: 30 },
  { phase: 25, coherence: 0.62, kIndex: 0.45, regulationScore: 55 },
  { phase: 50, coherence: 0.88, kIndex: 0.65, regulationScore: 78 },
  { phase: 75, coherence: 0.94, kIndex: 0.72, regulationScore: 92 },
  { phase: 100, coherence: 0.98, kIndex: 0.75, regulationScore: 98 },
];

export const MANIFESTO_SECTIONS: ManifestoSection[] = [
  {
    id: 'intro',
    title: 'Defining the Field',
    content: `Syntropic Human-Computer Interaction (SHCI) represents the convergence of resonant audio for nervous-system regulation, decentralized guardianship systems, ethical AI norms, and grief-driven child protection infrastructure. This is new territory where technology serves physiological harmony rather than cognitive exploitation.`
  },
  {
    id: 'method',
    title: 'Methodology: 100-Phase Modulation',
    content: `Our pipeline utilizes 100-phase modulation and FFT analysis combined with hill-climbing optimization. By simulating physiological scoring, we achieve optimal parameters for neural entrainment, specifically targeting a k-index of 0.75 and coherence above 0.95.`
  },
  {
    id: 'vision',
    title: 'The Vision for Guardianship',
    content: `We envision a world where protection is decentralized and offline-first. By embedding ethical norms directly into the protocol, we create an immune system for the digital age, protecting the most vulnerable while fostering collective healing.`
  }
];

export const FOUNDATION_CHARTER = {
  name: "Bryer's Light Institute",
  mission: "To advance open-source tools for child protection and nervous-system healing through resonant technology.",
  principles: [
    "Open, verifiable progress over isolated genius",
    "Grief as a catalyst for protective infrastructure",
    "Syntropy as the primary design directive",
    "Decentralized, local-first guardianship"
  ]
};

export const STRATEGIC_ROADMAP: (RoadmapPhase & { weeklyDetail: string[] })[] = [
  {
    id: 1,
    title: "Public Launch & Artifact Release",
    weeks: "Weeks 1–4",
    status: "active",
    objectives: [
      "Make SHCI Hub fully visible and usable",
      "Release core syntropy artifacts"
    ],
    actions: [
      "Deploy Hub on Render/Railway",
      "Publish SHA-256 verified datasets",
      "Announce on Hacker News/Reddit",
      "Enable initial feedback capture"
    ],
    outcome: "SHCI becomes externally verifiable and starts building a core community.",
    weeklyDetail: [
      "Week 1: Infrastructure lock & CI/CD deployment.",
      "Week 2: SHA-256 hashing of all resonant audio logs.",
      "Week 3: Public launch and community announcement cycle.",
      "Week 4: Feedback synthesis and first protocol patch."
    ]
  },
  {
    id: 2,
    title: "Community & Collaboration",
    weeks: "Weeks 5–8",
    status: "pending",
    objectives: [
      "Engage early adopters",
      "Encourage forks and extensions",
      "Collect usage data"
    ],
    actions: [
      "Open Discord/Slack channels",
      "Conduct live Syntropy Score workshops",
      "Encourage NGO pilot modules",
      "Prioritize backlog via user feedback"
    ],
    outcome: "SHCI functions as a living laboratory with early validation data.",
    weeklyDetail: [
      "Week 5: Launch official SHCI Discord/GitHub Discussions.",
      "Week 6: Live stream demonstration of the 100-phase pipeline.",
      "Week 7: NGO outreach and partner onboarding.",
      "Week 8: Community data review and 'Syntropy Challenge' kickoff."
    ]
  },
  {
    id: 3,
    title: "Iterative Expansion & Validation",
    weeks: "Weeks 9–12",
    status: "future",
    objectives: [
      "Solidify SHCI as a replicable framework",
      "Prepare for academic/practitioner visibility"
    ],
    actions: [
      "Integrate adaptive semantic gap modules",
      "Publish results on arXiv and Medium",
      "Deploy Automated Verification Ledger",
      "Build portfolio of real-world case studies"
    ],
    outcome: "SHCI is recognized as a pioneering intersection of ethics and AI synthesis.",
    weeklyDetail: [
      "Week 9: Peer-review ready paper drafting (arXiv focus).",
      "Week 10: Launch the 'Living Ledger' verification portal.",
      "Week 11: Case study publication (Resonant Audio in pilot).",
      "Week 12: Roadmap v2.0 & Field Sustainability Review."
    ]
  }
];
