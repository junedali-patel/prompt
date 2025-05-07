import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");
const prompts = require("./SeniorCitizenHelper_FullPrompts.json");

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadPrompts() {
    const batch = db.batch();
    const collectionRef = db.collection("prompts");

    prompts.forEach((prompt, index) => {
        const docRef = collectionRef.doc(); // Auto ID
        batch.set(docRef, prompt);
    });

    await batch.commit();
    console.log("✅ Prompts uploaded successfully!");
}

uploadPrompts().catch(console.error); 