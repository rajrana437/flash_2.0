import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateFlashcards = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Provide only a JSON array of 10 flashcards for learning ${prompt}. Each object should have 'question' and 'answer' fields. Do not include any text outside the JSON array.`,
                },
            ],
            max_tokens: 1500, // Increase max tokens to handle longer responses
            temperature: 0.7,
        });

        const content = response.choices[0].message?.content ?? "";

        if (!content) {
            throw new Error("OpenAI response content is empty or null");
        }

        console.log("Raw content from OpenAI:", content);

        // Attempt direct JSON parsing
        try {
            const flashcards = JSON.parse(content);
            return flashcards;
        } catch (jsonError) {
            console.warn("Direct JSON parsing failed. Attempting to extract JSON.");

            // Locate JSON array within the response
            const jsonStart = content.indexOf("[");
            const jsonEnd = content.lastIndexOf("]") + 1;

            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error("Failed to locate a valid JSON array in the response content.");
            }

            const jsonString = content.slice(jsonStart, jsonEnd);

            try {
                const flashcards = JSON.parse(jsonString);
                return flashcards;
            } catch (finalError: any) {
                console.error("Failed to parse extracted JSON:", finalError.message);
                throw new Error("OpenAI response content is not a valid JSON format.");
            }
        }
    } catch (error: any) {
        console.error("Error generating flashcards:", error.message);
        throw new Error("Failed to generate flashcards");
    }
};
