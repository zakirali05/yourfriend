"use client";
import { getRandomAyat } from "@/utils/getRandomAyat";
import { useState } from "react";

const MainContainer = () => {
  const [ayat, setAyat] = useState<any>();
  const [loading, setLoading] = useState(false);
  const getAyat = async () => {
    try {
      setLoading(true);
      const ayat = await getRandomAyat();
      console.log(ayat);
      setAyat(ayat);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 bg-slate-900 rounded-md shadow-lg w-[600px] min-h-[400px] mt-16 flex flex-col">
      <div className="flex flex-col gap-2">
        <p className="text-center">
          {ayat?.surahName} ( {ayat?.ayahNo}:{ayat?.surahNo})
        </p>
        <h1 className="my-3 font-bold text-2xl text-right">{ayat?.arabic1}</h1>
        <p className="text-center">{ayat?.english}</p>
      </div>
      <div className="flex items-center justify-center w-full mt-auto ">
        <button
          disabled={loading}
          onClick={getAyat}
          className="rounded-md w-full p-3 bg-zinc-800 disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Talk to me my lord 😊"}
        </button>
      </div>
    </div>
  );
};

export default MainContainer;
