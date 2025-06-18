"use client";

import React, { useState } from 'react';

export default function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 my-6">
      <h3 className="text-lg font-semibold mb-4">🎮 Interactive Component Demo</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Count: {count}
          </button>
          
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isActive ? '✅ Active' : '⭕ Inactive'}
          </button>
        </div>
        
        {isActive && (
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <p className="text-green-800 dark:text-green-200">
              🎉 This component is automatically detected by the Smart Component System!
            </p>
          </div>
        )}
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>This interactive component demonstrates:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>React state management in MDX</li>
            <li>Automatic component detection</li>
            <li>Zero-configuration setup</li>
            <li>Client-side interactivity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}