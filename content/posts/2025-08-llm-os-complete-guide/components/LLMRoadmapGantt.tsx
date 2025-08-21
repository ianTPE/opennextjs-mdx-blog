'use client';

import { useEffect, useState, useRef, type FC } from 'react';
import mermaid from 'mermaid';
import type { MermaidConfig } from 'mermaid';

interface LLMRoadmapGanttProps {
  config?: MermaidConfig;
}

const LLMRoadmapGantt: FC<LLMRoadmapGanttProps> = ({ config }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  const ganttChart = `gantt
    title LLM System Engineering - 12 Week Roadmap
    dateFormat YYYY-MM-DD
    
    section Foundation
    LLM Fundamentals           :done,    task1, 2025-01-01, 7d
    Prompt Engineering         :active,  task2, after task1, 7d
    Structured Output          :         task3, after task2, 7d
    Milestone 1                :milestone, m1, after task3, 0d
    
    section Practice
    System Prompt              :         task4, after task3, 7d
    Function Calling           :         task5, after task4, 7d
    RAG and Cost               :         task6, after task5, 7d
    Milestone 2                :milestone, m2, after task6, 0d
    
    section System
    Chain of Thought           :         task7, after task6, 7d
    Agent Architecture         :         task8, after task7, 7d
    Observability              :         task9, after task8, 7d
    Milestone 3                :milestone, m3, after task9, 0d
    
    section Project
    DSL Design                 :         task10, after task9, 7d
    Failure Analysis           :         task11, after task10, 7d
    Final Project              :crit,    task12, after task11, 7d
    Milestone 4                :milestone, m4, after task12, 0d`;

  /* 只在第一次掛載時初始化 Mermaid */
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      gantt: { 
        useMaxWidth: true,
        fontSize: 11
      },
      ...config,
    });
  }, [config]);

  /* 渲染圖表 */
  useEffect(() => {
    const id = `llm-roadmap-gantt-${Date.now()}`;
    mermaid
      .render(id, ganttChart)
      .then(({ svg }) => setSvg(svg))
      .catch(console.error);
  }, [ganttChart]);

  return (
    <div
      ref={ref}
      className="w-full overflow-auto bg-white rounded-lg border shadow-sm p-4 my-6"
      style={{ maxHeight: '80vh' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default LLMRoadmapGantt;