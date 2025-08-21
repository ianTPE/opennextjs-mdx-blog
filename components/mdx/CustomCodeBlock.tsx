"use client";

import { useEffect, useRef } from "react";

interface CustomCodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * Custom code block component that ensures no first-line spacing
 */
export default function CustomCodeBlock({ children, className, ...props }: CustomCodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (codeRef.current) {
      // Get the text content and clean it
      let textContent = codeRef.current.textContent || "";
      
      // Remove leading whitespace
      textContent = textContent.replace(/^[\s\n\r\t]+/, "");
      
      // If the content has been modified, update it
      if (textContent !== codeRef.current.textContent) {
        // Preserve syntax highlighting if present
        const hasHighlighting = codeRef.current.querySelector("span");
        
        if (!hasHighlighting) {
          // No syntax highlighting, just update text
          codeRef.current.textContent = textContent;
        } else {
          // Has syntax highlighting, be more careful
          const firstTextNode = findFirstTextNode(codeRef.current);
          if (firstTextNode && firstTextNode.textContent) {
            firstTextNode.textContent = firstTextNode.textContent.replace(/^[\s\n\r\t]+/, "");
          }
        }
      }
    }
  }, [children]);
  
  function findFirstTextNode(element: HTMLElement): Text | null {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const text = node.textContent || "";
          return text.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }
    );
    
    const firstNode = walker.nextNode();
    return firstNode as Text | null;
  }
  
  return (
    <code ref={codeRef} className={className} {...props}>
      {children}
    </code>
  );
}