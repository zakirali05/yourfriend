"use client";
import MainContainer from "@/components/MainContainer";
import { ARRAY_OF_VIDEOS } from "@/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const [RANDOM_VIDEO, SET_RANDOM_VIDEO] = useState(0);
  useEffect(() => {
    const RANDOM_VIDEO = Math.floor(Math.random() * 8) + 1;
    SET_RANDOM_VIDEO(RANDOM_VIDEO);
  }, []);
  return (
    <main className="flex justify-center min-h-screen  relative overflow-hidden">
      <video
        src={ARRAY_OF_VIDEOS[RANDOM_VIDEO - 1]}
        autoPlay={true}
        loop
        muted
        className="absolute z-10 w-auto 
            min-w-full min-h-full max-w-none"
      ></video>
      <MainContainer
        random_video={RANDOM_VIDEO}
        set_random_video={SET_RANDOM_VIDEO}
      />
    </main>
  );
}
