import { generateFlashcards } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Destructure the prompt from the body
  const { prompt } = req.body;

  // Validate the prompt
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "prompt is required and must be a string" });
  }

  console.log(prompt);
  

  try {
    // Generate flashcards based on the prompt
    const flashcards = await generateFlashcards(prompt);
    return res.status(200).json({ flashcards });
  } catch (error) {
    // Handle error when generating flashcards
    return res.status(500).json({ error: "Failed to generate flashcards" });
  }
}
