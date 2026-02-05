import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, StopIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { useGame } from '../context/GameContext';

const mockSubjects = [
  { id: 1, name: 'Математика', professor: 'Иванов', grade: 4.2, risk: 'low' },
  { id: 2, name: 'Программирование', professor: 'Петров', grade: 4.8, risk: 'none' },
  { id: 3, name: 'Английский', professor: 'Сидорова', grade: 3.8, risk: 'medium' },
];

const riskColors = {
  none: 'text-green-400',
  low: 'text-yellow-400',
  medium: 'text-orange-400',
  high: 'text-red-400',
};

export default function StudyMode() {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const { addXp } = useGame();

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      addXp(50, 'pomodoro_complete');
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Study Mode 📖</h1>
          <p className="text-gray-400 mt-1">Учёба без троек</p>
        </div>
      </div>

      <div className="glass-panel p-8 text-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 transition-opacity ${timerActive ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="relative z-10">
          <h2 className="text-lg text-gray-400 mb-4">Pomodoro Timer</h2>
          <div className="text-7xl font-bold text-white mb-8 font-mono tracking-wider">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={toggleTimer}
              className="w-16 h-16 rounded-full bg-primary hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
            >
              {timerActive ? (
                <PauseIcon className="w-8 h-8 text-white" />
              ) : (
                <PlayIcon className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            <button 
              onClick={resetTimer}
              className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border hover:border-red-500/50 flex items-center justify-center transition-all"
            >
              <StopIcon className="w-8 h-8 text-gray-400" />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            {timerActive ? 'Фокусируйся...' : 'Готов к учёбе?'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Предметы</h3>
        {mockSubjects.map((subject) => (
          <div key={subject.id} className="glass-panel p-6 card-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{subject.name}</h4>
                  <p className="text-sm text-gray-400">{subject.professor}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{subject.grade}</p>
                <p className={`text-sm ${riskColors[subject.risk]}`}>
                  {subject.risk === 'none' ? 'Всё ок' : 
                   subject.risk === 'low' ? 'Небольшой риск' :
                   subject.risk === 'medium' ? 'Требует внимания' : 'Опасность тройки!'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ближайшие дедлайны ⚠️</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="text-white">Лаба по Программированию</span>
            <span className="text-red-400 font-medium">Завтра</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <span className="text-white">Контрольная по Математике</span>
            <span className="text-yellow-400 font-medium">Через 3 дня</span>
          </div>
        </div>
      </div>
    </div>
  );
}
