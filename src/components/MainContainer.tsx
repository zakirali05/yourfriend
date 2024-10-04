"use client";
import { INITIAL_AYAH } from "@/constants";
import { getRandomAyat } from "@/utils/getRandomAyat";
import { useState } from "react";

const MainContainer = () => {
  const [ayat, setAyat] = useState<any>(INITIAL_AYAH);
  const [loading, setLoading] = useState(false);
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
    <div className="p-4  backdrop:blur-md z-[1000] rounded-md shadow-lg w-[600px] min-h-[450px] max-h-[500px] mt-16 flex flex-col">
      <div className="flex flex-col gap-2 max-h-[300px] p-1 overflow-y-scroll">
        <p className="text-center">
          {ayat?.surahName} - [{ayat?.surahNameTranslation}]
        </p>
        <p className="text-center">
          ({ayat?.ayahNo}:{ayat?.surahNo})
        </p>
        <h1 className="my-3 font-bold text-2xl text-right">{ayat?.arabic1}</h1>
        <p className="text-center">{ayat?.english}</p>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-full mt-auto ">
        <audio
          src={ayat?.audio["1"]?.url}
          typeof="audio/mp3"
          controls
          className="w-full "
        />

        <button
          disabled={loading}
          onClick={getAyat}
          className="rounded-md w-full p-3 bg-purple-800 disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Talk to me my lord 😊"}
        </button>
      </div>
    </div>
  );
};

export default MainContainer;
