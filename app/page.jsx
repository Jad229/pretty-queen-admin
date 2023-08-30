"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex text-lg gap-2 rounded-lg items-center justify-between">
      <h2>
        Hello, <span className="font-bold">{session?.user?.name}</span>
      </h2>
      <div className="flex bg-gray-300 gap-1 items-center rounded-lg overflow-hidden">
        <Image
          src={session?.user?.image}
          width={40}
          height={40}
          alt="profile picture"
        />
        <span className="font-medium px-2">{session?.user?.name}</span>
      </div>
    </div>
  );
}
