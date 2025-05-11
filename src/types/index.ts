
export type Platform = "instagram" | "youtube" | "blog" | "tiktok" | "twitter" | "linkedin" | "facebook";

export interface ContentItem {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  hashtags: string[];
  image?: string | null;
  createdAt: string;
}

export type ToneOption = "professional" | "casual" | "humorous" | "inspirational" | "educational";

export interface GenerationParams {
  platform: Platform;
  topic: string;
  tone: ToneOption;
  length: "short" | "medium" | "long";
  additionalInfo?: string;
}

export interface PlatformConfig {
  name: string;
  icon: string;
  color: string;
  maxTitleLength: number;
  maxDescriptionLength: number | null;
  maxHashtags: number | null;
  supportedTones: ToneOption[];
}
