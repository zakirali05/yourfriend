"use client";
import { INITIAL_AYAH } from "@/constants";
import { getRandomAyat } from "@/utils/getRandomAyat";
import { useState } from "react";
import {
  BUTTON_COLORS_ACCORDING_TO_VIDEO,
  TEXT_COLOR_ACCORDING_TO_VIDEO,
} from "@/constants";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

const MainContainer = ({ random_video }: { random_video: number }) => {
  const [ayat, setAyat] = useState<any>(INITIAL_AYAH);
  const [loading, setLoading] = useState(false);
  const TEXT_COLOUR = TEXT_COLOR_ACCORDING_TO_VIDEO[random_video - 1];
  const BG_COLOUR = BUTTON_COLORS_ACCORDING_TO_VIDEO[random_video - 1];
  console.log(TEXT_COLOUR, BG_COLOUR);
  const router = useRouter();
  const getAyat = async () => {
    try {
      setLoading(true);
      const ayat = await getRandomAyat();
      console.log(ayat);
      setAyat(ayat);
    } catch (err: any) {
      alert(`Something went wrong! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        disabled={loading}
        onClick={() => router.refresh()}
        className={cn(
          ` absolute top-3 right-3 text-xs rounded-md shadow-lg   p-2 
          disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70 z-[1000]`,
          BG_COLOUR
        )}
      >
        Change BG
      </button>
      <div className="p-4   backdrop:blur-sm z-[1000] rounded-md shadow-lg w-[600px] h-[480px]  mt-16 flex flex-col">
        <div
          className={cn(
            `flex  flex-col gap-2 max-h-[300px]   p-1 overflow-y-scroll font-bold`,
            TEXT_COLOUR
          )}
        >
          <p className="text-center">
            {ayat?.surahName} - [{ayat?.surahNameTranslation}]
          </p>
          <p className="text-center">
            ({ayat?.ayahNo}:{ayat?.surahNo})
          </p>
          <h1 className="my-3 font-bold text-3xl text-right">
            {ayat?.arabic1}
          </h1>
          <p className="text-center text-2xl">"{ayat?.english}"</p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center w-full mt-auto ">
          <audio
            src={ayat?.audio["1"]?.url}
            typeof="audio/mp3"
            controls
            className="w-full"
          />

          <button
            disabled={loading}
            onClick={getAyat}
            className={cn(
              `rounded-md shadow-lg  w-full p-3  disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70`,
              BG_COLOUR
            )}
          >
            {loading ? "Loading..." : "Talk to me my lord 😊"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MainContainer;
