"use client";

import { useRouter } from "next/navigation";

const LANGUAGES = ["de", "en"] as const;

export default function LanguageToggle({ current }: { current: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => router.push(`/?lang=${lang}`)}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            current === lang
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}