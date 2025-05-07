import axios from 'axios';

export const callGeminiRestAPI = async (prompt: string, apiKey: string, modelName?: string): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    // Use gemini-1.5-flash which is available in v1beta API
    const model = modelName ? modelName : 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    console.log('Making API request with prompt:', prompt);
    console.log('Using model:', model);
    console.log('Using API key:', apiKey.substring(0, 5) + '...');

    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    console.log('Response status:', response.status);
    console.log('API Response:', response.data);

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No response generated from the model');
    }

    return text;
  } catch (error: any) {
    console.error('Detailed error:', error);
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    else if (error.message === 'API key is required') {
      throw new Error('API key is required. Please check your environment variables.');
    }
    else {
      throw new Error('API error');
    }
  }
}; 