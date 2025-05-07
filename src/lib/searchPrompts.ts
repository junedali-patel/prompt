import promptsData from '../data/prompts.json';

export interface Prompt {
    id: string;
    title: string;
    content: string;
    category: string;
    keywords: string[];
}

export const searchPrompts = (keyword: string): Prompt[] => {
    if (!keyword.trim()) return [];

    const searchTerm = keyword.toLowerCase();

    return (promptsData as Prompt[]).filter(prompt => {
        return (
            prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.content.toLowerCase().includes(searchTerm) ||
            prompt.keywords.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            prompt.category.toLowerCase().includes(searchTerm)
        );
    });
}; 