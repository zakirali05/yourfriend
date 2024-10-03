"use server"
export const getRandomAyat = async () => {
    const MIN = 1
    const MAX = 114

    // choose random number between 1 to 114
    const RANDOM_SURAH = Math.floor(Math.random() * MAX) + MIN;

    // Get meta data of that surah
    const res = await fetch(`https://quranapi.pages.dev/api/${RANDOM_SURAH}.json`)
    const META_DATA_OF_SURAH = await res?.json()

    // choose random number from 1 to total ayats in that surah
    const RANDOM_AYAT = Math.floor(Math.random() * META_DATA_OF_SURAH?.totalAyah) + MIN

    // get ayat
    const result = await fetch(`https://quranapi.pages.dev/api/${RANDOM_SURAH}/${RANDOM_AYAT}.json`)
    const RANDOM_AYAT_META_DATA = await result?.json()

    // return that with appropriate info
    return RANDOM_AYAT_META_DATA
}
