"use client";
import Nav from "@/components/Nav";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-slate-800 w-screen h-screen flex items-center justify-center">
        <div className="text-center w-full">
          <button
            className="bg-white py-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
      <Nav />
      <div className="bg-white text-black flex-grow mb-2 mr-2 mt-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
