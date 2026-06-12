export interface PortfolioStat {
  title: string;
  value: string;
  icon: "github" | "terminal" | "server";
  description: string;
  link: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface CyberStat {
  label: string;
  value: string;
}

export interface EducationItem {
  degree: string;
  period: string;
  institute: string;
  score: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string;
  link: string;
}
