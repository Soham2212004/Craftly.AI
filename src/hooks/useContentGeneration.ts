import { useState } from "react";
import { Platform, GenerationParams, ToneOption } from "@/types";
import { toast } from "sonner";
import { generateImage } from "@/utils/imageService";

export const useContentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const mockGenerate = async (type: string, params: GenerationParams): Promise<string | string[]> => {
    // This is a mock implementation that simulates AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    
    const platformName = params.platform.charAt(0).toUpperCase() + params.platform.slice(1);
    
    if (type === "title") {
      // Platform-specific title formats
      if (params.platform === "instagram") {
        const titles = [
          `✨ ${params.topic} that will Transform your Instagram Feed`,
          `The ${params.tone === 'humorous' ? 'Funniest' : 'Ultimate'} ${params.topic} Guide for the 'Gram`,
          `${params.tone === 'inspirational' ? 'Inspiring' : 'Must-Know'} ${params.topic} Tips for Instagram Growth`,
          `How I Grew My Instagram Following with ${params.topic} 📱`,
          `${params.tone === 'casual' ? 'Hey Followers! Let\'s Talk About' : 'The Complete Guide to'} ${params.topic} 🔥`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      } 
      else if (params.platform === "youtube") {
        const titles = [
          `${params.topic} | The Video You've Been Waiting For`,
          `I Tried ${params.topic} for 30 Days and THIS Happened [${params.tone === 'humorous' ? 'HILARIOUS' : 'SHOCKING'} Results]`,
          `${params.tone === 'educational' ? 'Learn Everything About' : 'You Won\'t Believe These Facts About'} ${params.topic}`,
          `The TRUTH About ${params.topic} That No One Is Talking About 😱`,
          `${params.topic} Explained in ${params.length === 'short' ? '5' : params.length === 'medium' ? '10' : '15'} Minutes`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      else if (params.platform === "tiktok") {
        const titles = [
          `POV: When you discover ${params.topic} #fyp`,
          `No one's talking about ${params.topic} and it's a PROBLEM 🤯 #viral`,
          `${params.tone === 'humorous' ? 'Wait for it 😂' : 'This changed everything ✨'} | ${params.topic}`,
          `Day ${Math.floor(Math.random() * 30) + 1} of ${params.topic} #trendalert`,
          `The ${params.topic} hack you NEED to know about! #lifehack`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      else if (params.platform === "blog") {
        const titles = [
          `${params.topic}: A Comprehensive Guide for ${new Date().getFullYear()}`,
          `${params.topic}: ${params.tone === 'professional' ? 'Expert Analysis and Insights' : 'Personal Reflections and Tips'}`,
          `The ${Math.floor(Math.random() * 10) + 5} Essential ${params.topic} Strategies Every Professional Should Know`,
          `How ${params.topic} is Transforming the Industry: Data-Driven Insights`,
          `${params.topic}: Debunking Common Myths and Misconceptions`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      else if (params.platform === "twitter") {
        const titles = [
          `Thread: Everything you need to know about ${params.topic} in 10 tweets 🧵`,
          `Hot take: ${params.topic} is ${params.tone === 'humorous' ? 'overrated' : 'underrated'}. Here's why...`,
          `I've been researching ${params.topic} for ${Math.floor(Math.random() * 5) + 1} years. Here's what I learned:`,
          `${params.topic} explained in one tweet:`,
          `Why is nobody talking about ${params.topic}? 👀`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      else if (params.platform === "linkedin") {
        const titles = [
          `How I Leveraged ${params.topic} to Increase Company Revenue by ${Math.floor(Math.random() * 50) + 20}%`,
          `${params.topic}: The Skill That Transformed My Career Path`,
          `${params.tone === 'professional' ? 'Professional Insights:' : 'Reflecting on'} ${params.topic} in Today's Market`,
          `The Future of ${params.topic} in ${new Date().getFullYear()} and Beyond`,
          `I'm excited to share my thoughts on ${params.topic} #LinkedInThoughts`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      else if (params.platform === "facebook") {
        const titles = [
          `${params.tone === 'casual' ? 'Hey friends!' : 'Announcement:'} I've been exploring ${params.topic} lately...`,
          `My journey with ${params.topic} - a ${params.tone === 'inspirational' ? 'life-changing' : 'personal'} experience`,
          `${Math.floor(Math.random() * 10) + 3} things I wish I knew about ${params.topic} sooner`,
          `Family update: Our experience with ${params.topic}`,
          `${params.topic} - Have you tried this yet? My honest review!`
        ];
        return titles[Math.floor(Math.random() * titles.length)];
      }
      
      // General format if platform doesn't match specific cases
      const titles = [
        `The Ultimate ${params.topic} Guide for ${platformName}`,
        `${params.tone === 'humorous' ? 'Hilarious' : 'Amazing'} ${params.topic} Tips That Will Transform Your Content`,
        `Why Every Creator Should Know About ${params.topic}`,
        `${params.topic}: The Secret Weapon for ${platformName} Success`,
        `${params.tone === 'professional' ? 'Professional' : 'Creative'} Approach to ${params.topic}`
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    }
    
    if (type === "description") {
      let description = '';
      let lengthMultiplier = params.length === "short" ? 1 : params.length === "medium" ? 2 : 3;
      
      // Platform-specific descriptions
      if (params.platform === "instagram") {
        description = `✨ ${params.tone === 'inspirational' ? 'Feeling inspired about' : 'Excited to share'} ${params.topic}! ${params.additionalInfo ? `${params.additionalInfo} ` : ''}`;
        
        if (params.tone === 'casual') {
          description += `\n\nJust wanted to drop this ${params.topic} content on your feed today! What do you guys think? Drop a 💖 if you're loving this content!\n\n`;
        } else if (params.tone === 'humorous') {
          description += `\n\nWhen they said I couldn't make ${params.topic} interesting, I took that personally 😂 Plot twist: I did! Check this out!\n\n`;
        } else if (params.tone === 'inspirational') {
          description += `\n\nEvery day is a new opportunity to explore ${params.topic}. Remember, your journey is unique and beautiful in its own way ✨\n\n`;
        }
        
        description += `\n\nDouble tap if this resonated with you! 👇 Follow for more content like this!`;
      }
      else if (params.platform === "youtube") {
        description = `📺 ${params.tone === 'educational' ? 'Learn all about' : 'Discover'} ${params.topic} in this ${params.length} video!`;
        
        if (params.additionalInfo) {
          description += `\n\n${params.additionalInfo}`;
        }
        
        description += `\n\nIn this video, we're diving deep into ${params.topic} and showing you exactly how to make the most of it. `;
        
        if (params.tone === 'educational') {
          description += `\n\nCHAPTERS:\n00:00 - Introduction\n01:23 - Background on ${params.topic}\n04:56 - Main concepts\n08:30 - Practical applications\n12:45 - Summary and takeaways`;
        } else if (params.tone === 'humorous') {
          description += `\n\nWARNING: Side effects of this video may include uncontrollable laughter, mind-blowing revelations about ${params.topic}, and an irresistible urge to hit that subscribe button!`;
        }
        
        description += `\n\n👇 LINKS & RESOURCES 👇\nWebsite: https://example.com\nInstagram: @example\n\n#${params.topic.replace(/\s+/g, '')} #YouTube #Content`;
      }
      else if (params.platform === "tiktok") {
        description = `${params.topic} ${params.tone === 'humorous' ? '😂 ' : '✨ '}#fyp #foryoupage `;
        description += `${params.additionalInfo ? `#${params.additionalInfo.replace(/\s+/g, '')} ` : ''}`;
        description += `#${params.topic.replace(/\s+/g, '')} #viral #trending`;
        
        // TikTok has shorter descriptions by nature
        return description;
      }
      else if (params.platform === "blog") {
        description = `${params.tone === 'professional' ? 'An in-depth analysis' : 'A comprehensive guide'} of ${params.topic}`;
        
        if (params.additionalInfo) {
          description += `, with focus on ${params.additionalInfo}.`;
        }
        
        description += `\n\n## Introduction\n\nIn today's rapidly evolving landscape, understanding ${params.topic} has become increasingly important. This article explores the key aspects, challenges, and opportunities related to ${params.topic}.`;
        
        description += `\n\n## Key Insights\n\n- ${params.topic} is transforming how we approach content creation\n- Understanding the fundamentals is essential for success\n- Implementing strategic approaches can yield significant results`;
        
        description += `\n\n## Conclusion\n\n${params.topic} represents a significant opportunity for those willing to invest time and resources into mastering it. By following the guidelines outlined in this article, you'll be well-positioned to leverage ${params.topic} effectively.`;
      }
      else if (params.platform === "twitter") {
        // Twitter (X) has a character limit, so keep it short
        description = `${params.topic} is ${params.tone === 'humorous' ? 'hilariously' : 'incredibly'} important in today's world.\n\n`;
        
        if (params.additionalInfo) {
          description += `Especially when it comes to ${params.additionalInfo}.\n\n`;
        }
        
        description += `What are your thoughts? Reply below!`;
        
        // Ensure we respect Twitter's character limit
        return description.substring(0, 280);
      }
      else if (params.platform === "linkedin") {
        description = `I'm excited to share my insights on ${params.topic}.\n\n`;
        
        if (params.tone === 'professional') {
          description += `Throughout my career, I've observed that ${params.topic} plays a crucial role in driving business outcomes and professional development. ${params.additionalInfo ? `Particularly in the area of ${params.additionalInfo}, where strategic implementation can lead to significant advantages.` : ''}\n\n`;
          description += `Key takeaways:\n• Implementing ${params.topic} can increase productivity by up to 30%\n• Teams that prioritize ${params.topic} report higher satisfaction\n• Future trends indicate ${params.topic} will become even more vital\n\n`;
        } else if (params.tone === 'educational') {
          description += `Here are 3 things you should know about ${params.topic}:\n\n1. The fundamentals are often misunderstood\n2. Practical application requires strategic thinking\n3. Continuous learning is essential for mastery\n\n`;
        }
        
        description += `I'd love to hear your experiences with ${params.topic}. Comment below or message me to continue the conversation.\n\n#${params.topic.replace(/\s+/g, '')} #ProfessionalDevelopment #Innovation`;
      }
      else if (params.platform === "facebook") {
        description = `${params.tone === 'casual' ? 'Hey everyone!' : 'I wanted to share something important today:'} My thoughts on ${params.topic}.\n\n`;
        
        if (params.additionalInfo) {
          description += `I've been particularly interested in how ${params.additionalInfo} relates to this.\n\n`;
        }
        
        if (params.tone === 'casual') {
          description += `Has anyone else been exploring this lately? Would love to hear your experiences!\n\n`;
        } else if (params.tone === 'inspirational') {
          description += `Remember that every journey begins with a single step. ${params.topic} might seem challenging at first, but the rewards are worth it.\n\n`;
        }
        
        description += `Feel free to share this post if you found it helpful! ❤️`;
      }
      else {
        // Generic description if platform doesn't match specific cases
        const descBase = `This is a ${params.tone} ${params.length} description about ${params.topic} for ${platformName}.`;
        const additionalContext = params.additionalInfo ? ` Including information about: ${params.additionalInfo}.` : '';
        
        description = `${descBase}${additionalContext} This content is designed to engage your audience and drive interaction. Use it to build your brand and establish authority in your niche.`;
        description += `${"".padEnd(lengthMultiplier * 100, " The more you engage, the more your audience will grow.")}`;
      }
      
      return description;
    }
    
    if (type === "hashtags") {
      // Platform-specific hashtags
      if (params.platform === "instagram") {
        const baseHashtags = ['#Instagram', '#IGDaily', '#InstaPost'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        const toneHashtags = params.tone === 'humorous' ? ['#Funny', '#LOL', '#Humor'] : 
                            params.tone === 'inspirational' ? ['#Inspiration', '#Motivated', '#Mindset'] : 
                            params.tone === 'casual' ? ['#CasualVibes', '#DailyPost', '#ShareTheMoment'] : 
                            ['#ContentCreation', '#Engagement'];
                            
        return [...baseHashtags, ...topicHashtags, ...toneHashtags, '#InstaLife', '#IGers', '#InstaDaily'];
      }
      else if (params.platform === "youtube") {
        const baseHashtags = ['#YouTube', '#YouTuber', '#VideoContent'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags, '#Subscribe', '#YouTubeCommunity', '#Vlog'];
      }
      else if (params.platform === "tiktok") {
        const baseHashtags = ['#TikTok', '#FYP', '#ForYouPage'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags, '#TikTokTrend', '#Viral', '#TikTokCreator'];
      }
      else if (params.platform === "blog") {
        const baseHashtags = ['#Blog', '#Blogging', '#Article'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags, '#WritersOfMedium', '#BloggingTips', '#ContentCreation'];
      }
      else if (params.platform === "twitter") {
        const baseHashtags = ['#Twitter', '#TweetTips'];
        const topicHashtags = params.topic.split(' ').slice(0, 2).map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags];
      }
      else if (params.platform === "linkedin") {
        const baseHashtags = ['#LinkedIn', '#ProfessionalDevelopment', '#Networking'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags, '#CareerGrowth', '#Innovation'];
      }
      else if (params.platform === "facebook") {
        const baseHashtags = ['#Facebook', '#Community', '#Sharing'];
        const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
        return [...baseHashtags, ...topicHashtags, '#Connection', '#SocialMedia'];
      }
      
      // Generic hashtags if platform doesn't match specific cases
      const baseHashtags = ['#ContentCreator', '#DigitalMarketing', `#${params.platform}`];
      const topicHashtags = params.topic.split(' ').map(word => `#${word.replace(/[^\w]/g, '')}`);
      return [...baseHashtags, ...topicHashtags, '#CreateWithLove', '#ContentStrategy', '#OnlinePresence'];
    }
    
    return "Generated Content";
  };

  const generateContent = async (
    type: "title" | "description" | "hashtags" | "all",
    params: GenerationParams,
    updateContent: (type: string, content: string | string[]) => void
  ) => {
    if (!params.topic) {
      toast.error("Please enter a topic before generating content");
      return;
    }

    setIsGenerating(true);
    
    try {
      if (type === "all" || type === "title") {
        const generatedTitle = await mockGenerate("title", params);
        updateContent("title", generatedTitle as string);
      }

      if (type === "all" || type === "description") {
        const generatedDescription = await mockGenerate("description", params);
        updateContent("description", generatedDescription as string);
      }

      if (type === "all" || type === "hashtags") {
        const generatedHashtags = await mockGenerate("hashtags", params);
        updateContent("hashtags", generatedHashtags as string[]);
      }

      toast.success(`Successfully generated ${type === "all" ? "content" : type}`);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(`Failed to generate ${type}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContentImage = async (topic: string, title: string = "", additionalInfo: string = "", platform: Platform) => {
    if (!topic) {
      toast.error("Please enter a topic before generating an image");
      return null;
    }

    setIsGeneratingImage(true);
    
    try {
      // Create a platform-specific prompt based on the topic and other context
      let imagePrompt = `${platform} post about ${topic}`;
      
      if (title) {
        imagePrompt += `, ${title}`;
      }
      
      if (additionalInfo) {
        imagePrompt += `, ${additionalInfo}`;
      }
      
      // Add platform-specific details to the prompt
      switch (platform) {
        case "instagram":
          imagePrompt += ", vibrant colors, lifestyle photography, square format, high quality, trending on Instagram";
          break;
        case "youtube":
          imagePrompt += ", youtube thumbnail, eye-catching, bold text, high contrast, professional look";
          break;
        case "tiktok":
          imagePrompt += ", trendy, dynamic, vertical format, energetic, vibrant, young audience";
          break;
        case "blog":
          imagePrompt += ", professional, clean, informative, header image, blog style";
          break;
        case "twitter":
          imagePrompt += ", concise, impactful, twitter banner style, clean design";
          break;
        case "linkedin":
          imagePrompt += ", professional, corporate, business appropriate, LinkedIn style";
          break;
        case "facebook":
          imagePrompt += ", engaging, shareable, community focused, facebook post style";
          break;
        default:
          imagePrompt += ", high quality content";
      }

      const generatedImage = await generateImage({ 
        prompt: imagePrompt,
        width: 1024,
        height: 1024
      });
      
      if (generatedImage) {
        toast.success("Image successfully generated");
        return generatedImage;
      } else {
        toast.error("Failed to generate image");
        return null;
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return {
    generateContent,
    generateContentImage,
    isGenerating,
    isGeneratingImage
  };
};
