"use client";

import { addTopic } from "../actions/actions";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import useWordsStore from "../stores/wordStore";
import Image from 'next/image';
import peter from '../Peter_Griffin.png';

export default function Collection() {
  const [topic, setTopic] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { topics, fetchTopics, setTopicsFromStorage } = useWordsStore();

  useEffect(() => {
    setTopicsFromStorage(); // Set topics from session storage on component mount
  }, [setTopicsFromStorage]);

  useEffect(() => {
    const fetchTopicList = async () => {
      if (user) {
        await fetchTopics(user.uid);
      }
    };
    fetchTopicList();
  }, [user, fetchTopics]);

  const submitTopic = async (e: any) => {
    e.preventDefault();
    if (user?.uid) {
      await addTopic(user.uid, topic);
      console.log(user.uid);
      // Fetch the updated list of topics after adding a new one
      await fetchTopics(user.uid);
      setTopic(''); // Clear the input field
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Your Topics:</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
      <div className="flex justify-center p-6">
        <form className="border border-gray-300 p-4" onSubmit={submitTopic}>
          <input
            placeholder="Topic"
            value={topic}
            className="border border-gray-300 p-2 mb-2 w-full"
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            type="submit"
            className="border border-gray-300 p-2 w-full"
          >
            Submit Topic
          </button>
        </form>
      </div>
      <Image src={peter} alt="peter" />
      <p>w gooning w jizz</p>
    </div>
  );
}
