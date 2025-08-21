"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface NuclearCodeBlockProps {
  language?: string;
  code?: string;
  children?: React.ReactNode;
}

/**
 * Nuclear option: Completely custom code block that bypasses MDX processing
 */
export default function NuclearCodeBlock({ language = "text", code, children }: NuclearCodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (codeRef.current) {
      // Use provided code or children
      const content = code || (children ? String(children) : "");
      
      // Clean any leading whitespace
      const cleanedContent = content.replace(/^[\s\n\r\t]+/, "");
      
      // Apply syntax highlighting
      if (language && language !== "text") {
        try {
          const highlighted = hljs.highlight(cleanedContent, { language }).value;
          codeRef.current.innerHTML = highlighted;
        } catch {
          // Fallback to plain text if highlighting fails
          codeRef.current.textContent = cleanedContent;
        }
      } else {
        codeRef.current.textContent = cleanedContent;
      }
    }
  }, [code, children, language]);
  
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4">
      <code
        ref={codeRef}
        className={`language-${language} text-gray-100`}
        style={{ textIndent: 0, marginLeft: 0, paddingLeft: 0 }}
      />
    </pre>
  );
}