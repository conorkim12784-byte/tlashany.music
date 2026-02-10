
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Music, 
  Settings, 
  Code, 
  MessageSquare, 
  Play, 
  Terminal, 
  Cpu, 
  Zap, 
  Github,
  CheckCircle2,
  Copy,
  LayoutDashboard
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ConfigForm from './components/ConfigForm';
import CodePreview from './components/CodePreview';
import ChatSimulation from './components/ChatSimulation';
import { BotConfig } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'config' | 'code' | 'chat'>('dashboard');
  const [config, setConfig] = useState<BotConfig>({
    botToken: '',
    apiId: '',
    apiHash: '',
    sudoUsers: '',
    prefix: '/'
  });
  const [isBotOnline, setIsBotOnline] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#1e293b]/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Music size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">استوديو بوت الموسيقى</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${isBotOnline ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <span className={`w-2 h-2 rounded-full ${isBotOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {isBotOnline ? 'البوت متصل' : 'البوت غير متصل'}
            </div>
            <button 
              onClick={() => setIsBotOnline(!isBotOnline)}
              className="bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-1.5 rounded-lg text-sm font-semibold"
            >
              {isBotOnline ? 'إيقاف البوت' : 'تشغيل البوت'}
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
          {activeTab === 'dashboard' && <Dashboard config={config} isOnline={isBotOnline} />}
          {activeTab === 'config' && <ConfigForm config={config} setConfig={setConfig} />}
          {activeTab === 'code' && <CodePreview config={config} />}
          {activeTab === 'chat' && <ChatSimulation config={config} isOnline={isBotOnline} />}
        </div>
      </main>
    </div>
  );
};

export default App;
