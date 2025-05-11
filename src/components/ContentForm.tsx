
import { useContent } from "@/context/ContentContext";
import { PLATFORM_CONFIG, TONE_LABELS, LENGTH_LABELS } from "@/utils/platformConfig";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToneOption } from "@/types";
import { Sparkles, Image } from "lucide-react";

const ContentForm = () => {
  const {
    platform,
    topic,
    setTopic,
    tone,
    setTone,
    length,
    setLength,
    additionalInfo,
    setAdditionalInfo,
    isGenerating,
    isGeneratingImage,
    generateContent,
    generateContentImage
  } = useContent();

  const platformConfig = PLATFORM_CONFIG[platform];
  const supportedTones = platformConfig.supportedTones;

  const handleGenerateAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateContent("all");
  };

  return (
    <form onSubmit={handleGenerateAll} className="space-y-5">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-2">
          Topic/Keywords
        </label>
        <Input
          id="topic"
          placeholder="Enter your main topic or keywords"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium mb-2">
            Tone
          </label>
          <Select value={tone} onValueChange={(value) => setTone(value as ToneOption)}>
            <SelectTrigger id="tone" className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {supportedTones.map((toneOption) => (
                <SelectItem key={toneOption} value={toneOption}>
                  {TONE_LABELS[toneOption]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Supported tones for {platformConfig.name}
          </p>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium mb-2">
            Content Length
          </label>
          <Select value={length} onValueChange={(value) => setLength(value as "short" | "medium" | "long")}>
            <SelectTrigger id="length" className="w-full">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">{LENGTH_LABELS.short}</SelectItem>
              <SelectItem value="medium">{LENGTH_LABELS.medium}</SelectItem>
              <SelectItem value="long">{LENGTH_LABELS.long}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-options">
          <AccordionTrigger className="text-sm">Advanced Parameters</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                Additional Information
              </label>
              <Textarea
                id="additionalInfo"
                placeholder="Add any additional context or specific information to include in your content"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                className="w-full"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        type="submit"
        className="w-full"
        disabled={isGenerating || !topic}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {isGenerating ? "Generating..." : "Generate All Content"}
      </Button>

      <div className="grid grid-cols-4 gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isGenerating || !topic}
          onClick={() => generateContent("title")}
          className="text-xs h-9"
        >
          Generate Title
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isGenerating || !topic}
          onClick={() => generateContent("description")}
          className="text-xs h-9"
        >
          Generate Description
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isGenerating || !topic}
          onClick={() => generateContent("hashtags")}
          className="text-xs h-9"
        >
          Generate Hashtags
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isGeneratingImage || !topic}
          onClick={generateContentImage}
          className="text-xs h-9"
        >
          <Image className="h-4 w-4 mr-1" />
          {isGeneratingImage ? "..." : "Image"}
        </Button>
      </div>
    </form>
  );
};

export default ContentForm;
