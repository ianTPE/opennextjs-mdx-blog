"use client";
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart configuration for consistent styling
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 12
        }
      }
    },
    title: {
      font: {
        size: 16,
        weight: 'bold' as const
      }
    }
  }
};

export const MarketGrowthChart = () => (
  <div style={{ height: '400px', marginBottom: '2rem' }}>
    <Bar
      data={{
        labels: ['傳統就業市場', 'Gig經濟', 'Freelancer收入增長'],
        datasets: [{
          label: '增長率 (%)',
          data: [1.1, 15, 60],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        }]
      }}
      options={{
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '市場增長對比：傳統就業 vs Gig經濟',
            ...defaultOptions.plugins.title
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `${value}%`;
              }
            }
          }
        }
      }}
    />
  </div>
);

export const JobGrowthProjectionChart = () => (
  <div style={{ height: '400px', marginBottom: '2rem' }}>
    <Bar
      data={{
        labels: ['網絡安全', 'AI/ML開發', '軟件工程', '網頁設計', '技術寫作', '財務分析'],
        datasets: [{
          label: '預計增長率 (%)',
          data: [32, 26, 17, 16, 7, 9],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      }}
      options={{
        ...defaultOptions,
        indexAxis: 'y',
        plugins: {
          ...defaultOptions.plugins,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '2025-2033年各技術領域就業增長預測',
            ...defaultOptions.plugins.title
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `${value}%`;
              }
            }
          }
        }
      }}
    />
  </div>
);

export const IncomeComparisonChart = () => (
  <div style={{ height: '400px', marginBottom: '2rem' }}>
    <Bar
      data={{
        labels: ['初級項目', '中級項目', '高級項目', '月度維護'],
        datasets: [{
          label: '後端開發',
          data: [10000, 32500, 125000, 6000],
          backgroundColor: 'rgba(255, 99, 132, 0.8)'
        }, {
          label: '前端開發',
          data: [3000, 17500, 65000, 2750],
          backgroundColor: 'rgba(54, 162, 235, 0.8)'
        }, {
          label: '全棧開發',
          data: [17500, 50000, 162500, 7500],
          backgroundColor: 'rgba(75, 192, 192, 0.8)'
        }]
      }}
      options={{
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            display: true,
            text: '不同技術方向收入潛力對比（美元）',
            ...defaultOptions.plugins.title
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `$${value.toLocaleString()}`;
              }
            }
          }
        }
      }}
    />
  </div>
);

export const TechStackComparisonRadar = () => (
  <div style={{ height: '400px', marginBottom: '2rem' }}>
    <Radar
      data={{
        labels: ['項目獨立性', '收入潛力', '市場需求', '技能門檻', '遠程友好度', '成長空間'],
        datasets: [{
          label: '後端開發',
          data: [75, 85, 90, 80, 95, 88],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          label: '前端開發',
          data: [70, 75, 85, 65, 90, 80],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }, {
          label: '全棧開發',
          data: [95, 90, 95, 85, 92, 93],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      }}
      options={{
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            display: true,
            text: '三大技術方向綜合評分對比',
            ...defaultOptions.plugins.title
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }}
    />
  </div>
);

const Charts = {
  MarketGrowthChart,
  JobGrowthProjectionChart,
  IncomeComparisonChart,
  TechStackComparisonRadar
};

export default Charts;