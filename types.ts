
export interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}

export interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  bgColor: string;
}
