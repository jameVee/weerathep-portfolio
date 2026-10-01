export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { label: 'Languages & data', items: ['Python', 'SQL', 'PostgreSQL', 'Scikit-learn'] },
  {
    label: 'LLMs & agents',
    items: ['LLMs & Agentic AI', 'LLM Evaluation', 'RAG', 'LangChain', 'Azure OpenAI', 'Prompt Engineering'],
  },
  { label: 'Shipping', items: ['Docker', 'CI/CD (GitHub Actions)', 'Kubernetes', 'Langfuse'] },
  { label: 'Courses', items: ['Predictive AI, LLMs & Human-AI Interaction · KBTG Kampus'] },
];
