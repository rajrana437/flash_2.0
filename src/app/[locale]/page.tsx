'use client';

import React, { useState, useEffect } from 'react';
import sets from '../components/words.json'

type FlashcardData = {
  frenchWord: string;
  englishWord: string;
};

const themes = [
  {
    name: "Peachy Paradise",
    background: "#FFF8F0",
    accent: "#FFA07A",
    text: "#3F444E",
    highlight: "#FFD1BA",
  },
  {
    name: "Warm Breeze",
    background: "#FFF9E5",
    accent: "#FFC78A",
    text: "#5D5A55",
    highlight: "#FFD9B3",
  },
  {
    name: "Vibrant Sunset",
    background: "#FFE6B3",
    accent: "#FF8C42",
    text: "#4D3B3B",
    highlight: "#FFD580",
  },
  {
    name: "Ocean Breeze",
    background: "#E6F7FF",
    accent: "#4A90E2",
    text: "#243B53",
    highlight: "#A3D9FF",
  },
  {
    name: "Forest Green",
    background: "#E9F5E8",
    accent: "#5E8A68",
    text: "#1C241B",
    highlight: "#A3CFA3",
  },
];

const FlashcardPage: React.FC = () => {
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [masteredCards, setMasteredCards] = useState<FlashcardData[]>([]);
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [theme, setTheme] = useState(themes[0]);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    } else {
      shuffleTheme();
    }
  }, []);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const shuffleTheme = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  };

  const loadFlashcards = (setNumber: number) => {
    setLoading(true);
    const selectedSet = sets.sets.find((set) => set.setNumber === setNumber);
    if (selectedSet) {
      setCards(selectedSet.words);
      setCurrentCard(selectedSet.words[0]);
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  const handleKnow = () => {
    if (currentCard) {
      setMasteredCards((prevMastered) => [...prevMastered, currentCard]);
      setShowAnswer(true);
    }
  };

  const handleForgot = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentCard) {
      if (!masteredCards.includes(currentCard)) {
        setCards((prevCards) => [...prevCards.slice(1), currentCard]);
      } else {
        setCards((prevCards) => prevCards.slice(1));
      }
    }

    if (cards.length > 1) {
      setCurrentCard(cards[1]);
    } else {
      setCurrentCard(null);
    }

    setShowAnswer(false);
  };

  const reset = () => {
    setCards([]);
    setMasteredCards([]);
    setCurrentCard(null);
    setSelectedSet(null);
    setIsSubmitted(false);
    setShowAnswer(false);
  };

  const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(e.target.value, 10);
    setSelectedSet(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSet) loadFlashcards(selectedSet);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 transition-all"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <select
            value={selectedSet || ''}
            onChange={handleSetChange}
            className="w-full border rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: theme.accent, color: theme.text }}
          >
            <option value="" disabled>
              Select a set (1-20)
            </option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((set) => (
              <option key={set} value={set}>
                Set {set}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            style={{
              backgroundColor: theme.accent,
              color: theme.text,
              border: `2px solid ${theme.highlight}`,
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-lg space-y-6">
          {currentCard ? (
            <div
              className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center transition-transform relative"
              style={{
                backgroundColor: theme.highlight,
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: theme.accent,
              }}
            >

              <div className="absolute top-4 left-4 text-sm px-3 py-1 rounded-full bg-white shadow-md font-semibold">
                ThinkStack
              </div>
              <button
                className="absolute top-4 right-4 text-sm text-blue-500 font-semibold"
                onClick={() => {
                  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
                  setTheme(randomTheme);
                }}
              >
                shuffle theme
              </button>
              <div className="w-16 h-16 mb-6">
                <img
                  src="/pngegg.png"
                  alt="Orange"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-extrabold mb-4">{currentCard.frenchWord}</h2>
              {showAnswer ? (
                <p
                  className="text-sm bg-white p-4 rounded-lg shadow-md"
                  style={{
                    width: "90%",
                    color: theme.text,
                  }}
                >
                  {currentCard.englishWord}
                </p>
              ) : (
                <p className="text-sm italic text-gray-500">
                  Tap "Forgot" or "Know" to reveal the englishWord
                </p>
              )}
              <div className="flex justify-between w-full mt-8 space-x-4">
                {!showAnswer ? (
                  <>
                    <button
                      onClick={handleForgot}
                      className="flex-1 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                      style={{
                        backgroundColor: "#f0f0f0",
                        color: theme.text,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      😕 Forgot
                    </button>
                    <button
                      onClick={handleKnow}
                      className="flex-1 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                      style={{
                        backgroundColor: theme.accent,
                        color: theme.text,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      😊 Know
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg font-bold hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.text,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <p className="text-lg">You've mastered all the flashcards!</p>
              <button
                onClick={reset}
                className="w-full max-w-md py-3 rounded-lg font-semibold text-lg hover:scale-105 transition-transform"
                style={{ backgroundColor: theme.accent, color: theme.text }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlashcardPage
