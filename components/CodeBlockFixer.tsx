"use client";

import { useEffect } from "react";

/**
 * Client-side component to fix code block first line spacing
 * This is a last resort if server-side solutions don't work
 */
export default function CodeBlockFixer() {
  useEffect(() => {
    const fixCodeBlocks = () => {
      // Find all code blocks
      const codeBlocks = document.querySelectorAll("pre code");
      
      codeBlocks.forEach((codeBlock) => {
        // Get the first text node
        const walker = document.createTreeWalker(
          codeBlock,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        const firstTextNode = walker.nextNode();
        if (firstTextNode && firstTextNode.textContent) {
          // Remove leading whitespace from the first text node
          const trimmed = firstTextNode.textContent.replace(/^[\s\n\r\t]+/, "");
          if (trimmed !== firstTextNode.textContent) {
            firstTextNode.textContent = trimmed;
          }
        }
        
        // Also check if first child is a span with text
        const firstChild = codeBlock.firstElementChild;
        if (firstChild && firstChild.tagName === "SPAN") {
          const spanText = firstChild.firstChild;
          if (spanText && spanText.textContent) {
            const trimmed = spanText.textContent.replace(/^[\s\n\r\t]+/, "");
            if (trimmed !== spanText.textContent) {
              spanText.textContent = trimmed;
            }
          }
        }
      });
    };
    
    // Run immediately
    fixCodeBlocks();
    
    // Run after a short delay to catch any async rendered content
    const timeout = setTimeout(fixCodeBlocks, 100);
    
    // Also run on route changes
    const observer = new MutationObserver((mutations) => {
      const hasCodeBlocks = mutations.some(mutation => {
        return Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            return element.querySelector?.("pre code") !== null;
          }
          return false;
        });
      });
      
      if (hasCodeBlocks) {
        fixCodeBlocks();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);
  
  return null;
}