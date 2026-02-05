import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  CurrencyDollarIcon, 
  BookOpenIcon, 
  AcademicCapIcon,
  FireIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid';

const StatCard = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <div className="glass-panel p-6 card-hover">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-lg bg-opacity-20 ${color}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={trend > 0 ? 'text-green-400' : 'text-red-400'}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-500">vs прошлая неделя</span>
      </div>
    )}
  </div>
);

const QuestItem = ({ quest, onComplete }) => (
  <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
    quest.completed 
      ? 'bg-green-500/10 border-green-500/30' 
      : 'bg-dark-bg border-dark-border hover:border-primary/30'
  }`}>
    <button 
      onClick={() => !quest.completed && onComplete(quest.id)}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        quest.completed 
          ? 'bg-green-500 border-green-500' 
          : 'border-gray-500 hover:border-primary'
      }`}
    >
      {quest.completed && <CheckCircleIcon className="w-4 h-4 text-white" />}
    </button>
    <div className="flex-1">
      <p className={`font-medium ${quest.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
        {quest.text}
      </p>
      <p className="text-xs text-gray-500">+{quest.xp} XP</p>
    </div>
    {quest.completed && (
      <span className="text-xs text-green-400 font-medium">Выполнено!</span>
    )}
  </div>
);

export default function Dashboard() {
  const { 
    level, 
    xp, 
    xpToNext, 
    progressPercent,
    dailyQuests, 
    completeQuest,
    streaks,
    achievements 
  } = useGame();

  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Добро пожаловать, Hustler! 👋
          </h1>
          <p className="text-gray-400 mb-6">
            У тебя {dailyQuests.quests.filter(q => !q.completed).length} активных квеста сегодня. 
            Продолжай в том же духе!
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FireIcon className="w-5 h-5 text-orange-400" />
              <span className="text-white font-medium">{streaks.quests.current} дней streak</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">{achievements.length} достижений</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Заработано (февраль)"
          value="₽12,500"
          subtext="Цель: ₽20,000"
          icon={CurrencyDollarIcon}
          color="bg-green-500"
          trend={15}
        />
        <StatCard 
          title="Слов выучено"
          value="847"
          subtext="Цель: 1000"
          icon={BookOpenIcon}
          color="bg-purple-500"
          trend={8}
        />
        <StatCard 
          title="Средний балл"
          value="4.3"
          subtext="Цель: без троек"
          icon={AcademicCapIcon}
          color="bg-orange-500"
          trend={-2}
        />
        <StatCard 
          title="Продуктивность"
          value="87%"
          subtext="12 часов фокуса"
          icon={ClockIcon}
          color="bg-blue-500"
          trend={12}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Daily Quests 🔥</h3>
            <span className="text-sm text-gray-400">
              {dailyQuests.quests.filter(q => q.completed).length}/3
            </span>
          </div>
          <div className="space-y-3">
            {dailyQuests.quests.map(quest => (
              <QuestItem 
                key={quest.id} 
                quest={quest} 
                onComplete={completeQuest}
              />
            ))}
          </div>
          
          {dailyQuests.allCompleted && (
            <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 font-medium text-center">
                🎉 Все квесты выполнены! +100 XP бонус!
              </p>
            </div>
          )}
          
          <div className="glass-panel p-4 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Level {level}</span>
              <span className="text-gray-400 text-sm">{xp}/{xpToNext} XP</span>
            </div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              До Level {level + 1} осталось {xpToNext - xp} XP
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="text-xl font-semibold text-white mb-6">График активности</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            📊 Тут будет график (нужно установить recharts)
          </div>
        </div>
      </div>
    </div>
  );
}
