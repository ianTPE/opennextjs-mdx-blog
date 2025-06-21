"use client";

import React, { useEffect, useRef, useState } from "react";

interface TweetProps {
  id: string;
}

// Global flag to track if Twitter script is loaded
let isTwitterScriptLoaded = false;
let isTwitterScriptLoading = false;

const Tweet: React.FC<TweetProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadTwitterScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (isTwitterScriptLoaded) {
          resolve();
          return;
        }

        if (isTwitterScriptLoading) {
          // Wait for the script to load
          const checkLoaded = () => {
            if (!mountedRef.current) {
              reject(new Error("Component unmounted"));
              return;
            }
            if (isTwitterScriptLoaded) {
              resolve();
            } else {
              timeoutId = setTimeout(checkLoaded, 100);
            }
          };
          checkLoaded();
          return;
        }

        isTwitterScriptLoading = true;
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          isTwitterScriptLoaded = true;
          isTwitterScriptLoading = false;
          if (mountedRef.current) {
            resolve();
          }
        };
        script.onerror = () => {
          isTwitterScriptLoading = false;
          reject(new Error("Failed to load Twitter script"));
        };
        document.head.appendChild(script);
      });
    };

    const renderTweet = async () => {
      if (!mountedRef.current) return;

      try {
        await loadTwitterScript();

        if (!mountedRef.current || !containerRef.current || isLoaded) {
          return;
        }

        if (window.twttr && window.twttr.widgets) {
          // Create a new div for the tweet to avoid DOM conflicts
          const tweetDiv = document.createElement("div");
          containerRef.current.appendChild(tweetDiv);

          await window.twttr.widgets.createTweet(id, tweetDiv, {
            conversation: "none",
            dnt: true,
            theme: "light",
          });

          if (mountedRef.current) {
            setIsLoaded(true);
          }
        }
      } catch (error) {
        console.error("Failed to load tweet:", error);
        if (mountedRef.current) {
          setError("Failed to load tweet");
        }
      }
    };

    renderTweet();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center my-8">
        <div className="flex items-center justify-center p-8 border border-red-200 rounded-lg bg-red-50">
          <div className="text-red-500">Failed to load tweet</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-8">
      <div ref={containerRef} className="twitter-tweet-container">
        {!isLoaded && (
          <div className="flex items-center justify-center p-8 border border-gray-200 rounded-lg">
            <div className="text-gray-500">Loading tweet...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;

// Add TypeScript declaration for window.twttr
declare global {
  interface Window {
    twttr: any;
  }
}
