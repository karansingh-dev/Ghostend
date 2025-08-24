import { fileURLToPath } from "url";
import { dirname } from "path";
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//prompt path
const filePath = path.resolve(__dirname, "../prompt/schemaGeneration.txt");

export const generateWithAi = async (userMessage: string): Promise<string> => {
  try {
    const rules = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    const prompt = rules + userMessage;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text)
      throw new Error("Failed to generate scheam with gemini");

    return response.text;
  } catch (error) {
    console.log("failed to generate scheam with gemini", error);
    throw error;
  }
};
