
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { playXpSound, playLevelUpSound, playQuestCompleteSound } from '../utils/sounds';
import { triggerLevelUpConfetti, triggerQuestCompleteConfetti, triggerAllQuestsConfetti } from '../utils/confetti';


const GameContext = createContext();

const initialState = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  streaks: {
    english: { current: 0, max: 0, lastDate: null },
    quests: { current: 0, max: 0, lastDate: null },
    hustle: { current: 0, max: 0, lastDate: null }
  },
  achievements: [],
  dailyQuests: {
    date: null,
    quests: [
      { id: 1, text: 'Проверить FunPay', completed: false, xp: 30 },
      { id: 2, text: 'Выучить 10 слов', completed: false, xp: 50 },
      { id: 3, text: '2 часа учёбы', completed: false, xp: 40 }
    ],
    allCompleted: false
  }
};

const xpForLevel = (level) => Math.floor(100 * Math.pow(1.5, level - 1));

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADD_XP': {
      const newXp = state.xp + action.payload;
      let newLevel = state.level;
      let remainingXp = newXp;
      let xpNeeded = state.xpToNext;
      
      while (remainingXp >= xpNeeded) {
        remainingXp -= xpNeeded;
        newLevel++;
        xpNeeded = xpForLevel(newLevel);
      }
      
      return {
        ...state,
        xp: remainingXp,
        level: newLevel,
        xpToNext: xpNeeded
      };
    }
    
    case 'COMPLETE_QUEST': {
      const updatedQuests = state.dailyQuests.quests.map(q => 
        q.id === action.payload ? { ...q, completed: true } : q
      );
      const allDone = updatedQuests.every(q => q.completed);
      
      return {
        ...state,
        dailyQuests: {
          ...state.dailyQuests,
          quests: updatedQuests,
          allCompleted: allDone
        }
      };
    }
    
    case 'RESET_DAILY_QUESTS': {
      return {
        ...state,
        dailyQuests: {
          date: new Date().toDateString(),
          quests: action.payload || initialState.dailyQuests.quests,
          allCompleted: false
        }
      };
    }
    
    case 'UPDATE_STREAK': {
      const { type, date } = action.payload;
      const streak = state.streaks[type];
      const isConsecutive = streak.lastDate && 
        new Date(date) - new Date(streak.lastDate) === 86400000;
      
      const newCurrent = isConsecutive ? streak.current + 1 : 1;
      
      return {
        ...state,
        streaks: {
          ...state.streaks,
          [type]: {
            current: newCurrent,
            max: Math.max(newCurrent, streak.max),
            lastDate: date
          }
        }
      };
    }
    
    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.find(a => a.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        achievements: [...state.achievements, { ...action.payload, unlockedAt: new Date() }]
      };
    }
    
    case 'LOAD_STATE': {
      return { ...action.payload };
    }
    
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('personalOS_game');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.dailyQuests?.date) {
        parsed.dailyQuests.date = new Date().toDateString();
      }
      dispatch({ type: 'LOAD_STATE', payload: parsed });
    }
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('personalOS_game', JSON.stringify(state));
    }
  }, [state, isLoaded]);
  
  const addXp = (amount, source) => {
    const prevLevel = state.level;
    dispatch({ type: 'ADD_XP', payload: amount });
    
    // Звук при получении XP
    playXpSound();
    
    // Проверяем, был ли level up
    setTimeout(() => {
      if (state.level > prevLevel) {
        playLevelUpSound();
        triggerLevelUpConfetti(); // ← КОНФЕТТИ ПРИ LEVEL UP
      }
    }, 100);
    
    console.log(`+${amount} XP от ${source}`);
  };
  
  const completeQuest = (questId) => {
    const quest = state.dailyQuests.quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      dispatch({ type: 'COMPLETE_QUEST', payload: questId });
      playQuestCompleteSound(); // ← ДОБАВИТЬ
      triggerQuestCompleteConfetti(); // ← КОНФЕТТИ ПРИ КВЕСТЕ
      addXp(quest.xp, 'daily_quest');
      
      const remaining = state.dailyQuests.quests.filter(q => q.id !== questId && !q.completed);
      if (remaining.length === 0) {
        addXp(100, 'all_quests_complete');
        setTimeout(() => triggerAllQuestsConfetti(), 500); // ← БОЛЬШЕ КОНФЕТТИ ЗА ВСЕ КВЕСТЫ
        dispatch({ type: 'UPDATE_STREAK', payload: { type: 'quests', date: new Date().toDateString() } });
      }
    }
  };
  
  const updateStreak = (type) => {
    dispatch({ type: 'UPDATE_STREAK', payload: { type, date: new Date().toDateString() } });
  };
  
  const unlockAchievement = (achievement) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement });
    addXp(achievement.xp || 200, 'achievement');
  };
  
  const value = {
    ...state,
    addXp,
    completeQuest,
    updateStreak,
    unlockAchievement,
    progressPercent: (state.xp / state.xpToNext) * 100
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
