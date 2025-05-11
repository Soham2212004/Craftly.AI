import React, { createContext, useContext, useState, ReactNode } from "react";
import { Platform, ContentItem, GenerationParams, ToneOption } from "@/types";
import { useContentHistory } from "@/hooks/useContentHistory";
import { useContentGeneration } from "@/hooks/useContentGeneration";
import { useContentUtilities } from "@/hooks/useContentUtilities";
import { toast } from "sonner";

interface ContentContextType {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  topic: string;
  setTopic: (topic: string) => void;
  tone: ToneOption;
  setTone: (tone: ToneOption) => void;
  length: "short" | "medium" | "long";
  setLength: (length: "short" | "medium" | "long") => void;
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
  image: string | null;
  setImage: (image: string | null) => void;
  isGenerating: boolean;
  isGeneratingImage: boolean;
  history: ContentItem[];
  generateContent: (type: "title" | "description" | "hashtags" | "all") => Promise<void>;
  generateContentImage: () => Promise<void>;
  saveToHistory: () => void;
  clearContent: () => void;
  clearPreview: () => void;
  copyToClipboard: (content: string) => void;
  downloadAsText: () => void;
  deleteFromHistory: (id: string) => void;
  clearAllHistory: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  // Platform and params state
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<ToneOption>("casual");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [additionalInfo, setAdditionalInfo] = useState("");
  
  // Content state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  
  // Import hooks
  const { history, saveToHistory: saveItemToHistory, deleteFromHistory: deleteHistoryItem, clearAllHistory } = useContentHistory();
  const { generateContent: genContent, generateContentImage: genImage, isGenerating, isGeneratingImage } = useContentGeneration();
  const { copyToClipboard, downloadAsText: download, clearContent: clearContentUtil } = useContentUtilities();

  // Handler functions
  const updateContent = (type: string, content: string | string[]) => {
    if (type === "title") setTitle(content as string);
    if (type === "description") setDescription(content as string);
    if (type === "hashtags") setHashtags(content as string[]);
  };

  const generateContent = async (type: "title" | "description" | "hashtags" | "all") => {
    const params: GenerationParams = {
      platform,
      topic,
      tone,
      length,
      additionalInfo
    };
    
    await genContent(type, params, updateContent);
    
    // If generating all content, also generate an image
    if (type === "all") {
      await generateContentImage();
    }
  };

  const generateContentImage = async () => {
    const generatedImage = await genImage(topic, title, additionalInfo, platform);
    if (generatedImage) {
      setImage(generatedImage);
    }
  };

  const saveToHistory = () => {
    saveItemToHistory({
      platform,
      title,
      description,
      hashtags,
      image
    });
  };

  const clearContent = () => {
    const clearedContent = clearContentUtil();
    setTitle(clearedContent.title);
    setDescription(clearedContent.description);
    setHashtags(clearedContent.hashtags);
    setImage(clearedContent.image);
  };
  
  const clearPreview = () => {
    // Actually reset the preview content while keeping history intact
    setTitle("");
    setDescription("");
    setHashtags([]);
    setImage(null);
    toast.info("Content preview cleared");
  };

  const deleteFromHistory = (id: string) => {
    deleteHistoryItem(id);
  };

  const downloadAsText = () => {
    download({
      platform,
      topic,
      tone,
      length,
      title,
      description,
      hashtags,
      image
    });
  };

  return (
    <ContentContext.Provider
      value={{
        platform,
        setPlatform,
        topic,
        setTopic,
        tone,
        setTone,
        length,
        setLength,
        additionalInfo,
        setAdditionalInfo,
        title,
        setTitle,
        description,
        setDescription,
        hashtags,
        setHashtags,
        image,
        setImage,
        isGenerating,
        isGeneratingImage,
        history,
        generateContent,
        generateContentImage,
        saveToHistory,
        clearContent,
        clearPreview,
        copyToClipboard,
        downloadAsText,
        deleteFromHistory,
        clearAllHistory,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
