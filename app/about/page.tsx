import {
  SparklesIcon,
  CpuChipIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  HeartIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMdx,
} from "react-icons/si";

export const metadata = {
  title: "關於我們 - Citrine.top",
  description: "了解 Citrine.top - 一個專注於 AI 與開發者協作的技術部落格",
};

const techStack = [
  {
    name: "Next.js",
    version: "v15.3.3",
    description: "最新的 React 框架，使用 App Router",
    icon: SiNextdotjs,
    color: "bg-black",
  },
  {
    name: "TypeScript",
    version: "v5.7",
    description: "完整的類型安全支持",
    icon: SiTypescript,
    color: "bg-blue-600",
  },
  {
    name: "MDX",
    version: "v3.1",
    description: "Markdown + JSX 的強大組合",
    icon: SiMdx,
    color: "bg-yellow-500",
  },
  {
    name: "Tailwind CSS",
    version: "v4.0",
    description: "現代化的 CSS 框架",
    icon: SiTailwindcss,
    color: "bg-teal-500",
  },
  {
    name: "shadcn/ui",
    version: "v2.1",
    description: "現代化的 React 組件庫",
    icon: SiReact,
    color: "bg-slate-900",
  },
  {
    name: "Cloudflare Pages",
    version: "latest",
    description: "全球 CDN 部署",
    icon: CloudIcon,
    color: "bg-orange-500",
  },
];

const features = [
  {
    icon: CpuChipIcon,
    title: "AI 驅動開發",
    description:
      "探索人工智能如何革命性地改變軟體開發流程，分享 AI 工具的實際應用經驗。",
  },
  {
    icon: CodeBracketIcon,
    title: "智能組件系統",
    description:
      "零維護的智能組件管理，自動化檢測與映射，讓開發者專注於內容創作。",
  },
  {
    icon: RocketLaunchIcon,
    title: "前沿技術分享",
    description:
      "分享最新的 AI 工具、開發框架和實踐經驗，幫助開發者跟上技術潮流。",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Container with Background Image */}
          <div className="relative overflow-hidden rounded-3xl h-[500px] lg:h-[550px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/AboutHero.webp')",
                }}
              ></div>
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/40 to-purple-900/50 dark:from-slate-950/60 dark:via-slate-900/50 dark:to-blue-950/60"></div>
            </div>

            {/* Animated Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-16 left-8 w-48 h-48 lg:w-72 lg:h-72 lg:top-20 lg:left-10 bg-blue-400/20 dark:bg-blue-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse"></div>
              <div className="absolute top-32 right-8 w-48 h-48 lg:w-72 lg:h-72 lg:top-40 lg:right-10 bg-purple-400/20 dark:bg-purple-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute bottom-16 left-1/2 w-48 h-48 lg:w-72 lg:h-72 lg:bottom-20 bg-pink-400/20 dark:bg-pink-600/20 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative px-8 sm:px-12 lg:px-16 py-8 lg:py-12 h-full flex items-center">
              <div className="text-center w-full">
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium mb-6">
                  <SparklesIcon className="w-4 h-4" />
                  <span>關於 Citrine.top</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                  AI 協作開發的{" "}
                  <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    未來
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                  Citrine.top 是一個專注於探索 AI 與開發者協作的技術部落格，
                  致力於分享最前沿的開發技術、AI 工具應用和創新思維。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              我們的使命
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              在 AI
              快速發展的時代，我們相信人工智能與開發者的協作將重新定義軟體開發的未來
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              技術架構
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              採用最新的技術棧，確保最佳的性能和開發體驗
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <tech.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {tech.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
                    {tech.version}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HeartIcon className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                協作開發
              </span>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              這個部落格是由 <strong>Augment Code</strong> 和{" "}
              <strong>Claude</strong> 聯合搭建， 展示了 AI
              與開發者協作的實際成果。
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>智能開發</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudIcon className="w-4 h-4" />
                <span>雲端部署</span>
              </div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                <span>AI 協作</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
