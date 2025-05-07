import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { callGeminiRestAPI } from '../../services/gemini';

interface VoiceAssistantProps {
  onPromptGenerated?: (prompt: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onPromptGenerated }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [response, setResponse] = useState('');
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const processResponse = (text: string): string => {
    // Remove any markdown formatting
    let processed = text.replace(/```/g, '').trim();
    
    // Remove any explanatory text before or after the prompt
    processed = processed.replace(/^(Here's|Here is|Generated prompt:|Prompt:).*?\n/i, '');
    processed = processed.replace(/\n.*?(Note:|Tips:|Remember:|This prompt).*$/is, '');
    
    // Remove multiple newlines and extra spaces
    processed = processed.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Ensure the prompt is not too long (max 200 characters)
    if (processed.length > 200) {
      processed = processed.substring(0, 197) + '...';
    }
    
    return processed;
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setIsProcessing(false);
      };

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setIsProcessing(true);
        
        try {
          // Generate response using Gemini AI REST API with a more focused prompt
          const prompt = `Generate a short, effective AI prompt based on: "${transcript}"
                         
                         Requirements:
                         - Keep it under 200 characters
                         - Be specific and direct
                         - Focus on the core request
                         - Use clear, concise language
                         - Remove any unnecessary words
                         
                         Return ONLY the prompt text, no explanations or formatting.`;
          
          const text = await callGeminiRestAPI(prompt, API_KEY);
          
          if (!text || text === 'No response') {
            throw new Error('Failed to generate a valid response');
          }
          
          // Process the response to make it more concise
          const processedResponse = processResponse(text);
          setResponse(processedResponse);
          
          if (onPromptGenerated) {
            onPromptGenerated(processedResponse);
          }
          
          // Speak the response
          const utterance = new SpeechSynthesisUtterance(processedResponse);
          window.speechSynthesis.speak(utterance);
          
          toast.success('Prompt generated successfully!');
        } catch (error: any) {
          console.error('Error generating response:', error);
          const errorMessage = error.message || 'Failed to generate response. Please try again.';
          toast.error(errorMessage);
          setResponse(''); // Clear any previous response
        } finally {
          setIsProcessing(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Speech recognition error. Please try again.');
      };

      window.recognition = recognition;
    } else {
      toast.error('Speech recognition is not supported in your browser.');
    }
  }, [onPromptGenerated]);

  const toggleListening = () => {
    if (!API_KEY) {
      toast.error('Gemini API key is not configured');
      return;
    }

    if (isListening) {
      window.recognition?.stop();
    } else {
      window.recognition?.start();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full bg-[#10A37F] flex items-center justify-center shadow-lg
                     ${isListening ? 'animate-pulse' : ''}`}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            ) : (
              <motion.svg
                key="mic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-96 bg-[#202123] rounded-lg shadow-xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Voice Assistant</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleListening}
                    className={`px-4 py-2 rounded-md text-white font-medium
                              ${isListening ? 'bg-red-500' : 'bg-[#10A37F]'}`}
                  >
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                  </button>
                </div>

                {transcript && (
                  <div className="bg-[#343541] rounded-md p-3">
                    <p className="text-white/80 text-sm font-medium mb-1">You said:</p>
                    <p className="text-white/80 text-sm">{transcript}</p>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex items-center space-x-2 text-white/60">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#10A37F] border-t-transparent"></div>
                    <span>Processing your request...</span>
                  </div>
                )}

                {response && (
                  <div className="bg-[#343541] rounded-md p-3">
                    <p className="text-white/80 text-sm font-medium mb-1">Generated Prompt:</p>
                    <p className="text-white/80 text-sm whitespace-pre-wrap">{response}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VoiceAssistant; 