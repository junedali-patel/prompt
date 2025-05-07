import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

interface Prompt {
    createdAt: string;
    updatedAt: string;
    description: string;
    generatedText: string;
    content: string;
    id: string;
    title: string;
    text: string;
    keywords: string[];
    category: string;
    // Add other fields as needed
}

// Get prompts by keyword
export const fetchPromptsByKeyword = async (keyword: string): Promise<Prompt[]> => {
    try {
        const promptsRef = collection(db, "prompts");
        const q = query(
            promptsRef,
            where("keywords", "array-contains", keyword.toLowerCase())
        );

        const querySnapshot = await getDocs(q);
        const results: Prompt[] = [];

        querySnapshot.forEach((doc) => {
            results.push({
                id: doc.id,
                ...doc.data()
            } as Prompt);
        });

        // If no exact matches, try partial matches
        if (results.length === 0) {
            const allPromptsQuery = query(promptsRef);
            const allPromptsSnapshot = await getDocs(allPromptsQuery);
            const keywordLower = keyword.toLowerCase();

            allPromptsSnapshot.forEach((doc) => {
                const data = doc.data();
                // Check if keyword is part of title, content, or any keyword
                if (
                    data.title.toLowerCase().includes(keywordLower) ||
                    data.content.toLowerCase().includes(keywordLower) ||
                    data.keywords.some((k: string) => k.toLowerCase().includes(keywordLower))
                ) {
                    results.push({
                        id: doc.id,
                        ...data
                    } as Prompt);
                }
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching prompts:", error);
        throw error;
    }
};

// Optional: Add more query functions
export const fetchPromptsByCategory = async (category: string): Promise<Prompt[]> => {
    try {
        const promptsRef = collection(db, "prompts");
        const q = query(
            promptsRef,
            where("category", "==", category.toLowerCase())
        );

        const querySnapshot = await getDocs(q);
        const results: Prompt[] = [];

        querySnapshot.forEach((doc) => {
            results.push({
                id: doc.id,
                ...doc.data()
            } as Prompt);
        });

        return results;
    } catch (error) {
        console.error("Error fetching prompts:", error);
        throw error;
    }
}; 