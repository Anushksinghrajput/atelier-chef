import React from 'react';

interface ChartBarsProps {
  data: number[];
  labels: string[];
  activeColor?: string;
  height?: number;
}

const ChartBars: React.FC<ChartBarsProps> = ({ data, labels, activeColor = '#8A9A5B', height = 120 }) => {
  const maxValue = Math.max(...data, 100);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-end justify-between gap-2 h-32 px-2" style={{ height }}>
        {data.map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center group">
            <div 
              className="w-full bg-nature-sage/40 rounded-t-lg transition-all duration-700 relative overflow-hidden group-hover:scale-y-105"
              style={{ height: `${(val / maxValue) * 100}%` }}
            >
              <div 
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: activeColor }}
              ></div>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {val}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-2">
        {labels.map((label, idx) => (
          <span key={idx} className="text-[9px] font-bold text-nature-moss uppercase tracking-widest flex-1 text-center opacity-60">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChartBars;
