
import React, { useState } from 'react';
import { BotConfig } from '../types';
import { generateBotCode } from '../services/geminiService';
import { Copy, Terminal, Download, RefreshCw, Loader2 } from 'lucide-react';

interface CodePreviewProps {
  config: BotConfig;
}

const CodePreview: React.FC<CodePreviewProps> = ({ config }) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const generatedCode = await generateBotCode(config);
      setCode(generatedCode);
    } catch (error) {
      console.error(error);
      setCode("# حدث خطأ أثناء توليد الكود. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">توليد الكود المصدري</h2>
          <p className="text-slate-400">قم بتوليد كود Python كامل لبوت الموسيقى الخاص بك.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-blue-600/20 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
          {code ? 'إعادة توليد الكود' : 'توليد الكود الآن'}
        </button>
      </div>

      {!code && !isLoading && (
        <div className="bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center text-center">
          <div className="p-4 bg-slate-800 rounded-2xl mb-4">
            <Terminal size={48} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">بانتظار توليد الكود</h3>
          <p className="text-slate-400 max-w-md">اضغط على الزر أعلاه لتوليد الكود بناءً على الإعدادات التي أدخلتها. سنستخدم Gemini AI لإنشاء أفضل نسخة ممكنة لك.</p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
          <p className="text-slate-400 font-medium animate-pulse">جاري كتابة الكود البرمجي...</p>
        </div>
      )}

      {code && !isLoading && (
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <button 
                onClick={copyToClipboard}
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition-colors flex items-center gap-2 text-xs font-bold"
              >
                {isCopied ? 'تم النسخ!' : <Copy size={16} />}
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition-colors">
                <Download size={16} />
              </button>
            </div>
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-xs font-mono text-slate-500 ml-auto" dir="ltr">main.py</span>
              </div>
              <pre className="p-8 text-sm font-mono overflow-x-auto text-blue-300 leading-relaxed" dir="ltr">
                <code>{code}</code>
              </pre>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
            <h4 className="font-bold text-amber-500 mb-2">تعليمات التشغيل:</h4>
            <ul className="text-sm space-y-2 text-slate-300 list-disc list-inside">
              <li>قم بتثبيت Python 3.8 أو أحدث على جهازك.</li>
              <li>قم بتثبيت المكتبات المطلوبة: <code className="bg-slate-800 px-2 py-0.5 rounded text-amber-400">pip install pyrogram pytgcalls TgCrypto</code></li>
              <li>احفظ الكود في ملف باسم <code className="bg-slate-800 px-2 py-0.5 rounded text-amber-400">main.py</code></li>
              <li>شغل البوت باستخدام الأمر: <code className="bg-slate-800 px-2 py-0.5 rounded text-amber-400">python main.py</code></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePreview;
