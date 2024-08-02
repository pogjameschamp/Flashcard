// actions.ts
import { db } from '../config/firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addTopic = async (userId: string, topicName: string) => {
  try {
    const topicsRef = collection(db, `users/${userId}/topics`);
    const docRef = await addDoc(topicsRef, { name: topicName });
    console.log("Topic added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function addWord(userId: string, topicId: string, word: string, meaning: string) {
  const wordsRef = collection(db, `users/${userId}/topics/${topicId}/words`);
  const docRef = await addDoc(wordsRef, { word, meaning });
  console.log("Word added with ID: ", docRef.id);
}

interface Topic {
  id: string;
  name: string;
}

export const fetchTopics = async (userId: string): Promise<Topic[]> => {
  const topicsRef = collection(db, `users/${userId}/topics`);
  const querySnapshot = await getDocs(topicsRef);
  const topics = querySnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
  }));
  return topics;
}

async function fetchWords(userId: string, topicId: string) {
  const wordsRef = collection(db, `users/${userId}/topics/${topicId}/words`);
  const querySnapshot = await getDocs(wordsRef);
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Fetched words: ", words);
  return words;
}