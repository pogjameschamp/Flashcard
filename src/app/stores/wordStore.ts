import { create } from 'zustand';
import { db } from '../config/firebase-config';
import { collection, query, getDocs } from 'firebase/firestore';

interface Topic {
  id: string;
  name: string;
}

interface WordsState {
  topics: Topic[];
  fetchTopics: (userId: string) => Promise<Topic[]>;
  setTopicsFromStorage: () => void;
}

const useWordsStore = create<WordsState>((set) => ({
  topics: [],
  fetchTopics: async (userId: string) => {
    const topicsRef = collection(db, `users/${userId}/topics`);
    const querySnapshot = await getDocs(topicsRef);
    const topicsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
    }));
    set({ topics: topicsList });
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("topics", JSON.stringify(topicsList));
    }
    return topicsList;
  },
  setTopicsFromStorage: () => {
    if (typeof window !== 'undefined') {
      const topics = JSON.parse(sessionStorage.getItem("topics") || "[]");
      set({ topics });
    }
  }
}));

export default useWordsStore;
