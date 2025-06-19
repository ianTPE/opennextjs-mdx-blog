"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const proseVariants = cva(
  "prose dark:prose-invert max-w-none",
  {
    variants: {
      variant: {
        default: "prose-slate",
        blog: "prose-slate prose-lg",
        documentation: "prose-blue prose-sm"
      },
      size: {
        sm: "prose-sm",
        base: "prose-base", 
        lg: "prose-lg",
        xl: "prose-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "base"
    }
  }
);

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(proseVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Prose.displayName = "Prose";

export { Prose, proseVariants };
