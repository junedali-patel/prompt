import { auth } from '../config/firebase';

export const signOut = async () => {
  try {
    // Sign out from Firebase
    await auth.signOut();
    
    // Clear all auth-related data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPreferences');
    
    // Clear any session storage items if they exist
    sessionStorage.clear();
    
    // Clear any cookies related to authentication
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};