import OpenAI from "openai";
import { addWord } from "./actions";

// Initialize OpenAI with your API key (ensure the API key is stored in an environment variable)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string, 
  dangerouslyAllowBrowser: true, // Make sure this is needed for your use case
});

// Define types for OpenAI API response
interface OpenAIMessage {
  role: string;
  content: string | null;
}

interface OpenAIChoice {
  message: OpenAIMessage;
}

interface OpenAICompletion {
  choices: OpenAIChoice[];
}

const structuredPrompt = (prompt: string) => `
You are a helpful assistant. Please generate a set of flashcards based on the following topic:

Topic: ${prompt}

Format the flashcards as follows:

Term 1: [Your term here]
Definition 1: [Your definition here]

Term 2: [Your term here]
Definition 2: [Your definition here]

Please generate at least 5 flashcards.
`;

export async function getOpenAIResponse(prompt: string): Promise<string> {
  try {
    const completion: OpenAICompletion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": structuredPrompt(prompt)}
      ],
      model: "gpt-4", // Ensure the model name matches what you have access to
    });

    // Log the completion for debugging purposes
    console.log("OpenAI completion:", completion);

    return completion.choices[0]?.message?.content ?? "No response from AI.";
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    return "There was an error processing your request.";
  }
}

// Function to parse the OpenAI response into flashcards
export function parseFlashcards(response: string) {
  const flashcards = [];
  const regex = /Term \d+:\s*(.*?)\s*Definition \d+:\s*((?:.|\n)*?)(?=(Term \d+:|$))/g;
  let match;

  while ((match = regex.exec(response)) !== null) {
    flashcards.push({
      term: match[1].trim(),
      definition: match[2].trim(),
    });
  }

  // Log parsed flashcards for debugging purposes
  console.log("Parsed flashcards:", flashcards);

  return flashcards;
}




// Function to save the flashcards to the collection
export async function saveFlashcardsToCollection(flashcards: { term: string, definition: string }[], userId: string, topicId: string) {
  for (const flashcard of flashcards) {
    try {
      await addWord(userId, topicId, flashcard.term, flashcard.definition);
    } catch (error) {
      console.error("Error saving flashcard:", flashcard, error);
    }
  }
}
