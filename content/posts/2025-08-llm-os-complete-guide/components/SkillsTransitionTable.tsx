'use client';

import { ArrowRight, Code, Cog, Shield, Zap, BarChart3, Route } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SkillTransition {
  id: string;
  traditional: string;
  llmSkill: string;
  learningPath: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const skillTransitions: SkillTransition[] = [
  {
    id: 'scripting',
    traditional: 'Shell Scripting',
    llmSkill: 'Prompt 腳本、CoT 流程',
    learningPath: '從 bash 到 prompt chains',
    icon: <Code className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'scheduling',
    traditional: 'Cron / Systemd',
    llmSkill: 'Agent 工作流排程',
    learningPath: '學習 Temporal、Airflow for LLM',
    icon: <Cog className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 'observability',
    traditional: 'ELK Stack',
    llmSkill: 'LLM Observability',
    learningPath: 'LangSmith、Weights & Biases',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'security',
    traditional: 'iptables / ACL',
    llmSkill: 'Prompt Injection 防禦',
    learningPath: '學習 OWASP for LLM',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    id: 'performance',
    traditional: 'Performance Tuning',
    llmSkill: 'Token 優化、Latency 分析',
    learningPath: '掌握 tokenizer、batching',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 'loadbalance',
    traditional: 'Load Balancer',
    llmSkill: 'Model Router、Agent Router',
    learningPath: '實作智慧路由策略',
    icon: <Route className="w-5 h-5" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

const SkillsTransitionTable = () => {
  return (
    <div className="w-full my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ArrowRight className="w-6 h-6 text-blue-600" />
          Infra 工程師的技能轉換地圖
        </h2>
        <p className="text-gray-600">從傳統基礎架構到 LLM OS 的技能轉換指南</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">傳統 Infra 技能</TableHead>
              <TableHead className="w-[35%]">LLM OS 新技能</TableHead>
              <TableHead className="w-[35%]">學習路徑</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skillTransitions.map((skill) => (
              <TableRow key={skill.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${skill.bgColor}`}>
                      <span className={skill.color}>{skill.icon}</span>
                    </div>
                    <span className="text-gray-900">{skill.traditional}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${skill.color}`}>
                    {skill.llmSkill}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">
                  {skill.learningPath}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {skillTransitions.map((skill) => (
          <div 
            key={skill.id} 
            className={`rounded-lg border-l-4 ${skill.color.replace('text-', 'border-')} bg-white shadow-sm p-4`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${skill.bgColor}`}>
                <span className={skill.color}>{skill.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {skill.traditional}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className={`text-sm font-medium ${skill.color}`}>
                    {skill.llmSkill}
                  </span>
                </div>
              </div>
            </div>
            <div className="pl-11">
              <div className="text-xs text-gray-500 mb-1">學習路徑:</div>
              <div className="text-sm text-gray-700">
                {skill.learningPath}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <Code className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">💡 轉換建議</h3>
            <p className="text-sm text-blue-700">
              建議按優先級學習：先掌握 Prompt Engineering 和成本優化，再學習 Agent 架構和監控系統，
              最後深入安全防護和效能調優。每個技能都建議搭配實際專案練習。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTransitionTable;