
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBotCode = async (config: any) => {
  const prompt = `Generate a Python Telegram Music Bot script using Pyrogram and pytgcalls. 
  The bot should play music in voice chats based on song names.
  Config Details:
  API_ID: ${config.apiId || 'YOUR_API_ID'}
  API_HASH: ${config.apiHash || 'YOUR_API_HASH'}
  BOT_TOKEN: ${config.botToken || 'YOUR_BOT_TOKEN'}
  SUDO_USERS: ${config.sudoUsers || '555555'}
  COMMAND_PREFIX: ${config.prefix || '/'}
  
  Include:
  1. Dependencies (pip install ...)
  2. Main script with song searching logic (mock search is fine)
  3. Integration with pytgcalls.
  Return only the code block.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
  });

  return response.text;
};

export const searchSongLogic = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the song name "${query}", return a JSON object with: title, artist, duration, and a placeholder thumbnail URL.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          artist: { type: Type.STRING },
          duration: { type: Type.STRING },
          thumbnail: { type: Type.STRING }
        },
        required: ["title", "artist", "duration", "thumbnail"]
      }
    }
  });

  return JSON.parse(response.text);
};
