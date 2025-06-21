"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'text',
  className 
}) => {
  // Extract text content from children (handles both string and React elements)
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return getTextContent(props.children);
      }
    }
    return '';
  };

  const codeContent = getTextContent(children);

  return (
    <div className={cn("relative group", className)}>
      {language && (
        <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800 rounded-bl-md z-10">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-slate-900 rounded-lg border border-slate-700">
        <code className={`language-${language} text-slate-100`}>
          {codeContent}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
