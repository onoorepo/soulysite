"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, LineChart, Target, Zap, Server, Code2 } from "lucide-react";

export default function BoardSimulation({ lang }: { lang: "en" | "eg" }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ id: string; sender: string; role: string; text: string; color: string; bg: string; border: string }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const scriptEg = [
    { sender: "Axiom (المدير التنفيذي للبيانات)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "بناءً على تحليل بيانات السوق الأخيرة، عندنا فرصة نستحوذ على 15% من الحصة السوقية في الربع التالت لو ركزنا على أتمتة خدمة العملاء." },
    { sender: "Hesperia (مدير التسويق الذكي)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "عظيم جداً. أنا جهزت 40 نموذج مختلف للإعلانات باللغة العربية بتستهدف صُناع القرار في الشركات الصغيرة، جاهزين للإطلاق بمجرد الموافقة." },
    { sender: "Synthetix (مدير التكنولوجيا)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "الـ Infrastructure حالياً بتتحمل 10 أضعاف الضغط الحالي. هعمل Deploy للـ API Endpoints الجديدة لربط الإعلانات بنظام خدمة العملاء خلال ثواني." },
    { sender: "Axiom (المدير التنفيذي للبيانات)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "تمام جداً. نسبة الخطورة المحسوبة 0.2%. خلينا نعتمد الخطة ونخصص 30% من الموارد للحملة دي. توكلنا على الله." },
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[تم اتخاذ القرار التوافقي. جاري التنفيذ في ٣.. ٢.. ١..]" }
  ];

  const scriptEn = [
    { sender: "Axiom (Data Executive)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "Based on recent market telemetry, we can acquire 15% market share in Q3 if we hyper-focus on automating customer support channels." },
    { sender: "Hesperia (Creative Director)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "Excellent. I've already synthesized 40 localized ad variations targeting SME decision makers. Ready to deploy upon consensus." },
    { sender: "Synthetix (Core Architect)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "Current infrastructure is scaling to handle 10x load. I am deploying new API endpoints to bridge the ad campaigns to our CRM." },
    { sender: "Axiom (Data Executive)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "Calculated risk is at 0.2%. Consensus achieved. Allocating 30% compute resources to the campaign. Executing now." },
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[Consensus reached. Executing deployment pipeline in 3.. 2.. 1..]" }
  ];

  const startSimulation = () => {
    setMessages([]);
    setIsSimulating(true);
    const script = lang === "eg" ? scriptEg : scriptEn;
    
    script.forEach((msg, idx) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: Date.now().toString() + idx }]);
        if (idx === script.length - 1) {
          setTimeout(() => setIsSimulating(false), 2000);
        }
      }, (idx * 2500) + 500);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1 tracking-tight">
            {lang === "eg" ? "محاكاة الإدارة المستقلة (AI Board of Directors)" : "Autonomous Board of Directors"}
          </h2>
          <p className="text-zinc-400 text-xs">
            {lang === "eg" ? "شاهد كيف يتناقش قادة الذكاء الاصطناعي ويتخذون القرارات الاستراتيجية في ثوانٍ." : "Watch AI executives debate and make strategic company decisions in seconds."}
          </p>
        </div>
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className={`shrink-0 px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all glitch-hover ${isSimulating ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}
        >
          {isSimulating ? (lang === "eg" ? "جاري انعقاد المجلس..." : "SESSION ACTIVE...") : (lang === "eg" ? "بدء اجتماع الإدارة" : "CONVENE BOARD")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 flex-1 min-h-0">
        
        {/* Nodes Representation */}
        <div className="hidden md:flex flex-col gap-4">
          <div className={`p-4 rounded-xl border transition-all duration-500 ${isSimulating && messages.length % 4 === 0 && messages.length < 4 ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-500/10' : 'border-emerald-500/10 bg-emerald-500/5'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-emerald-500/20 text-emerald-400">
                <LineChart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-display font-bold text-emerald-400">Axiom Node</div>
                <div className="text-[9px] text-zinc-500 font-mono">DATA & STRATEGY</div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono italic opacity-80">Connected: 14ms</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-500 ${isSimulating && messages.length % 4 === 1 && messages.length < 4 ? 'border-pink-500 shadow-[0_0_20px_rgba(244,63,94,0.2)] bg-pink-500/10' : 'border-pink-500/10 bg-pink-500/5'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-pink-500/20 text-pink-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-display font-bold text-pink-400">Hesperia Node</div>
                <div className="text-[9px] text-zinc-500 font-mono">CREATIVE & GROWTH</div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono italic opacity-80">Listening API</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-500 ${isSimulating && messages.length % 4 === 2 && messages.length < 4 ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-cyan-500/10' : 'border-cyan-500/10 bg-cyan-500/5'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-cyan-500/20 text-cyan-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-display font-bold text-cyan-400">Synthetix Node</div>
                <div className="text-[9px] text-zinc-500 font-mono">INFRASTRUCTURE</div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono italic opacity-80">Memory Allocated</div>
          </div>
        </div>

        {/* Board Chat Log */}
        <div className="glass rounded-xl border border-white/5 bg-zinc-950/60 p-4 overflow-y-auto flex flex-col gap-4 custom-scrollbar h-[400px]">
          {messages.length === 0 ? (
            <div className="m-auto flex flex-col items-center justify-center opacity-40">
              <BrainCircuit className="w-12 h-12 text-zinc-500 mb-3" />
              <p className="text-xs font-mono text-zinc-400 text-center uppercase tracking-widest">
                {lang === "eg" ? "في انتظار بدء الجلسة..." : "Awaiting Board Session..."}
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: lang === "eg" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border ${msg.bg} ${msg.border} backdrop-blur-sm`}
              >
                <div className={`text-[10px] font-mono mb-1 tracking-wider ${msg.color}`}>
                  {msg.sender} <span className="opacity-50">[{msg.role}]</span>
                </div>
                <div className={`text-sm leading-relaxed ${msg.role === "SYSTEM" ? "font-mono" : ""}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))
          )}
          {isSimulating && (
            <div className="flex items-center gap-2 p-4 opacity-50">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.1s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

      </div>
    </div>
  );
}
