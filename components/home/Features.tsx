import {
  CpuChipIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CpuChipIcon,
    title: "AI 驅動開發",
    description: "探索人工智能如何革命性地改變軟體開發流程",
  },
  {
    icon: CodeBracketIcon,
    title: "智能組件系統",
    description: "零維護的智能組件管理，自動化檢測與映射",
  },
  {
    icon: RocketLaunchIcon,
    title: "前沿技術",
    description: "分享最新的 AI 工具、框架和開發實踐",
  },
  {
    icon: LightBulbIcon,
    title: "創新思維",
    description: "從傳統開發到 AI 協作的思維轉變與實踐",
  },
];

export default function Features() {
  return (
    <section className="pt-8 lg:pt-12 pb-16 lg:pb-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            核心特色
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            探索我們如何運用 AI 技術與現代開發實踐，為您帶來前沿的技術洞察
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
