"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname ? pathname.split("/")[1] : "en";

  const handleLanguageChange = (lang: string) => {
    if (pathname) {
      const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
      router.push(newPath);
    }
    setDropdownOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg rounded-b-md">
      <div className="flex items-center">
        <Image
          className="w-8 h-8 mr-3"
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <h1
          className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Quick Survey
        </h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 font-medium rounded-lg shadow-md border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-all"
        >
          {currentLang === "en" ? "English" : "Français"}
          <svg
            className={`w-5 h-5 ml-2 transform transition-transform ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
            <ul>
              <li>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`block w-full text-left px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg transition-all ${
                    currentLang === "en" ? "bg-gray-700 text-purple-400" : "text-gray-300"
                  }`}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLanguageChange("fr")}
                  className={`block w-full text-left px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg transition-all ${
                    currentLang === "fr" ? "bg-gray-700 text-purple-400" : "text-gray-300"
                  }`}
                >
                  Français
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
