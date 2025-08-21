import { cache } from "react";
import { ComponentLoadResult } from "../types/post";
import Alert from "../components/mdx/global-components/Alert";
import { AlertDescription } from "../components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { CodeBlock } from "../components/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import DialogueBlock from "../components/mdx/DialogueBlock";

// Define global components directly
const globalComponents = {
  Alert,
  AlertDescription,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  CodeBlock,
  DialogueBlock,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
};

// 🤖 This mapping is automatically maintained by smart-prebuild
const componentMappings: Record<string, () => Promise<unknown>> = {
  '2025-05-ai-anxiety-syndrome-survival-guide': () => import('../content/posts/2025-05-ai-anxiety-syndrome-survival-guide/components/index'),
  '2025-05-ai-prd-devops-integration-guide-2025': () => import('../content/posts/2025-05-ai-prd-devops-integration-guide-2025/components/index'),
  '2025-05-aider-claude-code-complete-guide-2025': () => import('../content/posts/2025-05-aider-claude-code-complete-guide-2025/components/index'),
  '2025-05-backend-development-low-code-market-guide-187-billion-opportunity': () => import('../content/posts/2025-05-backend-development-low-code-market-guide-187-billion-opportunity/components/index'),
  '2025-05-coderabbit-windsurf-six-key-differences-2025': () => import('../content/posts/2025-05-coderabbit-windsurf-six-key-differences-2025/components/index'),
  '2025-05-cursor-ai-12-best-practices': () => import('../content/posts/2025-05-cursor-ai-12-best-practices/components/index'),
  '2025-05-freelancer-guide-low-code-no-code-development-applications-ranking': () => import('../content/posts/2025-05-freelancer-guide-low-code-no-code-development-applications-ranking/components/index'),
  '2025-05-freelancer-income-guide-2025-fullstack-frontend-backend': () => import('../content/posts/2025-05-freelancer-income-guide-2025-fullstack-frontend-backend/components/index'),
  '2025-05-getting-started-with-nextjs': () => import('../content/posts/2025-05-getting-started-with-nextjs/components/index'),
  '2025-05-low-code-cybersecurity-freelance-guide-soar-engineer-remote-work': () => import('../content/posts/2025-05-low-code-cybersecurity-freelance-guide-soar-engineer-remote-work/components/index'),
  '2025-05-low-code-no-code-freelancer-earning-guide-8-areas': () => import('../content/posts/2025-05-low-code-no-code-freelancer-earning-guide-8-areas/components/index'),
  '2025-05-low-code-no-code-freelancing-complete-guide-90-day-plan': () => import('../content/posts/2025-05-low-code-no-code-freelancing-complete-guide-90-day-plan/components/index'),
  '2025-05-low-code-no-code-market-trends-2025-career-transition': () => import('../content/posts/2025-05-low-code-no-code-market-trends-2025-career-transition/components/index'),
  '2025-05-mdx-blog-setup': () => import('../content/posts/2025-05-mdx-blog-setup/components/index'),
  '2025-05-no-code-app-platform-comparison-adalo-bubble-glide': () => import('../content/posts/2025-05-no-code-app-platform-comparison-adalo-bubble-glide/components/index'),
  '2025-05-openmemory-personal-memory-layer': () => import('../content/posts/2025-05-openmemory-personal-memory-layer/components/index'),
  '2025-05-product-logic-shift-ai': () => import('../content/posts/2025-05-product-logic-shift-ai/components/index'),
  '2025-05-sfbt-practical-guide-youth-counseling-techniques': () => import('../content/posts/2025-05-sfbt-practical-guide-youth-counseling-techniques/components/index'),
  '2025-05-typescript-best-practices': () => import('../content/posts/2025-05-typescript-best-practices/components/index'),
  '2025-05-windsurf-swe1-model-family': () => import('../content/posts/2025-05-windsurf-swe1-model-family/components/index'),
  '2025-06-ai-coding-assistant-comparison-claude-chatgpt-gemini-developers': () => import('../content/posts/2025-06-ai-coding-assistant-comparison-claude-chatgpt-gemini-developers/components/index'),
  '2025-06-chasing-ghosts-tailwind-typography-debugging-nightmares': () => import('../content/posts/2025-06-chasing-ghosts-tailwind-typography-debugging-nightmares/components/index'),
  '2025-06-from-zero-to-one-build-chayu-time-bubble-tea-booking-system-tech-guide': () => import('../content/posts/2025-06-from-zero-to-one-build-chayu-time-bubble-tea-booking-system-tech-guide/components/index'),
  '2025-06-from-zero-to-one-build-chayu-time-liff-tea-booking-system-complete-tech-guide': () => import('../content/posts/2025-06-from-zero-to-one-build-chayu-time-liff-tea-booking-system-complete-tech-guide/components/index'),
  '2025-06-line-liff-lowcode-ultimate-guide': () => import('../content/posts/2025-06-line-liff-lowcode-ultimate-guide/components/index'),
  '2025-06-LINE_LIFF_Low_Code_Platform_Business_Guide': () => import('../content/posts/2025-06-LINE_LIFF_Low_Code_Platform_Business_Guide/components/index'),
  '2025-06-Low-Code-No-Code-PRD-Complete-Guide-Part2': () => import('../content/posts/2025-06-Low-Code-No-Code-PRD-Complete-Guide-Part2/components/index'),
  '2025-06-mdx-blog-frontend-backend-separation-nextjs-to-s3-guide': () => import('../content/posts/2025-06-mdx-blog-frontend-backend-separation-nextjs-to-s3-guide/components/index'),
  '2025-06-nextjs-app-router-loading-trap': () => import('../content/posts/2025-06-nextjs-app-router-loading-trap/components/index'),
  '2025-06-nextjs-mdx-universal-component-loader-system': () => import('../content/posts/2025-06-nextjs-mdx-universal-component-loader-system/components/index'),
  '2025-06-Parser_Prompting_Symbol_System_Full_Reference': () => import('../content/posts/2025-06-Parser_Prompting_Symbol_System_Full_Reference/components/index'),
  '2025-06-refactored-ai-coding-guide': () => import('../content/posts/2025-06-refactored-ai-coding-guide/components/index'),
  '2025-06-shadcn-prose-migration-guide': () => import('../content/posts/2025-06-shadcn-prose-migration-guide/components/index'),
  '2025-06-smart-component-system': () => import('../content/posts/2025-06-smart-component-system/components/index'),
  '2025-06-supabase-tea-booking-guide': () => import('../content/posts/2025-06-supabase-tea-booking-guide/components/index'),
  '2025-06-taiwan-software-engineer-job-market-analysis': () => import('../content/posts/2025-06-taiwan-software-engineer-job-market-analysis/components/index'),
  '2025-06-vibe-coding-framework-guide-from-nextjs-experience': () => import('../content/posts/2025-06-vibe-coding-framework-guide-from-nextjs-experience/components/index'),
  '2025-06-web-deployment-platforms-2025': () => import('../content/posts/2025-06-web-deployment-platforms-2025/components/index'),
  '2025-06-xano-tea-booking-backend': () => import('../content/posts/2025-06-xano-tea-booking-backend/components/index'),
  '2025-08-llm-os-complete-guide': () => import('../content/posts/2025-08-llm-os-complete-guide/components/index'),
};

// Smart loading with graceful fallback
export const loadPostComponents = cache(
  async (slug: string): Promise<ComponentLoadResult> => {
    if (componentMappings[slug]) {
      try {
        const customComponents = (await componentMappings[slug]()) as Record<
          string,
          React.ComponentType<any>
        >;

        return {
          components: { ...globalComponents, ...customComponents },
          hasCustomComponents: true,
          loadedFrom: "static-mapping",
        };
      } catch (error) {
        console.error(`Error loading components for ${slug}:`, error);
        // Graceful fallback to global components
        return {
          components: { ...globalComponents },
          hasCustomComponents: false,
          loadedFrom: "global-only",
        };
      }
    }

    return {
      components: { ...globalComponents },
      hasCustomComponents: false,
      loadedFrom: "global-only",
    };
  }
);
