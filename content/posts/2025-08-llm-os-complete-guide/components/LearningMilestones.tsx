'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Target, BookOpen, Code, Trophy, Award } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  type: 'knowledge' | 'skill' | 'project' | 'bonus';
  description?: string;
  codeExample?: string;
  requirements?: string[];
}

interface Milestone {
  id: string;
  title: string;
  week: string;
  description: string;
  color: string;
  bgColor: string;
  tasks: Task[];
  projectRequirements?: {
    title: string;
    description: string;
    features: string[];
    bonus?: string[];
  };
  scoringCriteria?: {
    excellent: string;
    good: string;
    pass: string;
  };
  metrics?: {
    title: string;
    requirements: string[];
  }[];
}

const milestones: Milestone[] = [
  {
    id: 'milestone1',
    title: '基礎能力驗收',
    week: '第 3 週',
    description: '掌握 LLM 基礎操作與 Prompt 工程',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    tasks: [
      {
        id: 'm1-knowledge-1',
        title: '能解釋 Transformer 架構的基本原理',
        type: 'knowledge'
      },
      {
        id: 'm1-knowledge-2',
        title: '理解 Token 計算方式（tiktoken 實作）',
        type: 'knowledge'
      },
      {
        id: 'm1-knowledge-3',
        title: '知道至少 3 種常見的幻覺問題類型',
        type: 'knowledge'
      },
      {
        id: 'm1-skill-1',
        title: '寫出 10 個不同場景的結構化 Prompt，成功率 > 90%',
        type: 'skill'
      },
      {
        id: 'm1-skill-2',
        title: '實作 JSON Schema 驗證，處理至少 5 種錯誤情況',
        type: 'skill'
      },
      {
        id: 'm1-skill-3',
        title: 'Zero-shot vs Few-shot 比較報告（含數據）',
        type: 'skill'
      },
      {
        id: 'm1-skill-4',
        title: '成本計算器：能準確預估 100 個請求的費用',
        type: 'skill'
      }
    ],
    projectRequirements: {
      title: 'PromptValidator Demo',
      description: '你的第一個穩定輸出系統',
      features: [
        '支援 3 種輸出格式（JSON/YAML/Markdown）',
        '錯誤率 < 5%',
        '包含重試機制',
        '有完整的測試案例（>10 個）'
      ]
    },
    scoringCriteria: {
      excellent: '所有項目完成 + 創新應用',
      good: '核心項目完成 + 文檔完整',
      pass: '基本功能實現'
    }
  },
  {
    id: 'milestone2',
    title: '工具整合驗收',
    week: '第 6 週',
    description: '能整合外部系統，實現成本優化',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    tasks: [
      {
        id: 'm2-knowledge-1',
        title: '理解 Function Calling 的原理與限制',
        type: 'knowledge'
      },
      {
        id: 'm2-knowledge-2',
        title: '知道 RAG 的核心組件（Embedding、Vector DB、Retrieval）',
        type: 'knowledge'
      },
      {
        id: 'm2-knowledge-3',
        title: '能分析不同模型的成本效益比',
        type: 'knowledge'
      },
      {
        id: 'm2-skill-1',
        title: 'Function Calling 整合至少 3 個真實 API',
        type: 'skill'
      },
      {
        id: 'm2-skill-2',
        title: 'RAG 系統：檢索準確率 > 85%',
        type: 'skill'
      },
      {
        id: 'm2-skill-3',
        title: '成本優化：相同品質下降低 50% 費用',
        type: 'skill'
      },
      {
        id: 'm2-skill-4',
        title: 'Context Window 管理：處理超長文檔',
        type: 'skill'
      }
    ],
    projectRequirements: {
      title: 'CustomerServicePOC',
      description: '功能完整的客服 POC',
      features: [
        'RAG 知識庫（>100 個文檔）',
        '3+ 外部 API 整合（CRM、工單、郵件）',
        '成本控制（每次對話 < $0.05）',
        '回應時間 < 3 秒',
        '準確率 > 80%'
      ],
      bonus: [
        '多語言支援',
        '情緒分析',
        '自動升級機制'
      ]
    },
    metrics: [
      {
        title: '量化指標',
        requirements: [
          'API 呼叫成功率 > 95%',
          'Token 使用效率提升 40%',
          'Cache 命中率 > 30%',
          '錯誤處理覆蓋率 100%'
        ]
      }
    ]
  },
  {
    id: 'milestone3',
    title: '系統思維驗收',
    week: '第 9 週',
    description: '具備設計和監控複雜 LLM 系統的能力',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    tasks: [
      {
        id: 'm3-knowledge-1',
        title: '理解 ReAct、CoT、Self-Consistency 等進階技術',
        type: 'knowledge'
      },
      {
        id: 'm3-knowledge-2',
        title: '知道 Agent 架構的設計模式（至少 3 種）',
        type: 'knowledge'
      },
      {
        id: 'm3-knowledge-3',
        title: '能解釋 LLM 系統的可觀測性原則',
        type: 'knowledge'
      },
      {
        id: 'm3-skill-1',
        title: '設計多步驟 Agent（>5 個決策點）',
        type: 'skill'
      },
      {
        id: 'm3-skill-2',
        title: '實作完整監控系統（Metrics、Logging、Tracing）',
        type: 'skill'
      },
      {
        id: 'm3-skill-3',
        title: 'A/B 測試：至少 2 個版本比較',
        type: 'skill'
      },
      {
        id: 'm3-skill-4',
        title: 'Debug 真實問題：找出並修復 5+ 個 bug',
        type: 'skill'
      }
    ],
    projectRequirements: {
      title: 'IntelligentAgent',
      description: '可觀測的智慧 Agent',
      features: [
        'Multi-step reasoning（CoT）',
        'Tool routing（5+ 工具）',
        'Fallback mechanism（3 層）',
        'Observability（完整 metrics）',
        'Real-time dashboard',
        'Alert system（Slack/Email）',
        'Cost tracking',
        'Performance profiling'
      ]
    },
    metrics: [
      {
        title: '系統指標',
        requirements: [
          'P95 延遲 < 5 秒',
          '錯誤率 < 1%',
          '可用性 > 99.5%',
          '監控覆蓋率 100%'
        ]
      }
    ]
  },
  {
    id: 'milestone4',
    title: '生產部署驗收',
    week: '第 12 週',
    description: '能獨立設計、開發、部署生產級 LLM 系統',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    tasks: [
      {
        id: 'm4-knowledge-1',
        title: '理解 DSL 設計原則與最佳實踐',
        type: 'knowledge'
      },
      {
        id: 'm4-knowledge-2',
        title: '知道常見失敗模式與解決方案（>10 種）',
        type: 'knowledge'
      },
      {
        id: 'm4-knowledge-3',
        title: '能評估系統的安全性與合規性',
        type: 'knowledge'
      },
      {
        id: 'm4-skill-1',
        title: '完整的生產級系統（從設計到部署）',
        type: 'skill'
      },
      {
        id: 'm4-skill-2',
        title: 'DSL 設計與實作（可編譯/可驗證）',
        type: 'skill'
      },
      {
        id: 'm4-skill-3',
        title: '故障診斷與修復（MTTR < 30 分鐘）',
        type: 'skill'
      },
      {
        id: 'm4-skill-4',
        title: '性能優化（提升 30%+ 效能）',
        type: 'skill'
      }
    ],
    projectRequirements: {
      title: 'Production System',
      description: '生產級系統要求',
      features: [
        '核心功能: 100% 完成',
        'Edge cases: 90% 覆蓋',
        '錯誤處理: 完整 fallback',
        '可用性: SLA 99.9%',
        '性能: P99 < 10s',
        '成本: < $100/天 for 10K users',
        '安全: OWASP LLM Top 10 合規'
      ]
    },
    metrics: [
      {
        title: '專業能力認證',
        requirements: [
          '架構設計：能畫出完整系統架構圖',
          '代碼品質：通過 Code Review（senior level）',
          '問題解決：能診斷並修復生產問題',
          '成本優化：降低 30%+ 營運成本',
          '團隊協作：能寫技術文檔與 RFC'
        ]
      }
    ]
  }
];

const LearningMilestones = () => {
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newCheckedTasks = new Set(checkedTasks);
    
    if (newCheckedTasks.has(taskId)) {
      newCheckedTasks.delete(taskId);
    } else {
      newCheckedTasks.add(taskId);
    }
    
    setCheckedTasks(newCheckedTasks);
  };

  const toggleMilestone = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    
    setExpandedMilestones(newExpanded);
  };

  const getProgress = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return 0;
    
    const completed = milestone.tasks.filter(task => checkedTasks.has(task.id)).length;
    return Math.round((completed / milestone.tasks.length) * 100);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'knowledge':
        return <BookOpen className="w-4 h-4" />;
      case 'skill':
        return <Code className="w-4 h-4" />;
      case 'project':
        return <Trophy className="w-4 h-4" />;
      case 'bonus':
        return <Award className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'knowledge':
        return 'text-blue-600 bg-blue-100';
      case 'skill':
        return 'text-green-600 bg-green-100';
      case 'project':
        return 'text-purple-600 bg-purple-100';
      case 'bonus':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-6 h-6 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">🏆 學習成果檢核</h2>
        </div>
        <p className="text-gray-600 text-lg">追蹤你的 LLM OS 學習進度與技能驗證</p>
      </div>

      <div className="space-y-8">
        {milestones.map((milestone) => {
          const progress = getProgress(milestone.id);
          const isExpanded = expandedMilestones.has(milestone.id);
          
          return (
            <div 
              key={milestone.id}
              className={`rounded-xl border-2 border-gray-200 ${milestone.bgColor} p-6 transition-all duration-300 hover:shadow-lg`}
            >
              {/* Milestone Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-6 h-6 ${milestone.color}`} />
                    <span className={`text-lg font-bold ${milestone.color}`}>
                      里程碑 {milestone.id.slice(-1)}（{milestone.week}）
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${milestone.color} bg-white/70`}>
                      {progress}% 完成
                    </div>
                    <button
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isExpanded ? 'bg-white/50' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    >
                      <svg 
                        className={`w-5 h-5 ${milestone.color} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {milestone.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${milestone.color.replace('text-', 'bg-')}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="space-y-6">
                  {/* Task List */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      檢核項目
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {milestone.tasks.map((task) => {
                        const isChecked = checkedTasks.has(task.id);
                        
                        return (
                          <div 
                            key={task.id}
                            className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-gray-200 cursor-pointer hover:bg-white/70 transition-colors"
                            onClick={() => toggleTask(task.id)}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isChecked ? (
                                <CheckCircle2 className={`w-5 h-5 ${milestone.color} transition-transform hover:scale-110`} />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 transition-colors hover:text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getTaskTypeColor(task.type)}`}>
                                  {task.type === 'knowledge' ? '知識檢核' : 
                                   task.type === 'skill' ? '技能驗證' : 
                                   task.type === 'project' ? '實作產出' : '加分項目'}
                                </span>
                                {getTaskIcon(task.type)}
                              </div>
                              <span 
                                className={`text-sm leading-relaxed transition-all duration-200 ${
                                  isChecked 
                                    ? `line-through text-gray-500 ${milestone.color}` 
                                    : 'text-gray-700'
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Requirements */}
                  {milestone.projectRequirements && (
                    <div className="bg-white/50 rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        實作產出要求
                      </h4>
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-800 mb-2">
                          {milestone.projectRequirements.title}
                        </h5>
                        <p className="text-gray-600 text-sm mb-4">
                          {milestone.projectRequirements.description}
                        </p>
                        <div className="space-y-2">
                          {milestone.projectRequirements.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {milestone.projectRequirements.bonus && (
                          <div className="mt-4">
                            <h6 className="font-medium text-amber-700 mb-2">加分項目：</h6>
                            <div className="space-y-2">
                              {milestone.projectRequirements.bonus.map((bonus, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                  <span className="text-sm text-gray-700">{bonus}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {milestone.metrics && milestone.metrics.map((metric, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        {metric.title}
                      </h4>
                      <div className="space-y-2">
                        {metric.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Scoring Criteria */}
                  {milestone.scoringCriteria && (
                    <div className="bg-white/50 rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">評分標準</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-800">優秀（90+）：</span>
                          <span className="text-sm text-gray-600">{milestone.scoringCriteria.excellent}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-800">良好（80+）：</span>
                          <span className="text-sm text-gray-600">{milestone.scoringCriteria.good}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-800">及格（70+）：</span>
                          <span className="text-sm text-gray-600">{milestone.scoringCriteria.pass}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Progress Summary */}
      <div className="mt-8 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">整體進度總結</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{checkedTasks.size}</div>
              <div className="text-sm text-gray-600">已完成項目</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {milestones.reduce((acc, m) => acc + m.tasks.length, 0)}
              </div>
              <div className="text-sm text-gray-600">總項目數</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round((checkedTasks.size / milestones.reduce((acc, m) => acc + m.tasks.length, 0)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">完成率</div>
            </div>
          </div>
          
          {/* Certification Levels */}
          <div className="bg-white/70 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">認證等級</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border-2 border-amber-300 rounded-lg bg-amber-50">
                <div className="text-2xl mb-2">🥉</div>
                <div className="font-semibold text-amber-800">銅級（70-79 分）</div>
                <div className="text-sm text-amber-700">LLM 應用開發者</div>
              </div>
              <div className="text-center p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                <div className="text-2xl mb-2">🥈</div>
                <div className="font-semibold text-gray-800">銀級（80-89 分）</div>
                <div className="text-sm text-gray-700">LLM 系統工程師</div>
              </div>
              <div className="text-center p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                <div className="text-2xl mb-2">🥇</div>
                <div className="font-semibold text-yellow-800">金級（90-100 分）</div>
                <div className="text-sm text-yellow-700">LLM 系統架構師</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMilestones;