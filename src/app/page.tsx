"use client";

import { useEffect } from "react";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h1>Your words:</h1>

    </div>
  );
}