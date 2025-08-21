'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Target } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  week: string;
  description: string;
  tasks: string[];
  color: string;
  bgColor: string;
}

const milestones: Milestone[] = [
  {
    id: 'milestone1',
    title: '基礎能力',
    week: '第 3 週',
    description: '掌握 LLM 基礎與提示工程',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    tasks: [
      '能寫出穩定輸出的結構化 Prompt',
      '理解 Token 計算與成本估算',
      '完成第一個 JSON Schema 驗證'
    ]
  },
  {
    id: 'milestone2',
    title: '工具整合',
    week: '第 6 週',
    description: '連接外部系統與成本優化',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    tasks: [
      '實作 Function Calling 連接外部 API',
      '建立簡單的 RAG 系統',
      '完成成本優化，降低 50% 開銷'
    ]
  },
  {
    id: 'milestone3',
    title: '系統思維',
    week: '第 9 週',
    description: '建立完整監控與測試體系',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    tasks: [
      '設計完整的 Agent 架構',
      '實作監控與告警系統',
      '通過 A/B 測試驗證優化效果'
    ]
  },
  {
    id: 'milestone4',
    title: '生產部署',
    week: '第 12 週',
    description: '完成生產級系統部署',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    tasks: [
      '完成一個完整的生產級專案',
      '撰寫 DSL 與文件',
      '具備 Debug 與優化能力'
    ]
  }
];

const LearningMilestones = () => {
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (milestoneId: string, taskIndex: number) => {
    const taskId = `${milestoneId}-${taskIndex}`;
    const newCheckedTasks = new Set(checkedTasks);
    
    if (newCheckedTasks.has(taskId)) {
      newCheckedTasks.delete(taskId);
    } else {
      newCheckedTasks.add(taskId);
    }
    
    setCheckedTasks(newCheckedTasks);
  };

  const getProgress = (milestoneId: string, tasksCount: number) => {
    let completed = 0;
    for (let i = 0; i < tasksCount; i++) {
      if (checkedTasks.has(`${milestoneId}-${i}`)) {
        completed++;
      }
    }
    return Math.round((completed / tasksCount) * 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">學習成果檢核</h2>
        </div>
        <p className="text-gray-600">追蹤你的 LLM OS 學習進度</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {milestones.map((milestone) => {
          const progress = getProgress(milestone.id, milestone.tasks.length);
          
          return (
            <div 
              key={milestone.id}
              className={`rounded-xl border-2 border-gray-200 ${milestone.bgColor} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              {/* Milestone Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-5 h-5 ${milestone.color}`} />
                    <span className={`text-sm font-semibold ${milestone.color}`}>
                      里程碑 {milestone.id.slice(-1)}（{milestone.week}）
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.color} bg-white/70`}>
                    {progress}%
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {milestone.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${milestone.color.replace('text-', 'bg-')}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {milestone.tasks.map((task, index) => {
                  const taskId = `${milestone.id}-${index}`;
                  const isChecked = checkedTasks.has(taskId);
                  
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-3 cursor-pointer group"
                      onClick={() => toggleTask(milestone.id, index)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckCircle2 className={`w-5 h-5 ${milestone.color} transition-transform group-hover:scale-110`} />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                        )}
                      </div>
                      <span 
                        className={`text-sm leading-relaxed transition-all duration-200 ${
                          isChecked 
                            ? `line-through text-gray-500 ${milestone.color}` 
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}
                      >
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">整體進度</h3>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <span>已完成: {checkedTasks.size} 項</span>
            <span>•</span>
            <span>總計: {milestones.reduce((acc, m) => acc + m.tasks.length, 0)} 項</span>
            <span>•</span>
            <span className="font-medium text-blue-600">
              {Math.round((checkedTasks.size / milestones.reduce((acc, m) => acc + m.tasks.length, 0)) * 100)}% 完成
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMilestones;