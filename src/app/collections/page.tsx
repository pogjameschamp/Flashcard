"use client"
import React, { useState } from 'react';
import { getOpenAIResponse } from '../actions/openai'; // Adjust the path as needed

const Collections = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<string | null>("");

  const handleSubmit = async () => {
    if (prompt.trim() === "") {
      setOutput("Please enter a valid prompt.");
      return;
    }

    const response = await getOpenAIResponse(prompt);
    setOutput(response);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='bg-white border rounded-lg p-6 w-full'>
        <h1 className='text-2xl font-bold'>Input</h1>
        <input 
          type="text"
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className='mt-1 block w-full rounded-md p-2'
        />
        <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded-md mt-2'>
          Submit prompt
        </button>
      </div>

      <div className='bg-white border rounded-lg p-6 w-full mt-6'>
        <h1 className='text-2xl font-bold'>Output</h1>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default Collections;
