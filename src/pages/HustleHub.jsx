import React, { useState } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useGame } from '../context/GameContext';

const mockOrders = [
  { id: 1, title: 'Макрос для CS2', client: 'PlayerOne', price: 1500, status: 'in_progress', deadline: '2026-02-07' },
  { id: 2, title: 'Обработка фото', client: 'PhotoGuy', price: 800, status: 'pending', deadline: '2026-02-06' },
  { id: 3, title: 'Аренда Steam', client: 'GamerX', price: 300, status: 'completed', deadline: '2026-02-05' },
];

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabels = {
  pending: 'Новый',
  in_progress: 'В работе',
  completed: 'Завершён',
  cancelled: 'Отменён',
};

export default function HustleHub() {
  const [filter, setFilter] = useState('all');
  const { addXp } = useGame();

  const completeOrder = (id) => {
    addXp(50, 'order_complete');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Hustle Hub 💰</h1>
          <p className="text-gray-400 mt-1">Управление заказами и финансами</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Новый заказ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <p className="text-gray-400 text-sm">Активные заказы</p>
          <p className="text-3xl font-bold text-white mt-1">2</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-gray-400 text-sm">На проверке</p>
          <p className="text-3xl font-bold text-white mt-1">1</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-gray-400 text-sm">Заработано сегодня</p>
          <p className="text-3xl font-bold text-green-400 mt-1">₽1,500</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FunnelIcon className="w-5 h-5 text-gray-400" />
        {['all', 'pending', 'in_progress', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f === 'all' ? 'Все' : statusLabels[f]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="glass-panel p-6 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{order.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Заказчик: {order.client}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-green-400 font-medium">₽{order.price}</span>
                  <span className="text-gray-500">Дедлайн: {order.deadline}</span>
                </div>
              </div>
              
              {order.status === 'in_progress' && (
                <button 
                  onClick={() => completeOrder(order.id)}
                  className="btn-primary text-sm"
                >
                  Завершить (+50 XP)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
