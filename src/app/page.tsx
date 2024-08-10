"use client";

import { useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {

  }, []);

  return (
    <div className="flex flex-row h-screen m-8">
      <div className="basis-1/2 border border-gray-300 p-4">01</div>
      <div className="basis-1/2 border border-gray-300 p-4">02</div>

    </div>
  );
}