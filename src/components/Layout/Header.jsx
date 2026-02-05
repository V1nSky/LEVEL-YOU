import React from 'react';
import { BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useGame } from '../../context/GameContext';

export default function Header() {
  const { dailyQuests } = useGame();
  const completedCount = dailyQuests.quests.filter(q => q.completed).length;
  
  return (
    <header className="h-16 bg-dark-surface/50 backdrop-blur-md border-b border-dark-border flex items-center justify-between px-8 sticky top-0 z-50">
      <div>
        <h2 className="text-xl font-semibold text-white">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-bg rounded-lg border border-dark-border">
          <span className="text-sm text-gray-400">Квесты:</span>
          <div className="flex gap-1">
            {dailyQuests.quests.map((quest, idx) => (
              <div 
                key={quest.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  quest.completed ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-white ml-2">
            {completedCount}/3
          </span>
        </div>
        
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
          <BellIcon className="w-6 h-6 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Быстрое действие</span>
        </button>
      </div>
    </header>
  );
}
