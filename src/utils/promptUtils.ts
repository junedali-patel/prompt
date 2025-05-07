
import { toast } from "@/components/ui/use-toast";

// Types for our application
export interface PromptItem {
  id: number;
  text: string;
  createdAt: string;
  suggestions: string[];
  category?: string;
}

export type PromptCategory = "general" | "education" | "creative-writing" | "programming" | "art" | "business" | "personal";

// Sample categories for the prompt explorer
export const promptCategories: { value: PromptCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "education", label: "Education" },
  { value: "creative-writing", label: "Creative Writing" },
  { value: "programming", label: "Programming" },
  { value: "art", label: "Art & Design" },
  { value: "business", label: "Business" },
  { value: "personal", label: "Personal" }
];

// Sample prompts for the explorer section
export const samplePrompts: PromptItem[] = [
  {
    id: 1,
    text: "space exploration",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    suggestions: [
      "Write a story about a first contact scenario with aliens on Mars",
      "Design a space colony habitat for 10,000 people on the Moon",
      "Create a tutorial on how rockets navigate through space",
      "Develop a business plan for asteroid mining operations",
      "Make an illustration of what Saturn would look like from its rings"
    ],
    category: "education"
  },
  {
    id: 2,
    text: "cooking recipes",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    suggestions: [
      "Create a 7-day meal plan using only Mediterranean ingredients",
      "Write a guide on fermentation techniques for beginners",
      "Design a cooking course curriculum for children ages 8-12",
      "Develop fusion recipes combining Japanese and Mexican cuisines",
      "Create illustrations for a visual cookbook with no text"
    ],
    category: "personal"
  },
  {
    id: 3,
    text: "machine learning",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    suggestions: [
      "Explain how neural networks work to a 10-year-old",
      "Create a step-by-step tutorial on building a sentiment analysis model",
      "Design a visual guide to the evolution of AI from 1950 to today",
      "Write code for a simple image recognition algorithm in Python",
      "Develop a business case for implementing ML in healthcare"
    ],
    category: "programming"
  },
  {
    id: 4,
    text: "digital art",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    suggestions: [
      "Create a cyberpunk cityscape with neon lights and flying cars",
      "Design a series of fantasy character portraits with unique features",
      "Make a tutorial on color theory for digital painting",
      "Develop a workflow for creating animated digital illustrations",
      "Generate abstract art inspired by quantum physics concepts"
    ],
    category: "art"
  },
  {
    id: 5,
    text: "sustainable living",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    suggestions: [
      "Design a zero-waste kitchen layout for a small apartment",
      "Write a guide on starting a community garden in urban areas",
      "Create illustrations for upcycling common household items",
      "Develop a 30-day challenge for reducing personal carbon footprint",
      "Make a business plan for a sustainable fashion brand"
    ],
    category: "personal"
  }
];

// Function to generate context-aware suggestions based on input
export const generateSuggestions = (input: string): string[] => {
  // Convert input to lowercase for easier matching
  const lowercaseInput = input.toLowerCase().trim();
  
  // Check if the input contains keywords that match our predefined categories
  const educationKeywords = ["learn", "teach", "education", "school", "study", "course", "tutorial"];
  const artKeywords = ["design", "art", "draw", "paint", "create", "illustration", "graphic"];
  const programmingKeywords = ["code", "program", "develop", "software", "app", "website", "algorithm"];
  const writingKeywords = ["write", "story", "novel", "blog", "article", "essay", "book"];
  const businessKeywords = ["business", "startup", "company", "market", "product", "service", "entrepreneur"];
  
  // Check which category the input might belong to
  let basePrompts: string[] = [];
  
  if (educationKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    basePrompts = [
      `Create a lesson plan about ${input}`,
      `Design an interactive quiz on ${input}`,
      `Write an educational article explaining ${input}`,
      `Develop a curriculum covering ${input}`,
      `Make a visual guide to understand ${input}`
    ];
  } else if (artKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    basePrompts = [
      `Create a visual composition featuring ${input}`,
      `Design a poster representing ${input}`,
      `Illustrate a concept inspired by ${input}`,
      `Make a digital artwork exploring ${input}`,
      `Develop a style guide based on ${input}`
    ];
  } else if (programmingKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    basePrompts = [
      `Write a function that implements ${input}`,
      `Create a tutorial on building ${input}`,
      `Design a system architecture for ${input}`,
      `Develop an algorithm to solve ${input}`,
      `Write pseudocode for ${input}`
    ];
  } else if (writingKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    basePrompts = [
      `Write a short story about ${input}`,
      `Create a character sketch based on ${input}`,
      `Develop a plot outline involving ${input}`,
      `Write a dialogue between characters discussing ${input}`,
      `Create a setting description inspired by ${input}`
    ];
  } else if (businessKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    basePrompts = [
      `Create a business plan for ${input}`,
      `Design a marketing strategy for ${input}`,
      `Develop a pricing model for ${input}`,
      `Write a value proposition for ${input}`,
      `Create a customer persona for ${input}`
    ];
  } else {
    // Generic prompts if no specific category is detected
    basePrompts = [
      `Write a story about ${input}`,
      `Create a tutorial on ${input}`,
      `Design a character based on ${input}`,
      `Develop a business idea around ${input}`,
      `Make a song lyric about ${input}`
    ];
  }
  
  return basePrompts;
};

// Generate more diverse and creative suggestions
export const generateAdvancedSuggestions = (input: string): string[] => {
  const basePrompts = generateSuggestions(input);
  
  // Add more creative and diverse suggestions
  const enhancedPrompts = [
    ...basePrompts,
    `Create a mind map exploring different aspects of ${input}`,
    `Design an infographic that explains ${input} visually`,
    `Write a poem inspired by ${input}`,
    `Develop a fictional world where ${input} is the central theme`,
    `Create a comparative analysis between ${input} and a related concept`
  ];
  
  // Return only 5 suggestions to maintain consistency
  return enhancedPrompts.slice(0, 5);
};

// Function to copy text to clipboard with toast notification
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied to clipboard",
    description: "The prompt has been copied to your clipboard",
  });
};

// Function to save prompt history to localStorage
export const savePromptHistory = (promptHistory: PromptItem[]) => {
  localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
};

// Function to load prompt history from localStorage
export const loadPromptHistory = (): PromptItem[] => {
  const savedHistory = localStorage.getItem('promptHistory');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

// Function to generate a unique ID for new prompts
export const generatePromptId = (): number => {
  return Date.now();
};

// Function to categorize a prompt based on its content
export const categorizePrompt = (prompt: string): PromptCategory => {
  const lowercasePrompt = prompt.toLowerCase();
  
  // Simple categorization logic
  if (/education|learn|teach|study|school|university|college/.test(lowercasePrompt)) {
    return "education";
  }
  if (/write|story|novel|poem|fiction|narrative|author/.test(lowercasePrompt)) {
    return "creative-writing";
  }
  if (/code|programming|software|developer|app|website|algorithm/.test(lowercasePrompt)) {
    return "programming";
  }
  if (/art|design|draw|paint|illustration|graphic|visual/.test(lowercasePrompt)) {
    return "art";
  }
  if (/business|startup|company|entrepreneur|market|product|service/.test(lowercasePrompt)) {
    return "business";
  }
  if (/life|personal|habit|routine|health|wellness|self/.test(lowercasePrompt)) {
    return "personal";
  }
  
  return "general";
};
