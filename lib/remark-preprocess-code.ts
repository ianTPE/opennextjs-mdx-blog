import { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Remark plugin to pre-process code blocks before MDX compilation
 * This completely bypasses MDX's code block handling
 */
export const remarkPreprocessCodeBlocks: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      if (node.value && typeof node.value === 'string') {
        // Store original value
        const originalValue = node.value;
        
        // Clean the value
        const cleanedValue = originalValue.replace(/^[\s\n\r\t]+/, '');
        
        // Replace the node with a custom JSX component
        node.type = 'mdxJsxFlowElement';
        node.name = 'CustomCodeBlock';
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'language',
            value: node.lang || 'text'
          },
          {
            type: 'mdxJsxAttribute', 
            name: 'code',
            value: cleanedValue
          }
        ];
        node.children = [];
        
        // Remove original properties
        delete node.value;
        delete node.lang;
        delete node.meta;
      }
    });
  };
};