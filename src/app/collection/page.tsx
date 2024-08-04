"use client";

import { addTopic } from "../actions/actions";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import useWordsStore from "../stores/wordStore";
import Image from 'next/image';
import peter from '../Peter_Griffin.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Topics:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="w-full">
            <CardHeader>
              <CardTitle>{topic.name}</CardTitle>
              <CardDescription>Description for {topic.name}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" /> Go to Topic
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
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
      <div className="flex justify-center mt-6">
        <Image src={peter} alt="peter" className="rounded-full"/>
      </div>
      <div className="flex justify-center mt-2">
        <p>w gooning w jizz</p>
      </div>
    </div>
  );
}
