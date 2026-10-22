/**
 * Firebase Configuration Example for SmartLearn TV
 * 
 * Replace with your actual Firebase project settings from the Firebase Console:
 * https://console.firebase.google.com/
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "AIzaSyD-EXAMPLE-API-KEY-FOR-SMARTLEARN-TV",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "smartlearn-tv-firetv.firebaseapp.com",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "smartlearn-tv-firetv",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || "smartlearn-tv-firetv.appspot.com",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || "1:102938475610:web:9c84b1237a90ef",
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID || "G-SLTV9342"
};

/**
 * Example Firebase Client Initializer:
 * 
 * import { initializeApp } from 'firebase/app';
 * import { getAuth } from 'firebase/auth';
 * import { getFirestore } from 'firebase/firestore';
 * 
 * export const app = initializeApp(firebaseConfig);
 * export const auth = getAuth(app);
 * export const db = getFirestore(app);
 */
