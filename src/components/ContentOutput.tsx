
import { useContent } from "@/context/ContentContext";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, RefreshCw, Trash2, Image as ImageIcon } from "lucide-react";

const ContentOutput = () => {
  const {
    platform,
    title,
    setTitle,
    description,
    setDescription,
    hashtags,
    setHashtags,
    image,
    isGenerating,
    isGeneratingImage,
    generateContentImage,
    copyToClipboard,
    saveToHistory,
    clearContent,
  } = useContent();

  const platformConfig = PLATFORM_CONFIG[platform];

  const titleCharCount = title.length;
  const isTitleOverLimit = platformConfig.maxTitleLength !== null && titleCharCount > platformConfig.maxTitleLength;

  const descriptionCharCount = description.length;
  const isDescriptionOverLimit = 
    platformConfig.maxDescriptionLength !== null && 
    descriptionCharCount > platformConfig.maxDescriptionLength;
  
  const hashtagsCount = hashtags.length;
  const isHashtagsOverLimit = 
    platformConfig.maxHashtags !== null && 
    hashtagsCount > platformConfig.maxHashtags;

  return (
    <div className="space-y-6 mt-2">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${isTitleOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
              {titleCharCount}
              {platformConfig.maxTitleLength !== null && ` / ${platformConfig.maxTitleLength}`}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={!title}
              onClick={() => copyToClipboard(title)}
              className="h-6 w-6 p-0"
              title="Copy title"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Textarea
          id="title"
          placeholder="Generated title will appear here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full font-medium ${isTitleOverLimit ? "border-red-500" : ""}`}
          disabled={isGenerating}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description/Caption
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${isDescriptionOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
              {descriptionCharCount}
              {platformConfig.maxDescriptionLength !== null && ` / ${platformConfig.maxDescriptionLength}`}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={!description}
              onClick={() => copyToClipboard(description)}
              className="h-6 w-6 p-0"
              title="Copy description"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Textarea
          id="description"
          placeholder="Generated description will appear here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full min-h-[200px] ${isDescriptionOverLimit ? "border-red-500" : ""}`}
          disabled={isGenerating}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="hashtags" className="block text-sm font-medium">
            Hashtags
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${isHashtagsOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
              {hashtagsCount}
              {platformConfig.maxHashtags !== null && ` / ${platformConfig.maxHashtags}`}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={!hashtags.length}
              onClick={() => copyToClipboard(hashtags.join(" "))}
              className="h-6 w-6 p-0"
              title="Copy hashtags"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[80px] bg-background">
          {hashtags.length > 0 ? (
            hashtags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => {
                  const newHashtags = [...hashtags];
                  newHashtags.splice(index, 1);
                  setHashtags(newHashtags);
                }}
              >
                {tag}
              </Badge>
            ))
          ) : (
            <div className="text-muted-foreground text-sm">Generated hashtags will appear here</div>
          )}
        </div>
        <div className="mt-2">
          <Input
            placeholder="Add custom hashtag (press Enter)"
            disabled={isGenerating}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                e.preventDefault();
                const newTag = e.currentTarget.value.startsWith("#") 
                  ? e.currentTarget.value 
                  : `#${e.currentTarget.value.replace(/\s+/g, '')}`;
                setHashtags([...hashtags, newTag]);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">
            Generated Image
          </label>
          <Button 
            size="sm" 
            variant="outline"
            onClick={generateContentImage}
            disabled={isGeneratingImage}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {isGeneratingImage ? "Generating..." : "Generate Image"}
          </Button>
        </div>
        
        {image ? (
          <div className="relative rounded-md border overflow-hidden aspect-square max-h-[300px]">
            <img 
              src={image} 
              alt="Generated content image" 
              className="w-full h-full object-cover"
            />
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
              onClick={() => copyToClipboard("Image generated for content")}
              title="Copy image info"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">No image generated</h3>
              <p className="text-xs text-muted-foreground">
                Generate an image to enhance your content
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <Button onClick={saveToHistory} disabled={isGenerating || (!title && !description && hashtags.length === 0 && !image)}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="destructive" onClick={clearContent} disabled={isGenerating || (!title && !description && hashtags.length === 0 && !image)} className="ml-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ContentOutput;
