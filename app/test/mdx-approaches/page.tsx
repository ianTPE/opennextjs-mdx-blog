// Test and compare different approaches to fix MDX code block first line spacing
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Text } from "hast";

// Approach 1: Simple text replacement
const approach1: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code' && node.children?.[0]) {
        const firstChild = node.children[0];
        if ('type' in firstChild && firstChild.type === 'text') {
          const textNode = firstChild as Text;
          textNode.value = textNode.value.replace(/^\s+/, '');
        }
      }
    });
  };
};

// Approach 2: Process pre > code structure
const approach2: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        const codeElement = node.children?.find(
          child => 'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement?.children?.[0]) {
          const firstChild = codeElement.children[0];
          if ('type' in firstChild && firstChild.type === 'text') {
            const textNode = firstChild as Text;
            textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
          }
        }
      }
    });
  };
};

// Approach 3: Recursive search for first text node
const approach3: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        const codeElement = node.children?.find(
          child => 'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement?.children) {
          let processed = false;
          
          const cleanFirstText = (nodes: any[]): any[] => {
            return nodes.map(child => {
              if (!processed && child.type === 'text') {
                processed = true;
                return { ...child, value: child.value.replace(/^[\s\n\r\t]+/, '') };
              }
              if (!processed && child.children) {
                return { ...child, children: cleanFirstText(child.children) };
              }
              return child;
            });
          };
          
          codeElement.children = cleanFirstText(codeElement.children);
        }
      }
    });
  };
};

// Approach 4: Process after syntax highlighting
const approach4: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'code') {
        // Handle both direct text and nested span elements
        if (node.children?.length > 0) {
          const firstChild = node.children[0];
          
          // Direct text node
          if ('type' in firstChild && firstChild.type === 'text') {
            const textNode = firstChild as Text;
            textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
          }
          // Span element (from syntax highlighting)
          else if ('tagName' in firstChild && firstChild.tagName === 'span') {
            const span = firstChild as Element;
            if (span.children?.[0] && 'type' in span.children[0] && span.children[0].type === 'text') {
              const textNode = span.children[0] as Text;
              textNode.value = textNode.value.replace(/^[\s\n\r\t]+/, '');
            }
          }
        }
      }
    });
  };
};

export default async function TestApproachesPage() {
  const testMDX = `
\`\`\`javascript
function test() {
  console.log("Test");
}
\`\`\`
`;

  // Test all approaches
  const results = await Promise.all([
    compileMDX({
      source: testMDX,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [approach1, rehypeHighlight],
        },
      },
    }),
    compileMDX({
      source: testMDX,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [approach2, rehypeHighlight],
        },
      },
    }),
    compileMDX({
      source: testMDX,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [approach3, rehypeHighlight],
        },
      },
    }),
    compileMDX({
      source: testMDX,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, approach4],
        },
      },
    }),
  ]);

  return (
    <div className="container mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold mb-8">MDX Code Block First Line Spacing - Test Approaches</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Approach 1: Simple text replacement</h2>
          <div className="prose dark:prose-invert">{results[0].content}</div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Approach 2: Process pre &gt; code</h2>
          <div className="prose dark:prose-invert">{results[1].content}</div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Approach 3: Recursive search</h2>
          <div className="prose dark:prose-invert">{results[2].content}</div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Approach 4: After highlighting</h2>
          <div className="prose dark:prose-invert">{results[3].content}</div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
        <p className="text-sm">
          <strong>Expected:</strong> Each code block should start with "function" on the first line, 
          with no extra space or blank line before it.
        </p>
      </div>
    </div>
  );
}