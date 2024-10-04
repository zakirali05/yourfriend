"use client";
import { INITIAL_AYAH } from "@/constants";
import { getRandomAyat } from "@/utils/getRandomAyat";
import { useEffect, useState } from "react";
import {
  BUTTON_COLORS_ACCORDING_TO_VIDEO,
  TEXT_COLOR_ACCORDING_TO_VIDEO,
} from "@/constants";
import { cn } from "@/utils/cn";

const MainContainer = ({
  random_video,
  set_random_video,
}: {
  random_video: number;
  set_random_video: any;
}) => {
  const [ayat, setAyat] = useState<any>(INITIAL_AYAH);
  const [loading, setLoading] = useState(false);
  const [TEXT_COLOUR, SET_TEXT_COLOUR] = useState(
    TEXT_COLOR_ACCORDING_TO_VIDEO[random_video - 1]
  );
  const [BG_COLOUR, SET_BG_COLOUR] = useState(
    BUTTON_COLORS_ACCORDING_TO_VIDEO[random_video - 1]
  );

  useEffect(() => {
    const TEXT_COLOUR = TEXT_COLOR_ACCORDING_TO_VIDEO[random_video - 1];
    const BG_COLOUR = BUTTON_COLORS_ACCORDING_TO_VIDEO[random_video - 1];

    SET_TEXT_COLOUR(TEXT_COLOUR);
    SET_BG_COLOUR(BG_COLOUR);
  }, [random_video]);

  console.log("from maincontianer client", TEXT_COLOUR, BG_COLOUR);
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
        style={{ background: BG_COLOUR }}
        disabled={loading}
        onClick={() => {
          const RANDOM_VIDEO = Math.floor(Math.random() * 8) + 1;
          set_random_video(RANDOM_VIDEO);
        }}
        className={cn(
          "absolute top-3 right-3 text-xs rounded-md shadow-xl  p-2  disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70 z-[1000]"
        )}
      >
        Change BG
      </button>
      <div className="p-4   backdrop:blur-sm z-[1000] rounded-md shadow-lg w-[600px]  h-[calc(100vh-130px)] md:h-[480px]  mt-16 flex flex-col">
        <div
          style={{ color: TEXT_COLOUR }}
          className={cn(
            "flex  flex-col gap-2  h-full md:max-h-[300px]   p-1 overflow-y-scroll font-bold"
          )}
        >
          <p className="text-center">
            {ayat?.surahName} - [{ayat?.surahNameTranslation}]
          </p>
          <p className="text-center">
            ({ayat?.surahNo}:{ayat?.ayahNo})
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
            style={{ background: BG_COLOUR }}
            onClick={getAyat}
            className={cn(
              "rounded-md shadow-xl  w-full p-3  disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70"
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
