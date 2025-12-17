
export interface BenchmarkData {
  phase: number;
  coherence: number;
  kIndex: number;
  regulationScore: number;
}

export interface ManifestoSection {
  id: string;
  title: string;
  content: string;
}

export enum AppSection {
  MANIFESTO = 'manifesto',
  BENCHMARKS = 'benchmarks',
  FOUNDATION = 'foundation',
  CHALLENGE = 'challenge',
  AI_ASSISTANT = 'ai_assistant'
}
