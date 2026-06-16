"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Network, Layers, Shield, Zap, Database } from "lucide-react";

const bentoItems = [
  {
    id: "net",
    icon: Network,
    titleEn: "Neural Network Architecture",
    titleEg: "معمارية الشبكات العصبية",
    theme: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/50", bar: "bg-cyan-500/50", label: "text-cyan-400/70" },
    descEn: "Advanced multi-node clustered intelligence tracking.",
    descEg: "تتبع متقدم للذكاء العنقودي متعدد العقد.",
    metaEn: "Active Nodes: 12,400\nLatency: 14ms\nBandwidth: 1.2TB/s",
    metaEg: "العقد النشطة: ١٢,٤٠٠\nالتأخير: ١٤ms\nالباندويث: ١.٢TB/s"
  },
  {
    id: "swarm",
    icon: Layers,
    titleEn: "Swarm Hive-Mind Protocol",
    titleEg: "بروتوكول العقل المدبر للسرب",
    theme: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/50", bar: "bg-purple-500/50", label: "text-purple-400/70" },
    descEn: "Parallel consensus bridging across all deployed agents.",
    descEg: "توافق متوازي يربط بين جميع العملاء المنشورين.",
    metaEn: "Consensus Rate: 4B ops/sec\nConflict Res: <2ms\nUptime: 99.999%",
    metaEg: "معدل التوافق: ٤ مليار عملية/ث\nحل النزاعات: <2ms\nوقت العمل: ٩٩.٩٩٩٪"
  },
  {
    id: "sec",
    icon: Shield,
    titleEn: "Quantum Encryption",
    titleEg: "تشفير كمي متطور",
    theme: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/50", bar: "bg-emerald-500/50", label: "text-emerald-400/70" },
    descEn: "Zero-trust verification for inter-agent communication.",
    descEg: "توثيق بدون ثقة للاتصالات بين وكلاء الذكاء الاصطناعي.",
    metaEn: "Keys Gen: 2k/sec\nIntrusions blocked: 1.4M\nProtocol: AES-Q",
    metaEg: "مفاتيح: ٢ك/ث\nهجمات ممنوعة: ١.٤ مليون\nبروتوكول: AES-Q"
  },
  {
    id: "perf",
    icon: Zap,
    titleEn: "Overclocked Execution",
    titleEg: "تنفيذ فائق السرعة",
    theme: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/50", bar: "bg-amber-500/50", label: "text-amber-400/70" },
    descEn: "Dynamic resource allocation using predictive scaling.",
    descEg: "تخصيص ديناميكي للموارد باستخدام التوسع الاستباقي.",
    metaEn: "Peak Load: 450TFLOPS\nCooling: Optimal\nPower: 45kW",
    metaEg: "أقصى حمل: ٤٥٠TFLOPS\nالتبريد: مثالي\nالطاقة: ٤٥kW"
  }
];

export default function BentoGrid({ lang }: { lang: "en" | "eg" }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col gap-6 py-4">
      <div>
        <h2 className="text-xl font-display font-bold text-white mb-2">
          {lang === "eg" ? "البيانات المتقدمة (Bento Grid Expanders)" : "Advanced Metadata Grid"}
        </h2>
        <p className="text-xs text-zinc-400">
          {lang === "eg" ? "اضغط على أي وحدة لتوسيع وعرض البيانات الفنية العميقة." : "Click on any module to expand and view deep technical metadata."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[140px]">
        <AnimatePresence>
          {bentoItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                layout
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                key={item.id}
                className={`relative glass rounded-2xl border transition-colors cursor-pointer overflow-hidden glitch-hover ${
                  isExpanded ? "md:col-span-2 row-span-2 bg-zinc-900 border-white/20" : "bg-zinc-950/40 border-white/5 hover:border-white/10"
                }`}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className={`absolute top-0 bottom-0 ${lang === "eg" ? "right-0" : "left-0"} w-1 ${item.theme.bar}`} />
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${item.theme.bg} ${item.theme.text}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-medium text-white">
                      {lang === "eg" ? item.titleEg : item.titleEn}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {lang === "eg" ? item.descEg : item.descEn}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-white/5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {(lang === "eg" ? item.metaEg : item.metaEn).split("\n").map((line, i) => (
                            <div key={i} className="bg-zinc-950 p-3 rounded-lg border border-white/5">
                              <div className={`text-[10px] font-mono ${item.theme.label} mb-1 uppercase tracking-widest`}>
                                {line.split(":")[0]}
                              </div>
                              <div className="text-sm font-display text-white">
                                {line.split(":")[1]?.trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
