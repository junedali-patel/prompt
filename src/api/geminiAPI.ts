import axios from "axios";

interface GenerationResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
}

// Use gemini-1.5-flash which is available in v1beta API
const MODEL_NAME = 'gemini-1.5-flash';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

export async function getAIResponse(prompt: string) {
    if (!GEMINI_API_KEY) {
        throw new Error('API key is missing. Please check your environment variables.');
    }

    try {
        console.log('Making API request with model:', MODEL_NAME);
        const response = await axios.post(
            GEMINI_URL,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Error fetching from Gemini:", error.response?.data || error.message);
        if (error.response?.data?.error?.message) {
            throw new Error(error.response.data.error.message);
        }
        else {
            throw new Error('API error');
        }
    }
} 