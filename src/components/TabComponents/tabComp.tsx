'use client';

import { useTabsStore } from '@/store/TabManagementStore';
import { Plus, X } from 'lucide-react';

export function TabsBar() {
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabsStore();

  return (
    <div className="flex items-center border-b border-gray-700 bg-gray-800">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border-r border-gray-700 whitespace-nowrap ${
              activeTabId === tab.id
                ? 'bg-gray-900 text-white'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className={`font-bold ${
                tab.method === 'GET' ? 'text-green-400' :
                tab.method === 'POST' ? 'text-yellow-400' :
                tab.method === 'PUT' ? 'text-blue-400' :
                tab.method === 'DELETE' ? 'text-red-400' : 'text-gray-300'
            }`}>{tab.method}</span>
            <span>{tab.name}</span>
            <X
              className="h-4 w-4 rounded-full hover:bg-gray-600"
              onClick={(e) => {
                e.stopPropagation(); // Prevent setActiveTab from firing
                removeTab(tab.id);
              }}
            />
          </button>
        ))}
      </div>
      <button
        onClick={addTab}
        className="p-2 text-gray-400 hover:bg-gray-700"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}