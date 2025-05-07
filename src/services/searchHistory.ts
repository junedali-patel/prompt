import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';

export interface SearchHistoryItem {
  id?: string;
  userId: string;
  prompt: string;
  aiResponse: string;
  timestamp: Date;
  category?: string;
}

export const addSearchHistory = async (userId: string, prompt: string, aiResponse: string, category?: string) => {
  try {
    await addDoc(collection(db, 'searchHistory'), {
      userId,
      prompt,
      aiResponse,
      category,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error adding to search history:', error);
  }
};

export const getUserSearchHistory = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'searchHistory'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SearchHistoryItem[];
  } catch (error) {
    console.error('Error fetching search history:', error);
    return [];
  }
};