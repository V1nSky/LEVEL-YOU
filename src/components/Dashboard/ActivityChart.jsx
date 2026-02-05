import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { day: 'Пн', xp: 120, earnings: 1500 },
  { day: 'Вт', xp: 200, earnings: 0 },
  { day: 'Ср', xp: 350, earnings: 3000 },
  { day: 'Чт', xp: 180, earnings: 1500 },
  { day: 'Пт', xp: 420, earnings: 4500 },
  { day: 'Сб', xp: 300, earnings: 2000 },
  { day: 'Вс', xp: 150, earnings: 0 },
];

export default function ActivityChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            stroke="#6B7280" 
            tick={{ fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="#6B7280" 
            tick={{ fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            stroke="#6B7280" 
            tick={{ fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="xp" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorXp)"
            name="XP"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="earnings" 
            stroke="#10B981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMoney)"
            name="Заработок (₽)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}