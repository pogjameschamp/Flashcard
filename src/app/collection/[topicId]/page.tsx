"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWords, addWord } from '../../actions/actions';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase-config";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  word: z.string()
    .min(2, { message: "Word must be at least 2 characters." })
    .max(30, { message: "Word cannot be longer than 30 characters." }),
  meaning: z.string()
    .min(2, { message: "Meaning must be at least 2 characters." })
    .max(100, { message: "Meaning cannot be longer than 100 characters." }), // Example for meaning length
});

const TopicPage = () => {
  const { topicId } = useParams();
  const [user] = useAuthState(auth);
  const [wordList, setWordList] = useState<any[]>([]);

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
    }
  };

  useEffect(() => {
    fetchWordsList();
  }, [user, topicId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user && topicId) {
      await addWord(user.uid, topicId as string, values.word, values.meaning);
      fetchWordsList();
      form.reset();
    }
  };

  const handleUpdate = () => {
    fetchWordsList();
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Words in this topic:</h2>
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
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
