"use client";

import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useEffect, useState } from 'react';
import { fetchWords, addWord } from '../../actions/actions';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"; // Import Progress component
import UpdateCardDialog from '@/components/component/updatecard';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getOpenAIResponse, saveFlashcardsToCollection, parseFlashcards } from '../../actions/openai'; // Adjust the path as necessary

const formSchema = z.object({
  word: z.string()
    .min(2, { message: "Word must be at least 2 characters." })
    .max(30, { message: "Word cannot be longer than 30 characters." }),
  meaning: z.string()
    .min(2, { message: "Meaning must be at least 2 characters." })
    .max(100, { message: "Meaning cannot be longer than 100 characters." }),
});

const TopicPage = () => {
  const { topicId } = useParams();
  const [user] = useAuthState(auth);
  const [wordList, setWordList] = useState<any[]>([]);
  const [topicName, setTopicName] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      meaning: "",
    },
  });

  const fetchWordsList = async () => {
    if (user && topicId) {
      const fetchedWords = await fetchWords(user.uid, topicId as string);
      const wordsWithMeta = fetchedWords.map(word => ({
        ...word,
        userId: user.uid,
        topicId: topicId as string,
      }));
      setWordList(wordsWithMeta);
  
      const topicDoc = await getDoc(doc(db, 'users', user.uid, 'topics', topicId as string));
      if (topicDoc.exists()) {
        setTopicName(topicDoc.data().name);
      }
    }
  };

  useEffect(() => {
    fetchWordsList();
  }, [user, topicId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user && topicId) {
      try {
        await addWord(user.uid, topicId as string, values.word, values.meaning);
        await fetchWordsList();
        form.reset();
      } catch (error) {
        console.error("Error adding word: ", error);
        alert("Failed to add word. Please try again.");
      }
    }
  };

  const handleGenerateFlashcards = async () => {
    if (user && topicId && prompt.trim()) {
      try {
        setIsLoading(true);  // Start loading
        setProgress(20); // Start progress bar

        const response = await getOpenAIResponse(prompt);
        console.log("OpenAI Response:", response);
        setProgress(50); // Update progress

        const flashcards = parseFlashcards(response);
        setProgress(70); // Update progress

        // Save flashcards to the collection
        await saveFlashcardsToCollection(flashcards, user.uid, topicId as string);
        setProgress(100); // Finish progress
        await fetchWordsList();
        setPrompt(""); // Clear the prompt input after submission
      } catch (error) {
        console.error("Error generating flashcards: ", error);
        alert("Failed to generate flashcards. Please try again.");
      } finally {
        setIsLoading(false);  // Stop loading
        setProgress(0); // Reset progress bar
      }
    } else {
      alert("Please enter a valid prompt.");
    }
  };

  const handleUpdate = () => {
    fetchWordsList();
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{topicName}</h2>      
      <div className="flex flex-row">
        <div className="w-1/2 pr-4">
          <ul className="space-y-4">
            {wordList.map((word) => (
              <Card key={word.id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{word.word}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{word.meaning}</CardDescription>
                </CardContent>
                <CardFooter>
                  <UpdateCardDialog card={word} onUpdate={handleUpdate} />
                </CardFooter>
              </Card>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border p-6 rounded-md shadow-md"
            >
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Word</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter word" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meaning" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit Pair</Button>
            </form>
          </Form>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Generate Flashcards</h2>
            <Input
              placeholder="Enter prompt for generating flashcards"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleGenerateFlashcards} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Flashcards"}
            </Button>

            {isLoading && (
              <div className="mt-4">
                <Progress value={progress} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
