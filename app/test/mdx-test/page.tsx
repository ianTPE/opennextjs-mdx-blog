import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Text } from "hast";

// Enhanced rehype plugin to fix first line spacing in code blocks
const fixCodeBlockSpacing: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        // Find code element
        const codeElement = node.children?.find(child => 
          'tagName' in child && child.tagName === 'code'
        ) as Element | undefined;
        
        if (codeElement && codeElement.children) {
          // Process all text nodes to remove leading spaces
          codeElement.children = codeElement.children.map((child, index) => {
            if ('type' in child && child.type === 'text') {
              const textNode = child as Text;
              let value = textNode.value;
              
              // For the first text node, aggressively remove all leading whitespace
              if (index === 0) {
                // Remove all types of leading whitespace
                value = value.replace(/^[\s\n\r\t]+/, '');
              }
              
              return { ...textNode, value };
            }
            return child;
          });
          
          // Also check if the first child is an element with text
          const firstChild = codeElement.children[0];
          if (firstChild && 'children' in firstChild && firstChild.children) {
            const firstTextNode = firstChild.children.find(
              c => 'type' in c && c.type === 'text'
            ) as Text | undefined;
            
            if (firstTextNode) {
              firstTextNode.value = firstTextNode.value.replace(/^[\s\n\r\t]+/, '');
            }
          }
        }
      }
    });
  };
};

export default async function MDXTestPage() {
  const testContent = `
# Test MDX Code Blocks

Here's a test code block that might have first line spacing issues:

\`\`\`python
def hello_world():
    print("Hello, World!")
    return True
\`\`\`

Another test with JavaScript:

\`\`\`javascript
function testFunction() {
    console.log("Testing first line spacing");
    return {
        status: "success",
        message: "No extra space on first line"
    };
}
\`\`\`

And a TypeScript example:

\`\`\`typescript
interface TestInterface {
    name: string;
    value: number;
}

const testObject: TestInterface = {
    name: "Test",
    value: 42
};
\`\`\`

Inline code test: \`const test = "inline code"\`
`;

  const { content } = await compileMDX({
    source: testContent,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [fixCodeBlockSpacing, rehypeHighlight],
      },
    },
  });

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-4">MDX Code Block Test</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {content}
      </div>
      
      <hr className="my-8" />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Debug Info</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          If you see extra spaces at the beginning of the first line in code blocks above, 
          the issue is not fixed yet.
        </p>
      </div>
    </div>
  );
}