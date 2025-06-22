"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface DialogueBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogueBlock: React.FC<DialogueBlockProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "my-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700",
      "font-mono text-sm leading-relaxed",
      className
    )}>
      <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
        {children}
      </div>
    </div>
  );
};

export default DialogueBlock;
