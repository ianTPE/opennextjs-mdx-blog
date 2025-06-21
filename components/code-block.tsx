"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'text',
  className 
}) => {
  return (
    <div className={cn("relative group", className)}>
      {language && (
        <div className="absolute top-0 right-0 px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800 rounded-bl-md">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-slate-900 rounded-lg border border-slate-700">
        <code className={`language-${language} text-slate-100`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
