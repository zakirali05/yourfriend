import MainContainer from "@/components/MainContainer";
import { ARRAY_OF_VIDEOS } from "@/constants";

export default function Home() {
  const RANDOM_VIDEO = Math.floor(Math.random() * 8) + 1;
  console.log(RANDOM_VIDEO - 1);
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
      <MainContainer random_video={RANDOM_VIDEO} />
    </main>
  );
}
