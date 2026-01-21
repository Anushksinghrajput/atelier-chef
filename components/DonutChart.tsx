import React from 'react';

interface DonutChartProps {
  percentage: number;
  color: string;
  label: string;
  icon: string;
  size?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage, color, label, icon, size = 100 }) => {
  const radius = size * 0.35;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle 
            cx={size / 2} cy={size / 2} r={radius} 
            stroke="currentColor" strokeWidth={strokeWidth} 
            fill="transparent" className="text-nature-sage/30" 
          />
          <circle 
            cx={size / 2} cy={size / 2} r={radius} 
            stroke={color} strokeWidth={strokeWidth} 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out group-hover:opacity-80"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`fa-solid ${icon} text-sm`} style={{ color }}></i>
        </div>
      </div>
      <div className="text-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-nature-moss block opacity-60">
          {label}
        </span>
        <span className="text-xs font-bold text-nature-forest">{percentage}%</span>
      </div>
    </div>
  );
};

export default DonutChart;
