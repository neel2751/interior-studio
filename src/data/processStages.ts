
export interface ProcessStage {
  id: string;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  image?: string;
  icon?: string;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'We begin with a comprehensive consultation to understand your vision, requirements, and budget constraints.',
    duration: '1-2 days',
    deliverables: [
      'Requirements analysis document',
      'Budget assessment',
      'Timeline framework',
      'Initial mood board'
    ],
    icon: '/icons/consultation.svg',
  },
  {
    id: '2',
    title: 'Concept Development',
    description: 'Our team creates detailed design concepts, mood boards, and initial layouts based on your preferences.',
    duration: '3-5 days',
    deliverables: [
      'Design concepts',
      'Mood boards',
      'Space planning layouts',
      'Material palette'
    ],
    icon: '/icons/concept.svg',
  },
  {
    id: '3',
    title: 'Design Planning',
    description: 'We develop detailed floor plans, 3D renderings, and material specifications for your approval.',
    duration: '5-7 days',
    deliverables: [
      'Detailed floor plans',
      '3D renderings',
      'Material specifications',
      'Furniture layout'
    ],
    icon: '/icons/planning.svg',
  },
  {
    id: '4',
    title: 'Material & Furniture Selection',
    description: 'Our designers guide you through selecting premium materials, furniture, and finishes.',
    duration: '3-4 days',
    deliverables: [
      'Material selection sheet',
      'Furniture specifications',
      'Finish schedule',
      'Procurement plan'
    ],
    icon: '/icons/materials.svg',
  },
  {
    id: '5',
    title: 'Project Execution',
    description: 'Our skilled craftsmen bring the design to life with attention to detail and quality execution.',
    duration: '4-8 weeks',
    deliverables: [
      'Site preparation',
      'Construction work',
      'Installation',
      'Quality checks'
    ],
    icon: '/icons/execution.svg',
  },
  {
    id: '6',
    title: 'Final Styling and Handover',
    description: 'We complete the project with final styling, quality checks, and a seamless handover process.',
    duration: '2-3 days',
    deliverables: [
      'Final styling',
      'Quality inspection',
      'Documentation',
      'Project handover'
    ],
    icon: '/icons/handover.svg',
  }
];

export function getProcessStageById(id: string): ProcessStage | undefined {
  return PROCESS_STAGES.find(stage => stage.id === id);
}

export function getProcessStageIds(): string[] {
  return PROCESS_STAGES.map(stage => stage.id);
}

export function getTotalEstimatedDuration(): string {
  return '6-10 weeks';
}

export function getProcessSummary(): {
  totalStages: number;
  estimatedDuration: string;
  keyDeliverables: string[];
} {
  const allDeliverables = PROCESS_STAGES.flatMap(stage => stage.deliverables || []);
  
  return {
    totalStages: PROCESS_STAGES.length,
    estimatedDuration: getTotalEstimatedDuration(),
    keyDeliverables: [...new Set(allDeliverables)] // Remove duplicates
  };
}

export function getProcessForProjectType(projectType: 'residential' | 'commercial'): ProcessStage[] {
  return PROCESS_STAGES;
}

export function getNextStage(currentStageId: string): ProcessStage | null {
  const currentIndex = PROCESS_STAGES.findIndex(stage => stage.id === currentStageId);
  
  if (currentIndex === -1 || currentIndex === PROCESS_STAGES.length - 1) {
    return null;
  }
  
  return PROCESS_STAGES[currentIndex + 1];
}

export function getPreviousStage(currentStageId: string): ProcessStage | null {
  const currentIndex = PROCESS_STAGES.findIndex(stage => stage.id === currentStageId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return PROCESS_STAGES[currentIndex - 1];
}

export function getStageProgress(currentStageId: string): number {
  const currentIndex = PROCESS_STAGES.findIndex(stage => stage.id === currentStageId);
  
  if (currentIndex === -1) {
    return 0;
  }
  
  return Math.round(((currentIndex + 1) / PROCESS_STAGES.length) * 100);
}
