import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CurrencyDollarIcon, 
  BookOpenIcon, 
  AcademicCapIcon,
  CogIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { useGame } from '../../context/GameContext';

const navItems = [
  { path: '/', icon: HomeIcon, label: 'Dashboard', color: 'text-blue-400' },
  { path: '/hustle', icon: CurrencyDollarIcon, label: 'Hustle Hub', color: 'text-green-400' },
  { path: '/english', icon: BookOpenIcon, label: 'English', color: 'text-purple-400' },
  { path: '/study', icon: AcademicCapIcon, label: 'Study Mode', color: 'text-orange-400' },
  { path: '/settings', icon: CogIcon, label: 'Настройки', color: 'text-gray-400' },
];

export default function Sidebar() {
  const { level, xp, xpToNext, progressPercent, streaks } = useGame();
  
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-dark-surface border-r border-dark-border flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          PersonalOS
        </h1>
        <p className="text-xs text-gray-500 mt-1">v1.0.0</p>
      </div>
      
      <div className="p-4 m-4 glass-panel">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">Level {level}</span>
          <div className="flex items-center gap-1 text-orange-400">
            <FireIcon className="w-4 h-4" />
            <span className="text-xs font-bold">{streaks.quests.current}</span>
          </div>
        </div>
        <div className="xp-bar mb-1">
          <div 
            className="xp-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{xp} XP</span>
          <span>{xpToNext} XP</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-primary/10 border border-primary/30' 
                : 'hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-gray-300">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white">
            Ю
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Юзер</p>
            <p className="text-xs text-gray-500 truncate">Hustler L{level}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
