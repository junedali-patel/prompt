import { getAIResponse } from "../api/geminiAPI";

export async function generatePromptSuggestions(userPrompt: string) {
    if (!userPrompt.trim()) {
        throw new Error('Please enter a prompt');
    }

    const systemPrompt = `Generate 3 creative and detailed prompts related to: "${userPrompt}"
    Format the response as JSON array with objects containing 'title' and 'prompt' fields.
    Make each prompt unique and thought-provoking.`;

    try {
        const response = await getAIResponse(systemPrompt);
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            throw new Error('No content generated from AI');
        }

        try {
            // Clean the response text to ensure valid JSON
            const cleanedText = generatedText.replace(/```json\n?|```/g, '').trim();
            const suggestions = JSON.parse(cleanedText);

            if (!Array.isArray(suggestions)) {
                throw new Error('Invalid response format');
            }

            return suggestions.slice(0, 3);
        } catch (parseError) {
            console.error('Parse error:', parseError);
            // Return a formatted version of the raw text if JSON parsing fails
            return [{
                title: "Generated Response",
                prompt: generatedText.trim()
            }];
        }
    } catch (error) {
        console.error('Generation error details:', error);
        throw error;
    }
} 