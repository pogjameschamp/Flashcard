"use client";

import { useRouter } from "next/navigation";
import { auth, provider} from "../config/firebase-config"
import { signInWithPopup } from "firebase/auth";

export default function Login() {
    const router = useRouter();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            router.push("/")
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-lg">
                    <span>Sign in with Google</span>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={signInWithGoogle}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}
