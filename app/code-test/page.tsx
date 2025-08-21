import { compileMDXWithComponents } from "@/lib/mdx";

export default async function CodeBlockTestPage() {
  // Test content with various code blocks
  const testContent = `
# MDX Code Block 第一行空格測試

## 測試 1: Python Code Block

\`\`\`python
def hello_world():
    print("Hello, World!")
    return True
\`\`\`

## 測試 2: JavaScript Code Block

\`\`\`javascript
function testFunction() {
    console.log("Testing first line spacing");
    return {
        status: "success"
    };
}
\`\`\`

## 測試 3: TypeScript Code Block

\`\`\`typescript
interface TestInterface {
    name: string;
    value: number;
}
\`\`\`

## 測試 4: 單行代碼

這是 inline code: \`const test = "inline"\`

## 測試 5: 沒有語言標記的 Code Block

\`\`\`
這是沒有語言標記的代碼塊
第二行
第三行
\`\`\`
`;

  // Compile with our custom components
  const { content } = await compileMDXWithComponents(testContent, {});

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <h2 className="text-xl font-bold mb-2">🔍 檢查要點</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>每個 code block 的第一行應該直接開始，沒有空行</li>
          <li>第一個字符（如 &apos;def&apos;, &apos;function&apos;, &apos;interface&apos;）應該緊貼左邊</li>
          <li>如果看到第一行前有空格或空行，表示問題還存在</li>
        </ul>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {content}
      </div>
      
      <div className="mt-12 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <h3 className="text-lg font-bold mb-2">📋 已實施的修復方案</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li><strong>CSS 修復</strong>：添加了多個 CSS 規則來移除 text-indent 和 pseudo-elements</li>
          <li><strong>Rehype 插件</strong>：使用超激進的文本清理策略</li>
          <li><strong>客戶端 JS</strong>：在瀏覽器端再次清理</li>
          <li><strong>自定義 Code 組件</strong>：完全控制 code 元素的渲染</li>
        </ol>
      </div>
    </div>
  );
}