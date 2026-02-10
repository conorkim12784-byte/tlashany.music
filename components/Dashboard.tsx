
import React from 'react';
import { 
  Users, 
  Music2, 
  Clock, 
  Activity,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BotConfig } from '../types';

const data = [
  { name: 'السبت', users: 400, plays: 240 },
  { name: 'الأحد', users: 300, plays: 139 },
  { name: 'الاثنين', users: 200, plays: 980 },
  { name: 'الثلاثاء', users: 278, plays: 390 },
  { name: 'الأربعاء', users: 189, plays: 480 },
  { name: 'الخميس', users: 239, plays: 380 },
  { name: 'الجمعة', users: 349, plays: 430 },
];

interface DashboardProps {
  config: BotConfig;
  isOnline: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ config, isOnline }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي المستمعين" 
          value="12,453" 
          icon={Users} 
          trend="+12%" 
          color="blue" 
        />
        <StatCard 
          title="أغاني تم تشغيلها" 
          value="856" 
          icon={Music2} 
          trend="+5.4%" 
          color="purple" 
        />
        <StatCard 
          title="ساعات البث" 
          value="240h" 
          icon={Clock} 
          trend="+2%" 
          color="emerald" 
        />
        <StatCard 
          title="استهلاك الموارد" 
          value="45%" 
          icon={Activity} 
          trend="-3%" 
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1e293b]/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              إحصائيات النشاط الأسبوعي
            </h3>
            <select className="bg-slate-800 border-none text-xs rounded-lg px-2 py-1 outline-none">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="plays" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-6">الحالة الراهنة</h3>
          <div className="space-y-4">
            <StatusRow label="اتصال Telegram" status={isOnline} />
            <StatusRow label="قاعدة البيانات" status={true} />
            <StatusRow label="خادم الصوت (VC)" status={isOnline} />
            <StatusRow label="تنسيق الأغاني" status={true} />
            
            <div className="pt-6 mt-6 border-t border-slate-800">
              <p className="text-sm text-slate-400 mb-2">معلومات البوت:</p>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">المعرف:</span>
                  <span className="font-mono">{config.apiId || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">البادئة:</span>
                  <span className="font-mono text-blue-400">{config.prefix}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          {trend}
          <ArrowUpRight size={12} />
        </div>
      </div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      <h4 className="text-3xl font-black">{value}</h4>
    </div>
  );
};

const StatusRow = ({ label, status }: { label: string, status: boolean }) => (
  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
    <span className="text-sm">{label}</span>
    <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${status ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
      {status ? 'مفعل' : 'معطل'}
    </div>
  </div>
);

export default Dashboard;
