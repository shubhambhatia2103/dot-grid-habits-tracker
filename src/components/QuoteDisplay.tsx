
import { useState, useEffect } from 'react';

const quotes = [
  "Small habits make big changes.",
  "The only bad workout is the one that didn't happen.",
  "Your body keeps the score. Give it a win today.",
  "Habits are the compound interest of self-improvement.",
  "Action is the smallest unit of habit.",
  "Motivation gets you started. Habit keeps you going.",
  "You don't have to be great to start, but you have to start to be great.",
  "The habit of persistence is the habit of victory.",
  "Good habits formed at youth make all the difference.",
];

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  
  // Get a random quote on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  // Get a new random quote
  const refreshQuote = () => {
    let newIndex = Math.floor(Math.random() * quotes.length);
    // Make sure we don't repeat the same quote
    while (quotes[newIndex] === quote && quotes.length > 1) {
      newIndex = Math.floor(Math.random() * quotes.length);
    }
    setQuote(quotes[newIndex]);
  };

  return (
    <div 
      className="mb-6 p-4 bg-gray-50 rounded-lg text-center cursor-pointer transition-opacity hover:opacity-80" 
      onClick={refreshQuote}
      title="Click for a new quote"
    >
      <p className="italic text-gray-700">"{quote}"</p>
    </div>
  );
};

export default QuoteDisplay;
