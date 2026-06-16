"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Bot, Network, ShieldAlert, Cpu } from "lucide-react";

export default function CustomerInteraction({ lang }: { lang: "en" | "eg" }) {
  const [messages, setMessages] = useState<{ id: string; speaker: "client" | "agent" | "swarm"; name: string; text: string }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const interactionScriptEg = [
    { speaker: "client", name: "العميل (أحمد)", text: "لو سمحت انا طالب أوردر من ٣ أيام ومفيش أي تحديث، رقم الطلب #8472." },
    { speaker: "agent", name: "Agent (خدمة العملاء)", text: "أهلاً بيك يا أستاذ أحمد. بعتذر جداً عن التأخير، لحظة واحدة هراجع النظام الداخلي أشوف حالة الطلب." },
    { speaker: "swarm", name: "Swarm/Data-Node", text: "[استعلام داخلي]: جلب حالة الطلب #8472 من قاعدة بيانات المستودع..." },
    { speaker: "swarm", name: "Swarm/Logistics-Node", text: "[نظام الشحن]: الطلب #8472 متوقف في مخزن التجميع بسبب نقص قطعة (رقم مرجعي: X-92)." },
    { speaker: "swarm", name: "Swarm/Resolution-Node", text: "[طلب تسوية]: القطعة المفقودة متوفرة في فرع المهندسين. إصدار أمر تحويل داخلي الآن. إعطاء تعويض للعميل بقسيمة 15%." },
    { speaker: "agent", name: "Agent (خدمة العملاء)", text: "شكراً لانتظارك يا أستاذ أحمد. المشكلة كانت في تأخير توفير إحدى القطع من المخزن الرئيسي. تم حل المشكلة الآن بإرسالها من فرع آخر، الأوردر هيخرج للشحن بكرة الصبح." },
    { speaker: "client", name: "العميل (أحمد)", text: "طيب تمام، بس أنا كده اتأخرت جداً وكان المفروض يوصل إمبارح." },
    { speaker: "agent", name: "Agent (خدمة العملاء)", text: "عندك حق تماماً، وعشان نعوضك عن التأخير ده، ضفت لرصيدك قسيمة خصم 15% (الكود: COMP15) تقدر تستخدمها في طلبك الجاي. هل أقدر أساعدك في أي حاجة تانية؟" },
    { speaker: "swarm", name: "Swarm/Sentiment-Node", text: "[تحليل المشاعر]: العميل كان غاضب (مستوى 8/10). بعد التعويض: التوتر انخفض (مستوى 3/10). إغلاق التذكرة بنجاح." },
    { speaker: "client", name: "العميل (أحمد)", text: "ألف شكر، تعبتك معايا." },
    { speaker: "agent", name: "Agent (خدمة العملاء)", text: "العفو، تحت أمرك في أي وقت. يومك سعيد يا أستاذ أحمد." }
  ];

  const interactionScriptEn = [
    { speaker: "client", name: "Client (John)", text: "Hi, I placed an order 3 days ago and haven't received any updates. Order #8472." },
    { speaker: "agent", name: "Agent (Support)", text: "Hello John. I apologize for the delay. Let me check the internal system for your order status right away." },
    { speaker: "swarm", name: "Swarm/Data-Node", text: "[Internal Query]: Fetching Order #8472 from Warehouse DB..." },
    { speaker: "swarm", name: "Swarm/Logistics-Node", text: "[Shipping System]: Order #8472 blocked at assembly stage due to missing SKU (Ref: X-92)." },
    { speaker: "swarm", name: "Swarm/Resolution-Node", text: "[Resolution Trigger]: Target SKU available at West Branch. Issuing internal transfer. Authorizing 15% compensation voucher." },
    { speaker: "agent", name: "Agent (Support)", text: "Thank you for holding, John. There was a slight delay sourcing one of the items from our main warehouse. We've routed it from another branch, and your order will dispatch tomorrow morning." },
    { speaker: "client", name: "Client (John)", text: "Okay, but it's still way past the delivery estimate. I needed it yesterday." },
    { speaker: "agent", name: "Agent (Support)", text: "I completely understand your frustration. To make up for this, I've just added a 15% discount voucher to your account (Code: COMP15) for your next purchase. Is there anything else I can assist with?" },
    { speaker: "swarm", name: "Swarm/Sentiment-Node", text: "[Sentiment Analysis]: Client was frustrated (Severity 8/10). Post-compensation: Tension cleared (Severity 3/10). Closing ticket successfully." },
    { speaker: "client", name: "Client (John)", text: "Thanks, I appreciate the help." },
    { speaker: "agent", name: "Agent (Support)", text: "You're very welcome, John. Have a great day!" }
  ];

  const startInteraction = () => {
    setMessages([]);
    setIsSimulating(true);
    const script = lang === "eg" ? interactionScriptEg : interactionScriptEn;
    
    script.forEach((msg, idx) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: Date.now().toString() + idx } as any]);
        if (idx === script.length - 1) {
          setTimeout(() => setIsSimulating(false), 2000);
        }
      }, (idx * 2500) + 500);
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col gap-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white mb-1">
            {lang === "eg" ? "محاكاة التفاعل المباشر (Client-Agent Interaction)" : "Live Client-Agent Interaction"}
          </h2>
          <p className="text-zinc-400 text-xs text-balance">
            {lang === "eg" 
              ? "شاهد كيف يتحدث الـ Agent مع العميل البشري، بينما يتواصل في الخلفية مع شبكة الـ Agents الأخرى لحل المشكلة."
              : "Watch the primary Agent interact with a human client, while silently communicating with the backend Swarm network to resolve the issue."}
          </p>
        </div>
        <button
          onClick={startInteraction}
          disabled={isSimulating}
          className={`shrink-0 px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all ${isSimulating ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]'}`}
        >
          {isSimulating ? (lang === "eg" ? "جاري المحادثة..." : "IN PROGRESS...") : (lang === "eg" ? "بدء المحاكاة" : "START SIMULATION")}
        </button>
      </div>

      <div className="flex bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden h-[500px]">
        {/* Left Side: Client vs Agent Front-end */}
        <div className="w-1/2 md:w-3/5 border-r border-white/5 flex flex-col relative bg-zinc-900/30">
          <div className="p-3 border-b border-white/5 bg-zinc-900/80 flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-medium text-white">{lang === "eg" ? "واجهة العميل البشري" : "Client-Facing Chat"}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
            {messages.length === 0 ? (
               <div className="m-auto text-zinc-600 text-xs font-mono uppercase tracking-widest text-center">
                 {lang === "eg" ? "في انتظار تفعيل القناة" : "CHANNEL INACTIVE"}
               </div>
            ) : null}

            <AnimatePresence>
              {messages.filter(m => m.speaker === "client" || m.speaker === "agent").map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${msg.speaker === "client" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] rounded-xl p-3 ${
                    msg.speaker === "client" 
                      ? "bg-zinc-800 border border-white/5 text-zinc-200 rounded-tl-sm" 
                      : "bg-indigo-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  }`}>
                    <div className={`text-[9px] mb-1 opacity-70 flex items-center gap-1`}>
                      {msg.speaker === "agent" && <Bot className="w-3 h-3" />}
                      {msg.name}
                    </div>
                    <div className="text-sm leading-relaxed">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Right Side: Agent vs Agent Back-end (Swarm) */}
        <div className="w-1/2 md:w-2/5 flex flex-col relative bg-black">
          <div className="p-3 border-b border-white/5 bg-zinc-950 flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-medium text-cyan-400 font-mono tracking-widest">{lang === "eg" ? "شبكة الـ Swarm الداخلية" : "INTERNAL SWARM NET"}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-3 font-mono text-[10px]">
            {messages.length === 0 ? (
               <div className="m-auto text-zinc-600 text-xs font-mono uppercase tracking-widest text-center flex flex-col items-center">
                 <Cpu className="w-6 h-6 mb-2 opacity-50" />
                 {lang === "eg" ? "النظام في وضع السكون" : "SYSTEM STANDBY"}
               </div>
            ) : null}

            <AnimatePresence>
              {messages.filter(m => m.speaker === "swarm").map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-zinc-900 border border-cyan-500/20 p-3 rounded-lg text-cyan-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500" />
                  <div className="text-[8px] text-cyan-500/50 mb-1 uppercase">{msg.name}</div>
                  <div className="leading-relaxed">{msg.text}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
