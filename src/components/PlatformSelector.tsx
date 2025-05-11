
import { useState } from "react";
import { Platform } from "@/types";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instagram, Youtube, FileText, Twitter, Linkedin, Facebook } from "lucide-react";
import { useContent } from "@/context/ContentContext";

// Custom TikTok icon component
const TiktokIcon = ({ size = 24, className = "", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M20 10.5V8.5C18.5 8.5 17.6 7.9 16.9 7.1C16.4 6.5 16 5.8 16 5H14V15.4C14 16.9 12.8 18 11.4 18C10.9 18 10.5 17.9 10.1 17.6C9.4 17.1 9 16.3 9 15.5C9 14.1 10.1 13 11.5 13C11.8 13 12.1 13.1 12.3 13.2V11.1C12.1 11 11.8 11 11.5 11C9 11 7 13 7 15.5C7 16.9 7.6 18.1 8.5 19C9.3 19.7 10.4 20 11.5 20C14 20 16 18 16 15.5V10C16.7 10.5 17.7 11 19 11V9" />
  </svg>
);

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const iconProps = { size: 20, className: "mr-2" };
  
  switch (platform) {
    case "instagram":
      return <Instagram {...iconProps} />;
    case "youtube":
      return <Youtube {...iconProps} />;
    case "blog":
      return <FileText {...iconProps} />;
    case "tiktok":
      return <TiktokIcon {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    default:
      return null;
  }
};

const PlatformSelector = () => {
  const { platform, setPlatform } = useContent();
  
  const handlePlatformChange = (newPlatform: string) => {
    setPlatform(newPlatform as Platform);
  };

  return (
    <div className="platform-selector mb-6">
      <label className="block text-sm font-medium mb-2">Platform</label>
      <Select value={platform} onValueChange={handlePlatformChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose Platform</SelectLabel>
            {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
              <SelectItem 
                key={key} 
                value={key}
                className="flex items-center"
              >
                <div className="flex items-center">
                  <PlatformIcon platform={key as Platform} />
                  <span>{config.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlatformSelector;
