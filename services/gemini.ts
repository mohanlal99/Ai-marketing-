import { GoogleGenAI, Modality } from "@google/genai";

// Initialize the client
// NOTE: We are using the specific model 'gemini-2.5-flash-image' as requested
// This model supports image-to-image editing via text prompts.

export const generateEditedImage = async (
  imageBase64: string, 
  prompt: string
): Promise<string> => {
  
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Clean the base64 string if it contains metadata header
  const base64Data = imageBase64.split(',')[1] || imageBase64;
  const mimeType = imageBase64.substring(
      imageBase64.indexOf(":") + 1, 
      imageBase64.indexOf(";")
  );

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType, 
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE], 
      },
    });

    // Parse response for image data
    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part && part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
    }
    
    throw new Error("No image data received from the model.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Provide user-friendly error messages for common issues
    if (error.message?.includes("403")) {
        throw new Error("API Key invalid or permission denied.");
    }
    if (error.message?.includes("503")) {
        throw new Error("Service temporarily unavailable. Please try again.");
    }
    throw error;
  }
};