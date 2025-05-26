export interface Work {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image: string;
  strategy: string;
  case_study_brief: string;
  slug: string;
  category: string;
}

export interface Partner {
  id: string;
  created_at: string;
  name: string;
  logo_image: string;
}

export interface Service {
  id: string;
  created_at: string;
  title: string;
  description: string;
  icon_image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  created_at: string;
  quote: string;
  name: string;
  user_image: string;
}

export interface Social {
  id: string;
  created_at: string;
  icon_svg: string;
  url: string;
} 