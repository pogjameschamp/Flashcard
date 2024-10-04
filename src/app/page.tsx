"use client";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchTopics, fetchWords } from "./actions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/component/flashcard";

interface Topic {
  id: string;
  name: string;
  description: string;
}

interface Word {
  id: string;
  word: string;
  meaning: string;
}

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTopics(user.uid).then((fetchedTopics) => {
        setTopics(fetchedTopics as Topic[]);
      });
    }
  }, [user]);

  const handleTopicSelect = async (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    setSelectedTopic(topic || null);
    if (topic && user) {
      const fetchedWords = await fetchWords(user.uid, topic.id);
      setWords(fetchedWords as Word[]);
      setCurrentWordIndex(0);
      setIsFinished(false);
    }
  };

  const handleNextWord = () => {
    setIsChanging(true);
    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setIsFinished(true);
      }
      setIsChanging(false);
    }, 300); // Adjust this delay as needed
  };

  const handlePreviousWord = () => {
    setIsChanging(true);
    setTimeout(() => {
      if (currentWordIndex > 0) {
        setCurrentWordIndex(currentWordIndex - 1);
      }
      setIsChanging(false);
    }, 300); // Adjust this delay as needed
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setIsFinished(false);
  };

  return (
    // min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100
    <div className=""> 
      <div className="flex flex-col p-8 h-screen">
        <Select onValueChange={handleTopicSelect}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {!selectedTopic && topics.length === 0 && (
          <div className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Flashcards!</h2>
            <p className="text-lg text-center mb-4">Create a collection to get started!</p>
            <Link href="/collection">
              <Button>Create Collection</Button>
            </Link>
          </div>
        )}

        {!selectedTopic && topics.length > 0 && (
          <div className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Flashcards!</h2>
            <p className="text-lg text-center">Please select a topic to start studying.</p>
          </div>
        )}
    
        {selectedTopic && words.length === 0 && (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">No cards found</h2>
          <p className="text-lg text-center mb-4">This topic doesn't have any flashcards yet. Add some cards to get started!</p>
          <Link href={`/collection/${selectedTopic.id}`}>
            <Button>Add cards now!</Button>
          </Link>
        </div>
        )}
      
        {selectedTopic && words.length > 0 && !isFinished && (
          <div className="flex-grow flex flex-col items-center justify-center p-8">
            <Flashcard
              word={words[currentWordIndex].word}
              meaning={words[currentWordIndex].meaning}
              showWord={true}
              isChanging={isChanging}
            />
            <div className="mt-8 flex space-x-4">
              <Button onClick={handlePreviousWord} disabled={currentWordIndex === 0 || isChanging}>Previous</Button>
              <Button onClick={handleNextWord} disabled={isChanging}>
                {currentWordIndex === words.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
    
        {isFinished && (
          <div className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations! You've finished all the flashcards.</h2>
            <Button onClick={handleRestart}>Start Over</Button>
          </div>
        )}
      </div>
    </div>
  );
}