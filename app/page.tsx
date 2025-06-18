import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Next.js MDX Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            A sophisticated blog built with Next.js, MDX, and Smart Component Management
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/blog"
          >
            📚 Read Blog Posts
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">🤖 Smart Features</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>✅ Smart Universal Component Loader</li>
            <li>✅ Automatic Component Detection</li>
            <li>✅ Zero-Maintenance Architecture</li>
            <li>✅ TypeScript + MDX Integration</li>
            <li>✅ Cloudflare Pages Optimized</li>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by Next.js 15+ & Cloudflare Pages
        </p>
      </footer>
    </div>
  );
}
