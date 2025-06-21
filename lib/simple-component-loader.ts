import { cache } from "react";
import { ComponentLoadResult } from "../types/post";
import { globalComponents } from "../components/mdx/global-components";

// 🤖 This mapping is automatically maintained by smart-prebuild
const componentMappings: Record<string, () => Promise<unknown>> = {
  "2025-06-smart-component-system": () =>
    import("../content/posts/2025-06-smart-component-system/components/index"),
  "2025-05-freelancer-guide-low-code-no-code-development-applications-ranking":
    () =>
      import(
        "../content/posts/2025-05-freelancer-guide-low-code-no-code-development-applications-ranking/components/index"
      ),
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
