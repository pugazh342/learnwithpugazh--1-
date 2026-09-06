export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ContentStatus = 'Available' | 'In Progress' | 'Coming Soon';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  topicCount: number;
  featuredTopicSlug: string;
  roadmapSlug?: string;
  groups: {
    name: string;
    description: string;
    topics: {
      title: string;
      slug: string;
      status: ContentStatus;
      difficulty: DifficultyLevel;
      readTime: string;
      summary?: string;
    }[];
  }[];
}

export interface TopicSection {
  id: string;
  title: string;
  content: string; // Markdown or rich formatted text
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: {
    type: 'info' | 'tip' | 'warning' | 'note';
    title: string;
    message: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  diagramType?: 'dns-flow' | 'vlan-frame' | 'osi-stack' | 'routing-table' | 'generic';
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  groupName: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  readTime?: string;
  prerequisites: string[];
  status: ContentStatus;
  tableOfContents: {
    id: string;
    label: string;
  }[];
  sections: TopicSection[];
  practicalSummary?: string;
  labSlug?: string;
  labTitle?: string;
  challenge?: {
    question: string;
    hint: string;
    answer: string;
  };
  relatedTopics: {
    title: string;
    slug: string;
    categorySlug: string;
    difficulty: DifficultyLevel;
  }[];
  relatedLabs?: {
    title: string;
    slug: string;
    difficulty: DifficultyLevel;
  }[];
  relatedProjects?: {
    title: string;
    slug: string;
  }[];
  roadmap?: {
    title: string;
    slug: string;
    stage: string;
  };
  instagramPost?: {
    title: string;
    handle: string;
    postUrl: string;
    caption: string;
  };
}

export interface LabTopologyDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'pc' | 'server';
  ip?: string;
  subnet?: string;
  vlan?: string;
  connections: string[];
}

export interface LabStep {
  stepNumber: number;
  title: string;
  explanation: string;
  device?: string;
  command?: string;
  expectedOutput?: string;
  tip?: string;
}

export interface Lab {
  id: string;
  labNumber: string; // e.g. "LAB 03"
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  tools: string[];
  prerequisites: string[];
  objectives: string[];
  topologyDescription: string;
  devices?: LabTopologyDevice[];
  conceptExplanation: string;
  setupInstructions: string[];
  steps: LabStep[];
  validation: {
    testDescription: string;
    command: string;
    expectedResult: string;
    howYouKnowItWorked: string;
  }[];
  troubleshooting: {
    symptom: string;
    probableCause: string;
    systematicCheck: string;
    resolution: string;
  }[];
  challenge: {
    description: string;
    requirement: string;
    collapsibleSolution: string;
  };
  whatYouLearned: string[];
  nextLab?: {
    title: string;
    slug: string;
  };
  relatedTopics: {
    title: string;
    slug: string;
    categorySlug: string;
  }[];
  relatedProjects?: {
    title: string;
    slug: string;
  }[];
  instagramPost?: {
    title: string;
    postUrl: string;
    caption: string;
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Prototype';
  featured: boolean;
  technologies: string[];
  problem: string;
  idea: string;
  approach: string;
  architectureDiagram?: string;
  architecturePoints: string[];
  implementationHighlights: {
    title: string;
    description: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
  }[];
  challenges: {
    challenge: string;
    howSolved: string;
  }[];
  learnings: string[];
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  relatedTopics: {
    title: string;
    slug: string;
    categorySlug: string;
  }[];
  relatedLabs: {
    title: string;
    slug: string;
  }[];
  instagramPosts?: {
    title: string;
    postUrl: string;
  }[];
}

export interface RoadmapStageTopic {
  title: string;
  slug?: string;
  categorySlug: string;
  status: ContentStatus;
  difficulty: DifficultyLevel;
}

export interface RoadmapStage {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: RoadmapStageTopic[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  estimatedDuration: string;
  difficulty: DifficultyLevel;
  iconName: string;
  overview: string;
  stages: RoadmapStage[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'Topic' | 'Lab' | 'Project' | 'Roadmap';
  category: string;
  description: string;
  url: string;
  badge?: string;
}
