"use client";

import { useEffect, useState } from 'react';
import { addTopic, fetchTopics } from "../actions/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
import useWordsStore from "../stores/wordStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

const formSchema = z.object({
  topic: z.string()
    .min(2, { message: "Topic must be at least 2 characters." })
    .max(30, { message: "Topic cannot be longer than 30 characters." }),
  description: z.string()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(60, { message: "Description cannot be longer than 60 characters." }),
});

export default function Collection() {
  const [user] = useAuthState(auth);
  const { setTopicsFromStorage } = useWordsStore();
  const [topicList, setTopicList] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      description: "",
    },
  });

  useEffect(() => {
    setTopicsFromStorage(); 
  }, [setTopicsFromStorage]);

  useEffect(() => {
    const fetchTopicList = async () => {
      if (user) {
        const fetchedTopics = await fetchTopics(user.uid);
        setTopicList(fetchedTopics);
      }
    };
    fetchTopicList();
  }, [user]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      await addTopic(user.uid, values.topic, values.description);
      const updatedTopics = await fetchTopics(user.uid);
      setTopicList(updatedTopics);
      form.reset();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border p-6 rounded-md shadow-md bg-white"
          >
            <h2 className="text-2xl font-bold mb-4">Add a New Topic</h2>
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="">Submit Topic</Button>
            
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicList.map((topic) => (
          <Card key={topic.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{topic.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{topic.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link className='w-full' href={`/collection/${topic.id}`}>
                <Button className="w-full">
                  <Check className="mr-2 h-4 w-4" /> Go to Topic
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
