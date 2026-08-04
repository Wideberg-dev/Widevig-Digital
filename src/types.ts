export type SubPage = 
  | "home"
  | "about"
  | "contact"
  | "design-showcase";

export type StyleId = 
  | "nordic-minimalist"
  | "cyberpunk-tech"
  | "corporate-glass"
  | "warm-editorial"
  | "vibrant-pop"
  | "neumorphic-clean"
  | "swiss-brutalist"
  | "emerald-luxury"
  | "sunset-vaporwave"
  | "midnight-indigo";

export interface DesignStyle {
  id: StyleId;
  name: string; // Norwegian name
  tagline: string;
  description: string;
  badgeText: string;
  themeClass: string;
  bgClass: string;
  surfaceClass: string;
  surfaceBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentBg: string;
  accentText: string;
  accentHover: string;
  accentBorder: string;
  buttonRadius: string;
  cardRadius: string;
  fontFamily: string;
  shadowClass: string;
  gradientBg: string;
  previewImage: string;
  tokens: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontHeading: string;
    fontBody: string;
    borderRadius: string;
    shadowStyle: string;
  };
}

export interface Service {
  id: string;
  title: string;
  category: "Web & Design" | "IKT & Arkitektur" | "AI & Innovasjon" | "Sikkerhet & Sky" | "Rådgivning & Admin" | string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  deliverables: string[];
  priceRange: string;
  typicalDuration: string;
  relatedCaseStudyId?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  imageUrl: string;
  styleUsed: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  linkedin: string;
  email: string;
}

export interface QuoteRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  selectedServices: string[];
  budgetRange: string;
  preferredStyle: StyleId;
  projectDescription: string;
  timeline: string;
}

export interface AiStrategyRecommendation {
  summary: string;
  roadmap: string[];
  designStyleRecommendation: string;
  keyTechnologies: string[];
  estimatedTimeline: string;
  estimatedRoi: string;
}
