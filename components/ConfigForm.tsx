
import React from 'react';
import { BotConfig } from '../types';
import { Save, Info } from 'lucide-react';

interface ConfigFormProps {
  config: BotConfig;
  setConfig: React.Dispatch<React.SetStateAction<BotConfig>>;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ config, setConfig }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">إعدادات البوت</h2>
        <p className="text-slate-400">أدخل بيانات الاعتماد الخاصة بك من Telegram لتوليد كود البوت.</p>
      </div>

      <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="API ID" 
            name="apiId" 
            value={config.apiId} 
            onChange={handleChange} 
            placeholder="مثال: 1234567"
            info="تحصل عليه من my.telegram.org"
          />
          <InputGroup 
            label="API HASH" 
            name="apiHash" 
            value={config.apiHash} 
            onChange={handleChange} 
            placeholder="أدخل الهاش هنا"
            info="تحصل عليه من my.telegram.org"
          />
        </div>

        <InputGroup 
          label="BOT TOKEN" 
          name="botToken" 
          value={config.botToken} 
          onChange={handleChange} 
          placeholder="712345678:AAF-..."
          info="تحصل عليه من @BotFather"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="معرف المطور (SUDO USER)" 
            name="sudoUsers" 
            value={config.sudoUsers} 
            onChange={handleChange} 
            placeholder="5555555"
            info="المستخدم الذي له صلاحية التحكم الكاملة"
          />
          <InputGroup 
            label="البادئة (Command Prefix)" 
            name="prefix" 
            value={config.prefix} 
            onChange={handleChange} 
            placeholder="/"
            info="الرمز المستخدم قبل الأوامر (مثل /play)"
          />
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
            <Save size={20} />
            حفظ الإعدادات
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4">
        <div className="text-blue-500 shrink-0">
          <Info size={24} />
        </div>
        <div className="text-sm leading-relaxed text-blue-100/80">
          تأكد من أن جميع المعلومات صحيحة. لا تشارك هذه المعلومات مع أي شخص، فهي تمنح وصولاً كاملاً إلى حساب البوت الخاص بك. نحن لا نقوم بتخزين هذه البيانات على خوادمنا.
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, placeholder, info }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-sm font-bold text-slate-300">{label}</label>
      <span className="text-[10px] text-slate-500">{info}</span>
    </div>
    <input 
      type="text" 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors text-slate-100 placeholder:text-slate-600"
    />
  </div>
);

export default ConfigForm;
