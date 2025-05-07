import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add error handling
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in');
    } else {
        console.log('No user is signed in');
    }
}, (error) => {
    console.error('Auth state change error:', error);
}); 