
import { useState, useEffect } from "react";
import { ContentItem } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Maximum number of history items to keep
const MAX_HISTORY_ITEMS = 20;

export const useContentHistory = () => {
  const [history, setHistory] = useState<ContentItem[]>([]);
  
  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("contentHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse saved history", error);
      }
    }
  }, []);

  // Save history to localStorage with quota management
  useEffect(() => {
    try {
      // Limit history size before saving
      const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);
      
      // Try to save to localStorage
      localStorage.setItem("contentHistory", JSON.stringify(limitedHistory));
    } catch (error) {
      // If quota exceeded, try to reduce data size
      console.warn("Storage quota exceeded, reducing history size", error);
      
      // Create a reduced version with fewer items and potentially smaller images
      const reducedHistory = history.slice(0, Math.max(5, Math.floor(MAX_HISTORY_ITEMS / 2)));
      
      try {
        localStorage.setItem("contentHistory", JSON.stringify(reducedHistory));
        setHistory(reducedHistory);
        toast.warning("History size was reduced due to storage limitations");
      } catch (storageError) {
        // Still could not save history, clear the history as last resort
        console.error("Still could not save history, clearing instead", storageError);
        localStorage.removeItem("contentHistory");
        setHistory([]);
        toast.error("Content history was cleared due to storage limitations");
      }
    }
  }, [history]);

  const saveToHistory = (content: Omit<ContentItem, "id" | "createdAt">) => {
    if (!content.title && !content.description && content.hashtags.length === 0 && !content.image) {
      toast.error("No content to save");
      return;
    }

    const newItem: ContentItem = {
      id: uuidv4(),
      ...content,
      createdAt: new Date().toISOString()
    };

    setHistory((prev) => {
      // Ensure we keep under the limit
      const updatedHistory = [newItem, ...prev];
      if (updatedHistory.length > MAX_HISTORY_ITEMS) {
        return updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      }
      return updatedHistory;
    });
    toast.success("Content saved to history");
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.success("Content deleted from history");
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("contentHistory");
    toast.success("All history cleared");
  };

  return { 
    history, 
    saveToHistory, 
    deleteFromHistory,
    clearAllHistory 
  };
};
