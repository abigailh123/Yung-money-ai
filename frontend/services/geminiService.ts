
import { GoogleGenAI, Chat, Type } from "@google/genai";
import { BUCKSBUNNY_SYSTEM_PROMPT } from '../constants/prompts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function startChat(options: { systemInstruction?: string; history?: any[] }): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: options.systemInstruction || BUCKSBUNNY_SYSTEM_PROMPT,
      temperature: 0.7,
      topP: 0.9,
    },
    history: options.history || [],
  });
}

export async function generateContent(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          systemInstruction: BUCKSBUNNY_SYSTEM_PROMPT,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Sorry, I'm having trouble connecting right now. Please try again later.");
  }
}

export async function generateJsonContent(prompt: string, schema: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          systemInstruction: BUCKSBUNNY_SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: schema,
      }
    });
    let jsonStr = response.text.trim();
    if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
    }
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating JSON content from Gemini:", error);
    throw new Error("Sorry, I'm having trouble connecting right now. Please try again later.");
  }
}
