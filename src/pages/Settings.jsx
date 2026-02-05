import React from 'react';
import { useGame } from '../context/GameContext';

export default function Settings() {
  const { level, xp, achievements, addXp } = useGame();

  const cheatAddXp = () => {
    addXp(100, 'cheat');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Настройки ⚙️</h1>
      
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Профиль</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Имя</label>
            <input type="text" defaultValue="Юзер" className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email" defaultValue="user@example.com" className="input-field" />
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Уведомления</h3>
        <div className="space-y-3">
          {['Telegram уведомления', 'Email дайджест', 'Desktop уведомления'].map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-dark-bg text-primary focus:ring-primary" />
              <span className="text-gray-300">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Debug / Cheats</h3>
        <div className="space-y-2 text-sm text-gray-400 mb-4">
          <p>Level: {level}</p>
          <p>XP: {xp}</p>
          <p>Achievements: {achievements.length}</p>
        </div>
        <button onClick={cheatAddXp} className="btn-ghost text-sm">
          +100 XP (для теста)
        </button>
      </div>
    </div>
  );
}
