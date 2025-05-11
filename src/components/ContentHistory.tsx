import { useState } from "react";
import { useContent } from "@/context/ContentContext";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";
import { Copy, Clock, Trash2, Image as ImageIcon, Download, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Instagram, Youtube, FileText, Twitter, Linkedin, Facebook } from "lucide-react";
import { Platform } from "@/types";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const iconProps = { size: 16, className: "mr-1" };
  
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

const ContentHistory = () => {
  const { history, copyToClipboard, deleteFromHistory, clearAllHistory } = useContent();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Function to download a specific history item
  const downloadHistoryItem = (item) => {
    const textContent = `
Platform: ${item.platform}
Title: ${item.title}

DESCRIPTION:
${item.description}

HASHTAGS:
${item.hashtags.join(" ")}

Generated with Content Creator Toolbox on ${format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
    `;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-${item.platform}-${new Date(item.createdAt).toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // If there's an image, also offer to download it
    if (item.image) {
      // For base64 images
      if (item.image.startsWith('data:')) {
        const imageUrl = item.image;
        const imageA = document.createElement("a");
        imageA.href = imageUrl;
        imageA.download = `content-image-${new Date(item.createdAt).toISOString().split("T")[0]}.png`;
        document.body.appendChild(imageA);
        imageA.click();
        document.body.removeChild(imageA);
      }
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-20" />
        <p>No content history yet</p>
        <p className="text-sm">Generated content will be saved here</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {history.length} {history.length === 1 ? 'item' : 'items'} in history
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All History</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your content history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearAllHistory}>Delete All</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {history.map((item) => {
            const platformConfig = PLATFORM_CONFIG[item.platform];
            const isExpanded = expandedItem === item.id;
            
            return (
              <Card key={item.id} className="overflow-hidden">
                <div className="bg-muted p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge 
                      variant="outline" 
                      className="mr-2 flex items-center" 
                      style={{ borderColor: platformConfig.color, color: platformConfig.color }}
                    >
                      <PlatformIcon platform={item.platform} />
                      {platformConfig.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setExpandedItem(isExpanded ? null : item.id);
                    }}
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </Button>
                </div>
                
                <div className="p-3">
                  {item.title && (
                    <div className="mb-2 font-medium">{item.title}</div>
                  )}
                  
                  {isExpanded ? (
                    <>
                      {item.image && (
                        <div className="mb-3 aspect-square max-h-[300px] overflow-hidden rounded-md border">
                          <img 
                            src={item.image} 
                            alt={item.title || "Generated content image"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {item.description && (
                        <div className="mb-2 text-sm">
                          {item.description}
                        </div>
                      )}
                      
                      {item.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.hashtags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => downloadHistoryItem(item)}
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(`${item.title}\n\n${item.description}\n\n${item.hashtags.join(' ')}`)}
                        >
                          <Copy className="mr-1 h-3 w-3" />
                          Copy All
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteFromHistory(item.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start">
                      {item.image && (
                        <div className="mr-3 flex-shrink-0 w-12 h-12 rounded-md border overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title || "Content thumbnail"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                        {item.description || "No description"}
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="ml-2 flex-shrink-0"
                        onClick={() => downloadHistoryItem(item)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-shrink-0"
                        onClick={() => deleteFromHistory(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

export default ContentHistory;
