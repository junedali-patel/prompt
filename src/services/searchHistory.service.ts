import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export const saveSearchHistory = async (userId: string, searchQuery: string) => {
  try {
    await addDoc(collection(db, 'searchHistory'), {
      userId,
      query: searchQuery,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error saving search history:', error);
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
    }));
  } catch (error) {
    console.error('Error fetching search history:', error);
    return [];
  }
};