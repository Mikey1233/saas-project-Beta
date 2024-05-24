import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar"
  | "it"
  | "yo";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
  it: "Italian",
  yo: "Yoruba",
};


interface SubscriptionState {
    subscription : Subscription | null | undefined;
    setSubscription : (subscription : Subscription | null) => void
}
export const useSubscription = create<SubscriptionState>((set)=>(
    {
        subscription : undefined,
        setSubscription : (subscription : Subscription | null)=> set({subscription})
    }
))