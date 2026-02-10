
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Music, Disc, Loader2, Volume2, MessageSquare, Play } from 'lucide-react';
import { searchSongLogic } from '../services/geminiService';
import { ChatMessage, Song, BotConfig } from '../types';

interface ChatSimulationProps {
  config: BotConfig;
  isOnline: boolean;
}

const ChatSimulation: React.FC<ChatSimulationProps> = ({ config, isOnline }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (!isOnline) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: 'عذراً، البوت غير متصل حالياً. يرجى تشغيله من لوحة التحكم.',
          timestamp: new Date()
        }]);
      }, 500);
      return;
    }

    setIsTyping(true);

    // Simulate Bot Logic
    const prefix = config.prefix || '/';
    if (input.startsWith(`${prefix}play `)) {
      const songName = input.replace(`${prefix}play `, '');
      try {
        const songData = await searchSongLogic(songName);
        setCurrentSong(songData);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: `🔍 جاري البحث عن: ${songName}...\n\n✅ تم العثور على الأغنية!\n🎵 العنوان: ${songData.title}\n🎤 الفنان: ${songData.artist}\n⏱ المدة: ${songData.duration}\n\nجاري التشغيل في الدردشة الصوتية... 🎧`,
          timestamp: new Date()
        }]);
      } catch (error) {
          setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: 'عذراً، لم أتمكن من العثور على هذه الأغنية.',
          timestamp: new Date()
        }]);
      }
    } else if (input.startsWith(`${prefix}stop`)) {
        setCurrentSong(null);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: 'تم إيقاف التشغيل ومغادرة الدردشة الصوتية.',
          timestamp: new Date()
        }]);
    } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: `الأوامر المتاحة:\n${prefix}play [اسم الأغنية] - لتشغيل موسيقى\n${prefix}stop - لإيقاف التشغيل`,
          timestamp: new Date()
        }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 animate-in zoom-in-95 duration-500">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Chat Window */}
        <div className="flex-1 bg-[#1e293b]/50 rounded-3xl border border-slate-800 backdrop-blur-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-800/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">بوت الموسيقى التجريبي</h4>
                <p className="text-[10px] text-green-400">متصل الآن</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    {/* Fix: MessageSquare is now imported from lucide-react */}
                    <MessageSquare size={48} className="mb-4 text-slate-600" />
                    <p className="text-sm">ابدأ بإرسال رسالة لتجربة البوت</p>
                    <p className="text-xs mt-2">مثال: <span className="text-blue-400" dir="ltr">/play Shape of You</span></p>
                </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب رسالة..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Send size={18} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Voice Chat Visualizer Side Panel */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-[#1e293b]/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
            <h4 className="font-bold mb-6 flex items-center gap-2">
              <Volume2 size={18} className="text-blue-500" />
              الدردشة الصوتية
            </h4>
            
            <div className="aspect-square bg-slate-900 rounded-2xl overflow-hidden relative group">
              {currentSong ? (
                <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-75 duration-300">
                  <div className="relative mb-6">
                    <img 
                      src={`https://picsum.photos/seed/${currentSong.title}/200`} 
                      className="w-32 h-32 rounded-full object-cover animate-[spin_8s_linear_infinite] ring-4 ring-blue-500/20"
                      alt="Thumbnail"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-slate-900 rounded-full border-2 border-blue-500"></div>
                    </div>
                  </div>
                  <h5 className="font-bold text-lg mb-1 truncate w-full">{currentSong.title}</h5>
                  <p className="text-slate-400 text-sm mb-4">{currentSong.artist}</p>
                  
                  <div className="w-full space-y-1">
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/3 animate-[progress_10s_linear_infinite]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0:45</span>
                        <span>{currentSong.duration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-slate-600">
                  <Disc size={64} className="mb-4 animate-pulse opacity-20" />
                  <p className="text-xs">لا يوجد موسيقى تعمل</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
               <button className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-slate-400">
                  {/* Fix: Play is now imported from lucide-react */}
                  <Play size={20} className="fill-current" />
               </button>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl">
             <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Music size={16} />
                <span className="text-xs font-bold">قائمة الانتظار (0)</span>
             </div>
             <p className="text-[10px] text-slate-400">استخدم أمر <code className="text-blue-300">/play</code> لإضافة الأغاني إلى قائمة الانتظار في المحاكاة.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ChatSimulation;
