// actions.ts
import { db } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
