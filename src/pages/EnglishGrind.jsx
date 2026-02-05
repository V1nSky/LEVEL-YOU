import React, { useState } from 'react';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useGame } from '../context/GameContext';

const mockDecks = [
  { id: 1, name: 'Gaming Terms', count: 45, new: 12, review: 8, color: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'Freelance', count: 120, new: 5, review: 23, color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Everyday', count: 200, new: 0, review: 45, color: 'from-green-500 to-emerald-500' },
];

export default function EnglishGrind() {
  const [studying, setStudying] = useState(false);
  const { addXp, updateStreak } = useGame();

  const startStudy = () => {
    setStudying(true);
    updateStreak('english');
  };

  const handleCardAnswer = (quality) => {
    const xp = quality >= 3 ? 10 : 5;
    addXp(xp, 'flashcard_review');
  };

  if (studying) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-panel p-8 min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-8 border border-white/10">
            <span className="text-3xl font-bold text-white">"Loot"</span>
          </div>
          <p className="text-gray-400 mb-8">Добыча, лут (в играх)</p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => handleCardAnswer(0)}
              className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
            >
              Снова
            </button>
            <button 
              onClick={() => handleCardAnswer(3)}
              className="flex-1 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-medium transition-colors"
            >
              Хорошо
            </button>
            <button 
              onClick={() => handleCardAnswer(5)}
              className="flex-1 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition-colors"
            >
              Легко
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">English Grind 📚</h1>
          <p className="text-gray-400 mt-1">Выучено слов: 847 | Streak: 12 дней 🔥</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Новая колода
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockDecks.map((deck) => (
          <div key={deck.id} className="glass-panel p-6 card-hover relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${deck.color} opacity-20 rounded-full blur-2xl -mr-16 -mt-16`} />
            
            <h3 className="text-xl font-bold text-white mb-2">{deck.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{deck.count} карточек</p>
            
            <div className="flex gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{deck.new}</p>
                <p className="text-xs text-gray-500">Новые</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">{deck.review}</p>
                <p className="text-xs text-gray-500">Повторить</p>
              </div>
            </div>
            
            <button 
              onClick={startStudy}
              className="w-full py-3 bg-gradient-to-r from-primary to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
            >
              <PlayIcon className="w-5 h-5" />
              Учить
            </button>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">YouTube Integration 🎬</h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Вставь ссылку на YouTube видео..."
            className="input-field flex-1"
          />
          <button className="btn-primary">Загрузить</button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Извлечём субтитры и создадим карточки автоматически
        </p>
      </div>
    </div>
  );
}
