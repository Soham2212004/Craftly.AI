
import { toast } from "sonner";

export const useContentUtilities = () => {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const downloadAsText = (content: {
    platform: string;
    topic: string;
    tone: string;
    length: string;
    title: string;
    description: string;
    hashtags: string[];
    image: string | null;
  }) => {
    if (!content.title && !content.description && content.hashtags.length === 0 && !content.image) {
      toast.error("No content to download");
      return;
    }

    const textContent = `
Platform: ${content.platform}
Topic: ${content.topic}
Tone: ${content.tone}
Length: ${content.length}

TITLE:
${content.title}

DESCRIPTION:
${content.description}

HASHTAGS:
${content.hashtags.join(" ")}

IMAGE:
${content.image ? "Generated image included" : "No image generated"}

Generated with Content Creator Toolbox on ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-${content.platform}-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Content downloaded as text file");

    // If there's an image, also offer to download it
    if (content.image) {
      // For base64 images
      if (content.image.startsWith('data:')) {
        const imageUrl = content.image;
        const imageA = document.createElement("a");
        imageA.href = imageUrl;
        imageA.download = `content-image-${new Date().toISOString().split("T")[0]}.png`;
        document.body.appendChild(imageA);
        imageA.click();
        document.body.removeChild(imageA);
        toast.success("Image downloaded");
      }
    }
  };

  const clearContent = () => {
    toast.info("Content cleared");
    return {
      title: "",
      description: "",
      hashtags: [],
      image: null
    };
  };

  return {
    copyToClipboard,
    downloadAsText,
    clearContent
  };
};
