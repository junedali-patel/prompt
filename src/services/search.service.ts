import { db } from '../config/firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

export const saveSearchHistory = async (userId: string, searchQuery: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new user document with search history
      await setDoc(userRef, {
        searchHistory: [{ query: searchQuery, timestamp: new Date() }]
      });
    } else {
      // Update existing user's search history
      await updateDoc(userRef, {
        searchHistory: arrayUnion({
          query: searchQuery,
          timestamp: new Date()
        })
      });
    }
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};