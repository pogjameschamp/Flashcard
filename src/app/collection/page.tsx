"use client";
import { addDocument } from "../actions/actions"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase-config"

import Image from 'next/image';
import peter from '../Peter_Griffin.png'

export default function Collection() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const submitWord = async (e: any) => {
        e.preventDefault();
        const uid = user?.uid;
        await addDocument('pairs', { word, meaning, uid})
        console.log(user?.uid);
        setWord('');
        setMeaning('');
    }

    return (
        <div className="flex flex-col">
        <div className="flex justify-center p-6">
            <form className="border border-gray-300 p-4">
                <input 
                    placeholder="Word" 
                    value={word}
                    className="border border-gray-300 p-2 mb-2 w-full"
                    onChange={(e) => setWord(e.target.value)}
                />
                <input 
                    placeholder="Meaning" 
                    value={meaning}
                    className="border border-gray-300 mb-2 p-2 w-full"
                    onChange={(e) => setMeaning(e.target.value)}
                />
                <button 
                    type="submit"
                    className="border border-gray-300 p-2 w-full"
                    onClick={submitWord}
                >
                    Submit Collection
                </button>
            </form>
        </div>
            <Image src={peter} alt = "peter"/>
            <p>w gooning w jizz</p>
        </div>
        
    )

}