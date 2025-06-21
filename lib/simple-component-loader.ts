import { cache } from "react";
import { ComponentLoadResult } from "../types/post";
import Alert from "../components/mdx/global-components/Alert";

// Define global components directly
const globalComponents = {
  Alert,
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
  '2025-06-smart-component-system': () => import('../content/posts/2025-06-smart-component-system/components/index'),
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
