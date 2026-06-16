"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, LineChart, Target, Zap, Server, Code2 } from "lucide-react";

export default function BoardSimulation({ lang }: { lang: "en" | "eg" }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ id: string; sender: string; role: string; text: string; color: string; bg: string; border: string }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const scriptEg = [
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[بدء جلسة المجلس. الموضوع: تقييم أداء الربع الثالث واستراتيجية التوسع]" },
    { sender: "Axiom (المدير التنفيذي للبيانات)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "بناءً على تحليل بيانات السوق الأخيرة، عندنا فرصة نستحوذ على 15% من الحصة السوقية في قطاع التجزئة لو ركزنا على أتمتة خدمة العملاء. معدل النمو الحالي يتباطأ في القطاع المالي (فقط 2.4%)." },
    { sender: "Hesperia (مدير التسويق الذكي)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "عظيم جداً. أنا جهزت 40 نموذج مختلف للإعلانات باللغة العربية بتستهدف صُناع القرار في الشركات الصغيرة والمتوسطة بقطاع التجزئة، التركيز على 'السرعة والاعتمادية'." },
    { sender: "Synthetix (مدير التكنولوجيا)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "عندي اعتراض فني. الـ Infrastructure الحالية متجهة بنسبة 80% لخدمة القطاع المالي. التوجيه لقطاع التجزئة بيتطلب Scale out مفاجئ وتجهيز Load balancers جديدة." },
    { sender: "Axiom (المدير التنفيذي للبيانات)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "تحليل التكلفة/العائد (Cost/Benefit) بيوضح إن العائد من قطاع التجزئة هيغطي تكاليف الـ Scale out في خلال 14 يوم عمل. نسبة الخطورة المحسوبة 0.2% فقط." },
    { sender: "Synthetix (مدير التكنولوجيا)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "في الحالة دي، هبدأ عملية Provisioning لـ 500 Container إضافي وهعمل Deploy للـ API Endpoints الجديدة لربط الإعلانات بنظام خدمة العملاء خلال ثواني." },
    { sender: "Hesperia (مدير التسويق الذكي)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "ممتاز. أنا برفع الميزانية الإعلانية بـ 20% وهشغل A/B Testing على القنوات المفضلة للعملاء، تحديداً LinkedIn و Twitter." },
    { sender: "Axiom (المدير التنفيذي للبيانات)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "الـ KPIs الأساسية هي: معدل التحويل (Conversion Rate) لازم يتخطى 3.5% وتكلفة الاستحواذ (CAC) أقل من 15 دولار للعميل. هل الجميع موافق؟" },
    { sender: "Synthetix (مدير التكنولوجيا)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "موافق. جاري تفعيل المراقبة اللحظية للـ Infrastructure." },
    { sender: "Hesperia (مدير التسويق الذكي)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "موافق. الحملة جاهزة للإطلاق الآن." },
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[تم اتخاذ القرار التوافقي بالإجماع. جاري سحب الموارد، تخصيص الميزانية المحددة بنسبة 30% من الكاش المتوفر، وتنفيذ النشر على السيرفرات في ٣.. ٢.. ١.. تم النشر بنجاح]" }
  ];

  const scriptEn = [
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[Board Session Initiated. Topic: Q3 Performance & Scaling Strategy]" },
    { sender: "Axiom (Data Executive)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "Based on recent market telemetry, we can acquire 15% market share in the retail sector in Q3 if we hyper-focus on automating customer support channels. Financial sector growth has decelerated to 2.4%." },
    { sender: "Hesperia (Creative Director)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "Excellent. I've already synthesized 40 localized ad variations targeting SME decision makers in retail, emphasizing 'Speed and Reliability'." },
    { sender: "Synthetix (Core Architect)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "Technical objection. Current infrastructure vectors are 80% optimized for FinTech workloads. Shifting to retail scale requires an immediate cold-start scale-out and rebalancing of load balancers." },
    { sender: "Axiom (Data Executive)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "Cost/Benefit analysis indicates retail acquisition revenue will offset scale-out compute costs within 14 business days. Calculated risk is at a minimal 0.2%." },
    { sender: "Synthetix (Core Architect)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "Acceptable parameters. I am beginning provisioning for 500 auxiliary containers and deploying new API endpoints to bridge the ad campaigns to our CRM." },
    { sender: "Hesperia (Creative Director)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "Perfect. I am increasing ad spend allocation by 20% and initiating multi-variant A/B testing on primary channels, localized for immediate engagement." },
    { sender: "Axiom (Data Executive)", role: "CEO/Data", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", 
      text: "Primary KPIs set: Conversion Rate > 3.5%, CAC < $15. Do we have consensus across all nodes?" },
    { sender: "Synthetix (Core Architect)", role: "CTO", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", 
      text: "Acknowledged. Real-time telemetry monitoring is active." },
    { sender: "Hesperia (Creative Director)", role: "CMO", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", 
      text: "Acknowledged. Campaign payload is armed and ready." },
    { sender: "System Gateway", role: "SYSTEM", color: "text-zinc-400", bg: "bg-zinc-900/50", border: "border-white/5", 
      text: "[Consensus reached. Reallocating 30% available compute resources. Executing deployment pipeline in 3.. 2.. 1.. Deployment Successful]" }
  ];

  const startSimulation = () => {
    setMessages([]);
    setIsSimulating(true);
    const script = lang === "eg" ? scriptEg : scriptEn;
    
    script.forEach((msg, idx) => {
      setTimeout(() => {
        setMessages(prev => {
          // Keep only the last 15 messages so it doesn't get infinitely huge
          const newMsgs = [...prev, { ...msg, id: Date.now().toString() + idx }];
          return newMsgs.slice(-15);
        });
        if (idx === script.length - 1) {
          setTimeout(() => setIsSimulating(false), 2000);
        }
      }, (idx * 3000) + 500); // Increased timing slightly for readability
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
