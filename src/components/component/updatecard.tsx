import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateWord, deleteWord } from '../../app/actions/actions'; // Import your update and delete functions
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Card {
  id: string;
  word: string;
  meaning: string;
  userId: string;
  topicId: string;
}

const formSchema = z.object({
  word: z.string()
    .min(2, { message: "Word must be at least 2 characters." })
    .max(30, { message: "Word cannot be longer than 30 characters." }),
  meaning: z.string()
    .min(2, { message: "Meaning must be at least 2 characters." })
    .max(100, { message: "Meaning cannot be longer than 100 characters." }), // Example for meaning length
});

interface UpdateCardDialogProps {
  card: Card;
  onUpdate: () => void;
}

export default function UpdateCardDialog({ card, onUpdate }: UpdateCardDialogProps) {
  const { id, word, meaning, userId, topicId } = card;
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: word,
      meaning: meaning,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateWord(userId, topicId, id, values.word, values.meaning);
    onUpdate(); // Call the onUpdate function to refresh the card list
    setIsOpen(false); // Close the dialog
  };

  const handleDelete = async () => {
    await deleteWord(userId, topicId, id);
    onUpdate(); // Call the onUpdate function to refresh the card list
    setIsOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Card</DialogTitle>
          <DialogDescription>
            Please edit your card below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
            </div>
            <DialogFooter className="flex justify-between">
              <Button type="submit">Update</Button>
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
