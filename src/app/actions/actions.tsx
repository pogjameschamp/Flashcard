// actions.ts
import { db } from '../config/firebase-config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function addTopic(userId: string, topicName: string, description: string) {
  const topicsCollection = collection(db, `users/${userId}/topics`);
  await addDoc(topicsCollection, { name: topicName, description });
}

export async function addWord(userId: string, topicId: string, word: string, meaning: string) {
  const wordsRef = collection(db, `users/${userId}/topics/${topicId}/words`);
  const docRef = await addDoc(wordsRef, { word, meaning });
  console.log("Word added with ID: ", docRef.id);
}

interface Topic {
  id: string;
  name: string;
}

export async function fetchTopics(userId: string) {
  const topicsCollection = collection(db, `users/${userId}/topics`);
  const querySnapshot = await getDocs(topicsCollection);
  const topics = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return topics;
}

export const deleteTopic = async (userId: string, topicId: string) => {
  const topicRef = doc(db, 'users', userId, 'topics', topicId);
  await deleteDoc(topicRef);
};

export async function fetchWords(userId: string, topicId: string) {
  const wordsRef = collection(db, `users/${userId}/topics/${topicId}/words`);
  const querySnapshot = await getDocs(wordsRef);
  const words = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Fetched words: ", words);
  return words;
}

export async function updateWord(userId: string, topicId: string, wordId: string, newWord: string, newMeaning: string) {
  const wordRef = doc(db, `users/${userId}/topics/${topicId}/words/${wordId}`);
  await updateDoc(wordRef, {
    word: newWord,
    meaning: newMeaning,
  });
  console.log(`Word updated with ID: ${wordId}`);
}

export async function deleteWord(userId: string, topicId: string, wordId: string): Promise<void> {
  const wordDocRef = doc(db, `users/${userId}/topics/${topicId}/words`, wordId);
  await deleteDoc(wordDocRef);
}

