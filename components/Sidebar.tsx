
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Code, 
  MessageSquare,
  Github
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'config' | 'code' | 'chat';
  setActiveTab: (tab: 'dashboard' | 'config' | 'code' | 'chat') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { id: 'config', icon: Settings, label: 'إعدادات البوت' },
    { id: 'code', icon: Code, label: 'توليد الكود' },
    { id: 'chat', icon: MessageSquare, label: 'تجربة البوت' },
  ] as const;

  return (
    <aside className="w-64 border-l border-slate-800 bg-[#0f172a] flex flex-col">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-black text-blue-500">TG</span>
          <span className="text-xl font-bold">MUSIC</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-3">هل تحتاج مساعدة؟</p>
          <a 
            href="https://github.com" 
            target="_blank" 
            className="flex items-center gap-2 text-sm font-semibold hover:text-blue-400 transition-colors"
          >
            <Github size={16} />
            المستودع البرمجي
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
