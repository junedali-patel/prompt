import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAOWHNjvIenfm6anA1APatC_WbmMXE13k4",
    authDomain: "prompt-generator-dyp.firebaseapp.com",
    databaseURL: "https://prompt-generator-dyp-default-rtdb.firebaseio.com",
    projectId: "prompt-generator-dyp",
    storageBucket: "prompt-generator-dyp.appspot.com",
    messagingSenderId: "941052975388",
    appId: "1:941052975388:web:4359f77a19ee5eeccb82d9",
    measurementId: "G-64B19KPFJS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

interface Prompt {
  status: string;
  content: ReactNode;
  generatedText: any;
  category: React.ReactNode;
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SearchContextType {
  recentSearches: Prompt[];
  addToRecent: (prompt: Prompt) => void;
  updateDashboardResults: (prompts: Prompt[]) => void;
  dashboardResults: Prompt[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentSearches, setRecentSearches] = useState<Prompt[]>([]);
  const [dashboardResults, setDashboardResults] = useState<Prompt[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', 'current-user-id')); // Replace with actual user ID
      if (userDoc.exists()) {
        setRecentSearches(userDoc.data().recentSearches || []);
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const addToRecent = async (prompt: Prompt) => {
    const updatedRecent = [prompt, ...recentSearches.filter(p => p.id !== prompt.id)].slice(0, 5);
    setRecentSearches(updatedRecent);

    try {
      await setDoc(doc(db, 'users', 'current-user-id'), {
        recentSearches: updatedRecent
      }, { merge: true });
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const updateDashboardResults = (prompts: Prompt[]) => {
    setDashboardResults(prompts);
  };

  return (
    <SearchContext.Provider value={{
      recentSearches,
      addToRecent,
      dashboardResults,
      updateDashboardResults
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 