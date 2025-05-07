export interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: number;
    results: Array<{
        title: string;
        prompt: string;
    }>;
}

const HISTORY_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 10;

export const addToHistory = (query: string, results: Array<{ title: string; prompt: string }>) => {
    const history = getHistory();
    const newItem: SearchHistoryItem = {
        id: crypto.randomUUID(),
        query,
        timestamp: Date.now(),
        results
    };

    // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
};

export const getHistory = (): SearchHistoryItem[] => {
    try {
        const history = localStorage.getItem(HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch {
        return [];
    }
};

export const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
};

export const removeHistoryItem = (id: string) => {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
};

export const formatTimestamp = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;

    // Less than a minute
    if (diff < 60000) {
        return 'Just now';
    }
    // Less than an hour
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    // Less than a day
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    // Format as date
    return new Date(timestamp).toLocaleDateString();
}; 