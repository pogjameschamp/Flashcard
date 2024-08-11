import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
 
interface FlashcardProps {
  word: string;
  meaning: string;
  showWord: boolean;
}

export function Flashcard({ word, meaning, showWord }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [word, meaning]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 w-full max-w-4xl h-[32rem] cursor-pointer" onClick={handleFlip}>
      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <Card className="absolute w-full h-full backface-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
          <CardContent className="flex items-center justify-center h-full p-12">
            <p className="text-5xl font-bold text-center">{word}</p>
          </CardContent>
        </Card>
        <Card className="absolute w-full h-full backface-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800" style={{ transform: 'rotateY(180deg)' }}>
          <CardContent className="flex items-center justify-center h-full p-12">
            <p className="text-5xl font-bold text-center">{meaning}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}