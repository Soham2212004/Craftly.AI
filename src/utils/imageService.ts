
import { getStabilityApiKey } from "./apiConfig";

/**
 * Interface for Stability API text-to-image parameters
 */
export interface TextToImageParams {
  prompt: string;
  width?: number;
  height?: number;
}

/**
 * Generate an image using Stability AI's text-to-image API
 */
export const generateImage = async (params: TextToImageParams): Promise<string | null> => {
  const apiKey = getStabilityApiKey();
  
  if (!apiKey) {
    console.error("Stability API key is not set");
    return null;
  }
  
  const { prompt, width = 512, height = 512 } = params;
  
  try {
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height,
          width,
          samples: 1,
          steps: 30,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Stability API error:", error);
      return null;
    }

    const data = await response.json();
    
    // The response includes base64-encoded images
    if (data.artifacts && data.artifacts.length > 0) {
      return `data:image/png;base64,${data.artifacts[0].base64}`;
    }
    
    return null;
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
};
