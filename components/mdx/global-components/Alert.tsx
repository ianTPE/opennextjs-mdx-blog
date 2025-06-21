"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200",
  success:
    "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
  error:
    "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
};

export default function Alert({
  type = "info",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      className={cn("border rounded-lg p-4 my-4", alertStyles[type], className)}
    >
      {title && (
        <div className="font-semibold mb-2 flex items-center gap-2">
          {type === "info" && "💡"}
          {type === "warning" && "⚠️"}
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {title}
        </div>
      )}
      <div className={title ? "text-sm" : ""}>{children}</div>
    </div>
  );
}
