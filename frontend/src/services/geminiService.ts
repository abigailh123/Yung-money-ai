import { GoogleGenAI, Chat, Type } from "@google/genai";
import { BUCKSBUNNY_SYSTEM_PROMPT, getNewsCommentaryPrompt } from '../constants/prompts';
import type { NewsArticle } from '../types';

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

export async function getRecentNews(): Promise<NewsArticle[]> {
  try {
    // Step 1: Fetch recent news articles using Google Search grounding.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Using Google Search, find up to 3 of the most recent financial news articles relevant to St. Kitts and Nevis or the Eastern Caribbean Currency Union (ECCU).",
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    // Step 2: Parse the search results to create a list of base articles.
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map(chunk => chunk.web)
      .filter(web => web?.uri && web?.title) || [];
    
    let baseArticles: Omit<NewsArticle, 'commentary'>[] = [];
    if (sources.length > 0) {
      baseArticles = sources.slice(0, 3).map(source => {
        let sourceName = 'Web Source';
        try {
            if (source?.uri) {
              sourceName = new URL(source.uri).hostname.replace('www.', '');
            }
        } catch (e) { /* ignore */ }
        return {
            id: source?.uri || `article-${Date.now()}`,
            headline: source?.title || 'Untitled Article',
            source: sourceName,
            url: source?.uri || '#',
        };
      });
    } else {
      const textResponse = response.text || '';
      const rawHeadlines = textResponse.split('\n').map(line => line.trim()).filter(line => /^\d+\.\s/.test(line));
      const headlines = rawHeadlines.map(line => line.replace(/^\d+\.\s*/, ''));
      if (headlines.length > 0) {
        baseArticles = headlines.slice(0, 3).map((headline, index) => ({
            id: `text-article-${index}`,
            headline: headline,
            source: 'News',
            url: '#',
        }));
      }
    }
    
    if (baseArticles.length === 0) {
        return [];
    }

    // Step 3: For each article, generate BucksBunny's commentary.
    const newsSchema = {
        type: Type.OBJECT,
        properties: {
            bunnyBlurb: { type: Type.STRING },
            walletImpact: { type: Type.STRING },
            pollQuestion: { type: Type.STRING },
        },
        required: ["bunnyBlurb", "walletImpact", "pollQuestion"]
    };

    const articlesWithCommentary = await Promise.all(
        baseArticles.map(async (article) => {
            try {
                const commentaryPrompt = getNewsCommentaryPrompt(article.headline);
                const commentaryResult = await generateJsonContent(commentaryPrompt, newsSchema);
                return { ...article, commentary: commentaryResult };
            } catch (error) {
                console.error(`Failed to generate commentary for: ${article.headline}`, error);
                // If commentary fails, return the article without it.
                return { ...article, commentary: undefined };
            }
        })
    );

    return articlesWithCommentary;

  } catch (error) {
    console.error("Error fetching recent news from Gemini:", error);
    throw new Error("Sorry, I'm having trouble fetching the latest news. Please try again later.");
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