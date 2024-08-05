"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWords, addWord } from '../../actions/actions';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";

const TopicPage = () => {
  const { topicId } = useParams();
  const [user] = useAuthState(auth);
  const [wordList, setWordList] = useState<any[]>([]);
  const [newWord, setNewWord] = useState<string>('');
  const [newMeaning, setNewMeaning] = useState<string>('');

  useEffect(() => {
    const fetchWordsList = async () => {
      if (user && topicId) {
        const fetchedWords = await fetchWords(user.uid, topicId as string);
        setWordList(fetchedWords);
      }
    };
    fetchWordsList();
  }, [user, topicId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && topicId && newWord && newMeaning) {
      await addWord(user.uid, topicId as string, newWord, newMeaning);
      const updatedWords = await fetchWords(user.uid, topicId as string);
      setWordList(updatedWords);
      setNewWord('');
      setNewMeaning('');
    }
  };

  return (
    <div>
      <h2>Words in this topic:</h2>
      <ul>
        {wordList.map((word) => (
          <li key={word.id}>
            <strong>{word.word}</strong>: {word.meaning}
          </li>
        ))}
      </ul>
      <div className="flex justify-center p-6">
        <form className="border border-gray-300 p-4" onSubmit={handleSubmit}>
          <input
            placeholder="Word"
            value={newWord}
            className="border border-gray-300 p-2 mb-2 w-full"
            onChange={(e) => setNewWord(e.target.value)}
          />
          <input
            placeholder="Meaning"
            value={newMeaning}
            className="border border-gray-300 p-2 mb-2 w-full"
            onChange={(e) => setNewMeaning(e.target.value)}
          />
          <button
            type="submit"
            className="border border-gray-300 p-2 w-full"
          >
            Submit Pair
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopicPage;
