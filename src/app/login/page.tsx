"use client";

import { useRouter } from "next/navigation";
import { auth, provider} from "../config/firebase-config"
import { signInWithPopup } from "firebase/auth";

export default function Login() {
    const router = useRouter();

    const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, provider);
          router.push("/");
        } catch (error) {
          console.error("Error signing in with Google: ", error);
          alert("Failed to sign in. Please try again.");
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome</h1>
                <p className="text-center text-gray-600 mb-8">Sign in to access your account</p>
                <div className="flex flex-col items-center space-y-4">
                    <button 
                        className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={signInWithGoogle}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor"/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
