
import { Platform, PlatformConfig, ToneOption } from "@/types";

export const PLATFORM_CONFIG: Record<Platform, PlatformConfig> = {
  instagram: {
    name: "Instagram",
    icon: "instagram",
    color: "#E1306C",
    maxTitleLength: 100,
    maxDescriptionLength: 2200,
    maxHashtags: 30,
    supportedTones: ["casual", "inspirational", "humorous"] as ToneOption[],
  },
  youtube: {
    name: "YouTube",
    icon: "youtube", 
    color: "#FF0000",
    maxTitleLength: 100,
    maxDescriptionLength: 5000,
    maxHashtags: null,
    supportedTones: ["professional", "educational", "casual", "humorous"] as ToneOption[],
  },
  blog: {
    name: "Blog",
    icon: "blog",
    color: "#FF5722",
    maxTitleLength: 70,
    maxDescriptionLength: null,
    maxHashtags: 10,
    supportedTones: ["professional", "educational", "inspirational"] as ToneOption[],
  },
  tiktok: {
    name: "TikTok",
    icon: "tiktok",
    color: "#000000",
    maxTitleLength: 100,
    maxDescriptionLength: 2200,
    maxHashtags: 20,
    supportedTones: ["casual", "humorous"] as ToneOption[],
  },
  twitter: {
    name: "Twitter",
    icon: "twitter",
    color: "#1DA1F2",
    maxTitleLength: 280,
    maxDescriptionLength: 280,
    maxHashtags: 5,
    supportedTones: ["casual", "professional", "humorous"] as ToneOption[],
  },
  linkedin: {
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0077B5",
    maxTitleLength: 150,
    maxDescriptionLength: 3000,
    maxHashtags: 5,
    supportedTones: ["professional", "educational"] as ToneOption[],
  },
  facebook: {
    name: "Facebook",
    icon: "facebook",
    color: "#1877F2",
    maxTitleLength: 125,
    maxDescriptionLength: 5000,
    maxHashtags: 10,
    supportedTones: ["casual", "professional", "inspirational"] as ToneOption[],
  }
};

export const TONE_LABELS: Record<ToneOption, string> = {
  professional: "Professional",
  casual: "Casual",
  humorous: "Humorous",
  inspirational: "Inspirational",
  educational: "Educational"
};

export const LENGTH_LABELS: Record<"short" | "medium" | "long", string> = {
  short: "Short",
  medium: "Medium",
  long: "Long"
};
