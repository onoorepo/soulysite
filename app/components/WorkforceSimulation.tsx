"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Megaphone, BadgeDollarSign, Headphones, Briefcase, Activity, CheckCircle2, ChevronRight, Binary, ArrowRight } from "lucide-react";

export default function WorkforceSimulation({ lang }: { lang: "en" | "eg" }) {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const departments = [
    {
      id: "marketing",
      icon: Megaphone,
      titleEx: lang === "eg" ? "إدارة التسويق السابقة (بشري)" : "Legacy Marketing",
      titleAI: lang === "eg" ? "سرب التسويق الذكي (AI)" : "Marketing Swarm",
      statsEx: "ROI: 12% | Speed: 2 Days/Campaign",
      statsAI: "ROI: 340% | Speed: 5s/Campaign",
      descEx: lang === "eg" ? "٦ موظفين بيكتبوا محتوى وبيحللوا الحملات." : "6 Employees writing copy and analyzing campaigns.",
      descAI: lang === "eg" ? "٢٠ Agent بيكتبوا ويحللوا وينشروا في ثواني بـ Auto-targeting." : "20 Agents writing, analyzing, and publishing in seconds with Auto-targeting.",
      activeBtnClass: "bg-emerald-500/5 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      activeIconBg: "bg-emerald-500/20 text-emerald-400",
      activeText: "text-emerald-400",
      cardBorder: "border-emerald-500/30",
      cardBg: "bg-emerald-500/5",
      cardGrad: "to-emerald-500/10",
      cardIcon: "text-emerald-400",
      statBg: "bg-emerald-500/20",
      statText: "text-emerald-300",
      statBorder: "border-emerald-500/40",
      statShadow: "shadow-emerald-500/20"
    },
    {
      id: "sales",
      icon: BadgeDollarSign,
      titleEx: lang === "eg" ? "فريق المبيعات (بشري)" : "Legacy Sales",
      titleAI: lang === "eg" ? "مفاوض المبيعات (AI)" : "AI Negotiator",
      statsEx: "Close Rate: 8% | Leads: 50/day",
      statsAI: "Close Rate: 42% | Leads: 10,000/day",
      descEx: lang === "eg" ? "مكالمات فردية ومتابعة بطيئة للعملاء." : "1-on-1 calls and slow follow-ups.",
      descAI: lang === "eg" ? "ألاف المحادثات في نفس الوقت مع إقناع ذكي وتخصيص العروض." : "Thousands of concurrent conversations with dynamic persuasion.",
      activeBtnClass: "bg-pink-500/5 border-pink-400/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      activeIconBg: "bg-pink-500/20 text-pink-400",
      activeText: "text-pink-400",
      cardBorder: "border-pink-500/30",
      cardBg: "bg-pink-500/5",
      cardGrad: "to-pink-500/10",
      cardIcon: "text-pink-400",
      statBg: "bg-pink-500/20",
      statText: "text-pink-300",
      statBorder: "border-pink-500/40",
      statShadow: "shadow-pink-500/20"
    },
    {
      id: "cs",
      icon: Headphones,
      titleEx: lang === "eg" ? "خدمة العملاء (بشري)" : "Customer Service",
      titleAI: lang === "eg" ? "مركز الدعم الآلي (AI)" : "Support AI Core",
      statsEx: "Resolution: 1.5 hrs | SLA: 85%",
      statsAI: "Resolution: 0.2s | SLA: 99.99%",
      descEx: lang === "eg" ? "انتظار طويل وشكاوى متكررة." : "Long queues and repeated complaints.",
      descAI: lang === "eg" ? "حل مشاكل فوري ٢٤/٧ بدون إجازات أو إرهاق بذاكرة لا نهائية." : "Instant 24/7 resolution without fatigue or time-off.",
      activeBtnClass: "bg-cyan-500/5 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      activeIconBg: "bg-cyan-500/20 text-cyan-400",
      activeText: "text-cyan-400",
      cardBorder: "border-cyan-500/30",
      cardBg: "bg-cyan-500/5",
      cardGrad: "to-cyan-500/10",
      cardIcon: "text-cyan-400",
      statBg: "bg-cyan-500/20",
      statText: "text-cyan-300",
      statBorder: "border-cyan-500/40",
      statShadow: "shadow-cyan-500/20"
    },
    {
      id: "management",
      icon: Briefcase,
      titleEx: lang === "eg" ? "الإدارة والتحليل (بشري)" : "Legacy Management",
      titleAI: lang === "eg" ? "المدير التنفيذي الذكي (AI)" : "Executive Orchestrator",
      statsEx: "Decisions: 1/week | Risk: High",
      statsAI: "Decisions: 100/sec | Risk: 0.01%",
      descEx: lang === "eg" ? "اجتماعات طويلة وقرارات مبنية على مشاعر." : "Long meetings and emotion-driven decisions.",
      descAI: lang === "eg" ? "رؤية شاملة للبيانات الحية وتوزيع موارد مالي وبشري تلقائي." : "Holistic live data view with automated resource allocation.",
      activeBtnClass: "bg-purple-500/5 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      activeIconBg: "bg-purple-500/20 text-purple-400",
      activeText: "text-purple-400",
      cardBorder: "border-purple-500/30",
      cardBg: "bg-purple-500/5",
      cardGrad: "to-purple-500/10",
      cardIcon: "text-purple-400",
      statBg: "bg-purple-500/20",
      statText: "text-purple-300",
      statBorder: "border-purple-500/40",
      statShadow: "shadow-purple-500/20"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveDepartment((prev) => (prev + 1) % departments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, departments.length]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1">
            {lang === "eg" ? "محاكاة الإحلال الذكي (AI Workforce Replacement)" : "AI Workforce Replacement Simulation"}
          </h2>
          <p className="text-zinc-400 text-xs text-balance">
            {lang === "eg" 
              ? "متابعة لاستبدال القطاعات الإدارية بشبكات تشغيل ذاتية مستقلة وتحسين الإنتاجية بـ 100x." 
              : "Tracking the automated replacement of legacy sectors with autonomous Swarms."}
          </p>
        </div>
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 p-1 rounded-lg">
          <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-mono ${isPlaying ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-500 hover:text-white'}`}>
            {isPlaying ? (lang === "eg" ? "إيقاف المحاكاة" : "PAUSE") : (lang === "eg" ? "تشغيل" : "PLAY")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dep, idx) => (
          <button
            key={dep.id}
            onClick={() => { setActiveDepartment(idx); setIsPlaying(false); }}
            className={`text-left p-4 rounded-xl border transition-all duration-300 glitch-hover ${activeDepartment === idx ? dep.activeBtnClass : 'glass border-white/5 hover:border-white/10 opacity-70 hover:opacity-100'}`}
          >
            <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${activeDepartment === idx ? dep.activeIconBg : 'bg-zinc-800 text-zinc-400'}`}>
              <dep.icon className="w-4 h-4" />
            </div>
            <h3 className="font-display font-medium text-sm text-white mb-1">{dep.titleAI}</h3>
            <div className={`text-[10px] font-mono ${activeDepartment === idx ? dep.activeText : 'text-zinc-500'}`}>
              NODE: {idx < 9 ? '0'+(idx+1) : idx+1} STATUS
            </div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex-1 min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeDepartment}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center"
          >
            {/* Legacy Side */}
            <div className="glass p-6 rounded-2xl border border-red-500/20 bg-red-950/20 flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-zinc-500 mb-4 opacity-50" />
              <h3 className="text-zinc-400 font-display font-medium mb-2">{departments[activeDepartment].titleEx}</h3>
              <p className="text-xs text-zinc-500 mb-4 h-10">{departments[activeDepartment].descEx}</p>
              <div className="bg-red-950/40 text-red-400/80 px-3 py-1.5 rounded-md text-[10px] font-mono border border-red-500/20">
                {departments[activeDepartment].statsEx}
              </div>
            </div>

            {/* Transition Indicator */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent hidden md:block" />
              <div className="p-2 rounded-full bg-zinc-900 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent hidden md:block" />
            </div>

            {/* AI Side */}
            <div className={`glass p-6 rounded-2xl border ${departments[activeDepartment].cardBorder} ${departments[activeDepartment].cardBg} flex flex-col items-center text-center relative overflow-hidden group glitch-hover`}>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent ${departments[activeDepartment].cardGrad} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <Binary className={`w-8 h-8 ${departments[activeDepartment].cardIcon} mb-4 animate-pulse`} />
                <h3 className="text-white font-display font-medium mb-2 text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{departments[activeDepartment].titleAI}</h3>
                <p className="text-xs text-zinc-300 mb-4 h-10">{departments[activeDepartment].descAI}</p>
                <div className={`${departments[activeDepartment].statBg} ${departments[activeDepartment].statText} px-3 py-1.5 rounded-md text-[11px] font-mono border ${departments[activeDepartment].statBorder} ${departments[activeDepartment].statShadow}`}>
                  {departments[activeDepartment].statsAI}
                </div>
              </div>
              
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
