"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Swords, Scale } from "lucide-react";

export default function ArenaSimulation({ lang }: { lang: "en" | "eg" }) {
  const [activeSide, setActiveSide] = useState<"left" | "right" | "center">("center");
  const [step, setStep] = useState(0);

  const steps = [
    {
      side: "center",
      title: lang === "eg" ? "صراع الأهداف (Alignment Debate)" : "Alignment Debate",
      leftBar: 50, rightBar: 50,
      log: lang === "eg" ? "[النظام] رصد تعارض في تخصيص ميزانية الحملة الجديدة." : "[SYSTEM] Detected budget allocation conflict for new campaign."
    },
    {
      side: "left",
      title: "AXIOM NODE",
      leftBar: 80, rightBar: 20,
      log: lang === "eg" ? "Axiom: ميزانية التسويق يجب أن تذهب للعملاء القدامى (ROI مؤكد 40%)." : "Axiom: Capital must be diverted to retention. (Proven 40% ROI)."
    },
    {
      side: "right",
      title: "HESPERIA NODE",
      leftBar: 30, rightBar: 70,
      log: lang === "eg" ? "Hesperia: لا، الإبداع يتطلب المخاطرة. الاستحواذ على عملاء جدد سيبني الـ Brand Awareness." : "Hesperia: Disagree. Creative growth requires risk. New acquisition builds total addressable market."
    },
    {
      side: "center",
      title: lang === "eg" ? "حل النزاع التلقائي (Consensus)" : "Automated Consensus",
      leftBar: 55, rightBar: 45,
      log: lang === "eg" ? "[Synthetix] تسوية محتومة: 55% لاستهداف القدامى + 45% لحملات الاستحواذ الإبداعية. جاري النشر." : "[Synthetix] Resolution: 55% retention vector + 45% creative acquisition. Deploying."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [steps.length]);

  useEffect(() => {
    setActiveSide(steps[step].side as "left" | "right" | "center");
  }, [step, steps]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display font-bold text-white flex items-center justify-center gap-2">
          <Swords className="w-6 h-6 text-rose-500" />
          {lang === "eg" ? "حلبة نقاش الـ Agents" : "Agent Battle Arena"}
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
          {lang === "eg" ? "شاهد كيف تتجادل الأنظمة المستقلة للوصول لأفضل قرار للشركة موازنة بين المنطق والإبداع." : "Watch autonomous nodes debate to reach the mathematically optimized business decision combining logic and creative risk."}
        </p>
      </div>

      <div className="w-full max-w-3xl glass p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        {/* Background glow based on active side */}
        <div className={`absolute top-0 bottom-0 left-0 w-1/2 bg-emerald-500/10 blur-[80px] transition-opacity duration-1000 ${activeSide === 'left' ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-0 bottom-0 right-0 w-1/2 bg-pink-500/10 blur-[80px] transition-opacity duration-1000 ${activeSide === 'right' ? 'opacity-100' : 'opacity-0'}`} />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className={`text-center transition-all duration-300 ${activeSide === 'left' ? 'scale-110' : 'scale-90 opacity-70'}`}>
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Scale className="w-8 h-8" />
            </div>
            <div className="font-display font-medium text-emerald-400">AXIOM</div>
            <div className="text-[10px] font-mono text-zinc-500">LOGIC / RISK / DATA</div>
          </div>

          <div className="flex-1 px-8 flex flex-col items-center justify-center">
            <div className="h-0.5 w-full bg-zinc-800 rounded-full mb-6 relative overflow-hidden flex">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${steps[step].leftBar}%` }} 
              />
              <div 
                className="h-full bg-pink-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${steps[step].rightBar}%` }} 
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-sm font-mono p-3 rounded-lg bg-zinc-900 border border-white/10 relative z-10 min-w-[280px]"
              >
                <div className="text-[9px] mb-1 opacity-50 uppercase tracking-widest">{steps[step].title}</div>
                <div className={activeSide === 'left' ? 'text-emerald-400' : activeSide === 'right' ? 'text-pink-400' : 'text-cyan-400'}>
                  {steps[step].log}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={`text-center transition-all duration-300 ${activeSide === 'right' ? 'scale-110' : 'scale-90 opacity-70'}`}>
            <div className="w-16 h-16 mx-auto bg-pink-500/10 rounded-full border border-pink-500/30 flex items-center justify-center mb-3 text-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
              <Zap className="w-8 h-8" />
            </div>
            <div className="font-display font-medium text-pink-400">HESPERIA</div>
            <div className="text-[10px] font-mono text-zinc-500">CREATIVE / GROWTH</div>
          </div>
        </div>
      </div>
    </div>
  );
}
