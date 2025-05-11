
import { useContent } from "@/context/ContentContext";
import { useState } from "react";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, FileText, Twitter, Linkedin, Facebook, Image, Download, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 10.5V8.5C18.5 8.5 17.6 7.9 16.9 7.1C16.4 6.5 16 5.8 16 5H14V15.4C14 16.9 12.8 18 11.4 18C10.9 18 10.5 17.9 10.1 17.6C9.4 17.1 9 16.3 9 15.5C9 14.1 10.1 13 11.5 13C11.8 13 12.1 13.1 12.3 13.2V11.1C12.1 11 11.8 11 11.5 11C9 11 7 13 7 15.5C7 16.9 7.6 18.1 8.5 19C9.3 19.7 10.4 20 11.5 20C14 20 16 18 16 15.5V10C16.7 10.5 17.7 11 19 11V9" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ContentPreview = () => {
  const { 
    platform, 
    title, 
    description, 
    hashtags, 
    image, 
    downloadAsText, 
    clearPreview 
  } = useContent();
  
  const platformConfig = PLATFORM_CONFIG[platform];
  
  // We'll check if there's content to display
  const hasContent = !!(title || description || (hashtags && hashtags.length > 0) || image);
  
  const previewDescription = description && description.length > 300 
    ? `${description.substring(0, 300)}...` 
    : description;
  
  const displayHashtags = hashtags?.slice(0, 5).join(" ");
  const hasMoreHashtags = hashtags?.length > 5;

  const handlePostContent = () => {
    toast.success(`Content ready to post to ${platformConfig.name}!`);
    toast.info("This is a demo feature. Actual posting functionality would require platform API access.");
  };

  const handleClearPreview = () => {
    clearPreview();
  };

  const getPlatformIcon = () => {
    const iconProps = { className: "h-5 w-5 text-white" };
    
    switch (platform) {
      case "instagram":
        return <Instagram {...iconProps} />;
      case "youtube":
        return <Youtube {...iconProps} />;
      case "blog":
        return <FileText {...iconProps} />;
      case "tiktok":
        return <TiktokIcon className="h-5 w-5 text-white" />;
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

  return (
    <div className="preview-container">
      <h3 className="text-lg font-medium mb-3">Content Preview</h3>
      <Card className="overflow-hidden">
        <div 
          className={`flex items-center p-3 ${platform}-preview text-white`}
          style={{ backgroundColor: platformConfig.color }}
        >
          <Avatar className="h-8 w-8 mr-2 bg-white bg-opacity-20">
            {getPlatformIcon()}
          </Avatar>
          <div>
            <h4 className="font-medium">{platformConfig.name} Preview</h4>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          {hasContent ? (
            <>
              {title && (
                <div>
                  <h5 className="font-bold text-lg">{title}</h5>
                </div>
              )}
              
              {image && (
                <div className="aspect-square overflow-hidden rounded-md border">
                  <img 
                    src={image} 
                    alt={title || "Generated content image"} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              {description && (
                <div className="text-sm">
                  <p>{previewDescription}</p>
                </div>
              )}
              
              {hashtags?.length > 0 && (
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {displayHashtags}
                  {hasMoreHashtags && " ..."}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={downloadAsText}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handlePostContent}
                  className="ml-auto"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post to {platformConfig.name}
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearPreview}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground text-center py-8">
              No content to preview
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-3 text-xs text-muted-foreground">
        <p>Note: This is a simplified preview. Actual appearance may vary on {platformConfig.name}.</p>
      </div>
    </div>
  );
};

export default ContentPreview;
