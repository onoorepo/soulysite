"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Cpu, Network, Terminal, X, Minimize2, Maximize2 } from "lucide-react";

export default function FloatingTelemetry({ lang }: { lang: "en" | "eg" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [logs, setLogs] = useState<{ id: number; text: string; type: "info" | "warn" | "error" | "sys" }[]>([]);
  const [cpuUsage, setCpuUsage] = useState<number[]>([40, 45, 42, 50, 55, 48, 60, 58, 65, 62]);
  const [bwUsage, setBwUsage] = useState<number[]>([120, 130, 125, 140, 150, 145, 160, 155, 170, 165]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const sysLogsEn = [
    "[SYSTEM] Initiating core handshake protocol...",
    "[AXIOM] Analyzing vector space dimensions.",
    "[HESPERIA] Synthesizing creative bounds.",
    "[SYNTHETIX] Allocated 1024MB to predictive stream.",
    "[SWARM] Consensus reached at 99.8%.",
    "[WARN] Latency spike detected > 45ms.",
    "[NETWORK] Handshake established with SoulyEG servers.",
    "[SYS] Quantum noise threshold optimal.",
    "[ERROR] Dropping legacy packet 0x4FA1.",
    "[AXIOM] Recalculating weight matrix..."
  ];

  const sysLogsEg = [
    "[النظام] بدء بروتوكول الاتصال الأساسي...",
    "[AXIOM] جاري تحليل أبعاد مساحة البيانات.",
    "[HESPERIA] تجميع النطاقات الإبداعية...",
    "[SYNTHETIX] تم تخصيص 1024MB لمعالجة التوقعات.",
    "[سرب] تم الوصول للتوافق بنسبة 99.8%.",
    "[تنبيه] ارتفاع مؤقت في التأخير > 45ms.",
    "[الشبكة] جاري الاتصال بخوادم SoulyEG.",
    "[SYS] مستويات تشويش الكم مستقرة.",
    "[خطأ] تجاهل حزمة بيانات قديمة 0x4FA1.",
    "[AXIOM] إعادة حساب مصفوفة الأوزان المتجهة..."
  ];

  /* Add continuous logs */
  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      const sourceList = lang === "eg" ? sysLogsEg : sysLogsEn;
      const newLog = sourceList[Math.floor(Math.random() * sourceList.length)];
      let type: "info" | "warn" | "error" | "sys" = "info";
      if (newLog.includes("WARN") || newLog.includes("تنبيه")) type = "warn";
      if (newLog.includes("ERROR") || newLog.includes("خطأ")) type = "error";
      if (newLog.includes("SYS") || newLog.includes("النظام")) type = "sys";

      setLogs(prev => {
        const nextLog = [...prev, { id: Date.now() + counter, text: newLog, type }];
        return nextLog.slice(-50); // Keep last 50 logs
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [lang]);

  /* Update metrics */
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const next = [...prev.slice(1), Math.max(10, Math.min(100, prev[prev.length - 1] + (Math.random() * 20 - 10)))];
        return next;
      });
      setBwUsage(prev => {
        const next = [...prev.slice(1), Math.max(50, Math.min(300, prev[prev.length - 1] + (Math.random() * 40 - 20)))];
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={`fixed bottom-6 ${lang === "eg" ? "left-6" : "right-6"} z-50 flex flex-col items-end gap-2 pointer-events-auto`}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`w-[320px] sm:w-[400px] bg-zinc-950/90 border border-white/10 rounded-xl shadow-2xl glass overflow-hidden ${lang === "eg" ? "origin-bottom-left" : "origin-bottom-right"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/5 bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-medium text-white">Live Telemetry</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsExpanded(false)} className="p-1 rounded opacity-50 hover:opacity-100 hover:bg-white/10">
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setIsVisible(false)} className="p-1 rounded opacity-50 hover:opacity-100 hover:bg-red-500/20 hover:text-red-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-4 border-b border-white/5 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU ALLOC</span>
                  <span className="text-[10px] font-mono text-emerald-400">{cpuUsage[cpuUsage.length - 1].toFixed(1)}%</span>
                </div>
                <div className="h-6 flex items-end gap-[1px]">
                  {cpuUsage.map((val, i) => (
                    <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-emerald-400 transition-all duration-300 rounded-t-sm" style={{ height: `${val}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1"><Network className="w-3 h-3" /> BANDWIDTH</span>
                  <span className="text-[10px] font-mono text-cyan-400">{bwUsage[bwUsage.length - 1].toFixed(0)} MB/s</span>
                </div>
                <div className="h-6 flex items-end gap-[1px]">
                  {bwUsage.map((val, i) => (
                    <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-cyan-400 transition-all duration-300 rounded-t-sm" style={{ height: `${(val / 300) * 100}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Console */}
            <div className="p-2 h-[200px] bg-black/50 overflow-hidden relative group">
              <div ref={logContainerRef} className="h-full overflow-y-auto font-mono text-[10px] custom-scrollbar pl-1 pr-2 pb-4 space-y-1">
                {logs.map((log) => (
                  <div key={log.id} className="leading-relaxed">
                    <span className="text-zinc-600 mr-2">[{new Date(log.id).toLocaleTimeString([], { hour12: false })}]</span>
                    <span className={
                      log.type === "warn" ? "text-amber-400" :
                      log.type === "error" ? "text-red-400" :
                      log.type === "sys" ? "text-purple-400" : "text-zinc-300"
                    }>{log.text}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="p-3 bg-zinc-900/80 border border-white/10 rounded-full shadow-lg hover:border-emerald-500/50 transition-all duration-300 group flex items-center gap-2 glass relative"
        >
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-mono font-medium tracking-widest hidden sm:block pr-2">TERMINAL</span>
        </button>
      )}
    </motion.div>
  );
}
